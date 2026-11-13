"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type VideoTestimonial = {
  quote: string;
  name: string;
  videoId: string;
  thumbnail: string;
};

type Props = {
  items: VideoTestimonial[];
  watchLabel: string;
  closeLabel: string;
  openLabel: string;
};

export function TestimonialVideos({ items, watchLabel, closeLabel, openLabel }: Props) {
  const [selected, setSelected] = useState<VideoTestimonial | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (selected && !dialog.open) dialog.showModal();
    if (!selected && dialog.open) dialog.close();
  }, [selected]);

  useEffect(() => {
    if (!selected) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      dialogRef.current?.close();
      setSelected(null);
    }

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [selected]);

  return (
    <>
      <div className="testimonial-grid">
        {items.map((item) => (
          <figure className="testimonial-card" key={item.name}>
            <button
              className="testimonial-video-trigger"
              type="button"
              onClick={() => setSelected(item)}
              aria-label={`${watchLabel}: ${item.name}`}
            >
              <Image src={item.thumbnail} alt="" fill sizes="(max-width: 760px) 90vw, 30vw" />
              <span className="testimonial-play" aria-hidden="true">▶</span>
            </button>
            <span className="quote-mark" aria-hidden="true">“</span>
            <blockquote>{item.quote}</blockquote>
            <figcaption>{item.name}</figcaption>
          </figure>
        ))}
      </div>
      <dialog
        className="testimonial-dialog"
        ref={dialogRef}
        aria-label={watchLabel}
        onCancel={() => {
          setSelected(null);
        }}
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setSelected(null);
        }}
      >
        <div className="testimonial-dialog-content">
          <button
            className="testimonial-dialog-close"
            type="button"
            onClick={() => setSelected(null)}
            aria-label={closeLabel}
          >
            ×
          </button>
          {selected && (
            <iframe
              key={selected.videoId}
              src={`https://www.youtube.com/embed/${selected.videoId}?autoplay=1&rel=0&playsinline=1`}
              title={`${watchLabel}: ${selected.name}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              loading="eager"
              allowFullScreen
            />
          )}
          {selected && (
            <a
              className="testimonial-youtube-link"
              href={`https://www.youtube.com/watch?v=${selected.videoId}`}
              target="_blank"
              rel="noreferrer"
            >
              {openLabel} ↗
            </a>
          )}
        </div>
      </dialog>
    </>
  );
}
