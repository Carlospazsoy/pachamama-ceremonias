"use client";

import Script from "next/script";
import { useRef, useState, type FormEvent } from "react";
import { content, servicesByLocale, type Locale } from "@/lib/content";

type Props = { locale: Locale; calUrl?: string; turnstileSiteKey?: string };
type FormStatus = "idle" | "sending" | "success" | "error" | "spam" | "verification";

type TurnstileOptions = {
  sitekey: string;
  callback: (token: string) => void;
  "error-callback": () => void;
  "expired-callback": () => void;
};

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileOptions) => string;
  reset: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export function ContactForm({ locale, calUrl, turnstileSiteKey }: Props) {
  const copy = content[locale].contact.fields;
  const [status, setStatus] = useState<FormStatus>("idle");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileContainer = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);

  function renderTurnstile() {
    if (!turnstileSiteKey || !turnstileContainer.current || turnstileWidgetId.current) return;
    if (!window.turnstile) {
      setStatus("verification");
      return;
    }

    turnstileWidgetId.current = window.turnstile.render(turnstileContainer.current, {
      sitekey: turnstileSiteKey,
      callback: (token) => {
        setTurnstileToken(token);
        setStatus("idle");
      },
      "error-callback": () => {
        setTurnstileToken("");
        setStatus("verification");
      },
      "expired-callback": () => {
        setTurnstileToken("");
        setStatus("verification");
      },
    });
  }

  function resetTurnstile() {
    setTurnstileToken("");
    if (turnstileWidgetId.current) window.turnstile?.reset(turnstileWidgetId.current);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!turnstileSiteKey || !turnstileToken) {
      setStatus("verification");
      return;
    }

    setStatus("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, locale, turnstileToken }),
      });
      const result = await response.json();

      if (response.status === 202 && result.spam) {
        setStatus("spam");
        form.reset();
        resetTurnstile();
        return;
      }
      if (response.status === 400 && result.code === "TURNSTILE_INVALID") {
        resetTurnstile();
        setStatus("verification");
        return;
      }
      if (!response.ok) throw new Error("Inquiry submission failed");

      setStatus("success");
      form.reset();
      resetTurnstile();
    } catch {
      resetTurnstile();
      setStatus("error");
    }
  }

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="form-field">
          <span>{copy.name} *</span>
          <input name="name" autoComplete="name" maxLength={100} required />
        </label>
        <label className="form-field">
          <span>{copy.email} *</span>
          <input name="email" type="email" autoComplete="email" maxLength={254} required />
        </label>
        <label className="form-field">
          <span>{copy.phone} *</span>
          <input name="phone" type="tel" autoComplete="tel" maxLength={40} required />
        </label>
        <label className="form-field">
          <span>{copy.service} *</span>
          <select name="service" defaultValue="" required>
            <option value="" disabled>{copy.servicePlaceholder}</option>
            {servicesByLocale[locale].map((service) => <option key={service.title}>{service.title}</option>)}
            <option>{locale === "es" ? "Otra ceremonia" : "Another ceremony"}</option>
          </select>
        </label>
        <label className="form-field">
          <span>{copy.eventDate}</span>
          <input name="eventDate" type="date" />
        </label>
        <label className="form-field">
          <span>{copy.location} *</span>
          <input name="location" autoComplete="off" maxLength={120} required />
        </label>
        <label className="form-field">
          <span>{copy.guests}</span>
          <input name="guests" type="number" min="1" max="10000" inputMode="numeric" />
        </label>
        <label className="form-field form-field-wide">
          <span>{copy.message}</span>
          <textarea name="message" rows={3} maxLength={2000} />
        </label>
      </div>
      <label className="honeypot" aria-hidden="true">
        Leave this field empty
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      {turnstileSiteKey ? (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            strategy="afterInteractive"
            onReady={renderTurnstile}
            onError={() => setStatus("verification")}
          />
          <div className="turnstile-widget" ref={turnstileContainer} />
        </>
      ) : (
        <p className="form-message form-error">{copy.captchaUnavailable}</p>
      )}
      <label className="consent-field">
        <input name="consent" type="checkbox" required />
        <span>{copy.consent}</span>
      </label>
      <button
        className="button button-dark form-submit"
        type="submit"
        disabled={status === "sending" || !turnstileSiteKey || !turnstileToken}
      >
        {status === "sending" ? copy.sending : copy.submit}<span aria-hidden="true"> ↗</span>
      </button>
      {status === "success" && (
        <div className="form-message form-success" role="status">
          <p>{copy.success}</p>
          <p>{calUrl ? <>{copy.schedule} <a href={calUrl} target="_blank" rel="noreferrer">{locale === "es" ? "reservar una llamada" : "book a call"} ↗</a></> : copy.calPending}</p>
        </div>
      )}
      {status === "error" && <p className="form-message form-error" role="alert">{copy.error}</p>}
      {status === "spam" && <p className="form-message" role="status">{copy.spam}</p>}
      {status === "verification" && <p className="form-message form-error" role="alert">{copy.verification}</p>}
    </form>
  );
}
