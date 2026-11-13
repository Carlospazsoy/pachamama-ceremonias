export type Locale = "es" | "en";

type Service = {
  title: string;
  description: string;
  image: string;
  alt: string;
};

type FAQ = {
  question: string;
  answer: string;
};

export type SiteContent = {
  langName: string;
  switchLabel: string;
  nav: { services: string; story: string; contact: string; cta: string };
  hero: { eyebrow: string; title: string; description: string; primary: string; secondary: string; imageAlt: string };
  trust: { since: string; bilingual: string; custom: string };
  services: { eyebrow: string; title: string; intro: string; items: Service[]; all: string };
  story: { eyebrow: string; title: string; paragraphs: string[]; imageAlt: string };
  process: { eyebrow: string; title: string; intro: string; steps: { title: string; description: string }[] };
  testimonials: {
    eyebrow: string;
    title: string;
    watchVideo: string;
    closeVideo: string;
    openVideo: string;
    items: { quote: string; name: string; videoId: string; thumbnail: string }[];
  };
  faq: { eyebrow: string; title: string; items: FAQ[] };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    whatsapp: string;
    email: string;
    phone: string;
    formTitle: string;
    formDescription: string;
    fields: {
      name: string;
      email: string;
      phone: string;
      service: string;
      servicePlaceholder: string;
      eventDate: string;
      location: string;
      guests: string;
      message: string;
      consent: string;
      submit: string;
      sending: string;
      required: string;
      success: string;
      error: string;
      spam: string;
      schedule: string;
      calPending: string;
    };
  };
  footer: { note: string; privacy: string };
};

export const servicesByLocale: Record<Locale, Service[]> = {
  es: [
    {
      title: "Bodas simbólicas",
      description: "Una ceremonia personal, cálida y participativa para celebrar su unión junto a las personas que aman.",
      image: "/assets/boda-simbolica-xime-may.webp",
      alt: "Pareja durante una ceremonia simbólica de boda",
    },
    {
      title: "Ceremonias de cacao",
      description: "Un espacio para reunirse, compartir una intención y celebrar en comunidad, con una guía cercana.",
      image: "/assets/ceremonia-cacao.jpg",
      alt: "Encuentro ceremonial en círculo",
    },
    {
      title: "Sound healing",
      description: "Una experiencia de escucha y descanso con instrumentos sonoros, adaptable a tu grupo y ocasión.",
      image: "/assets/soundhealing.jpg",
      alt: "Instrumentos usados en una experiencia de sonido",
    },
    {
      title: "Ritual de cumpleaños",
      description: "Honra un nuevo ciclo con palabras, símbolos y la presencia de tus seres queridos.",
      image: "/assets/ritual-evento.jpg",
      alt: "Invitados reunidos para celebrar un momento especial",
    },
    {
      title: "Baby blessing",
      description: "Una reunión afectuosa para acompañar la llegada de una nueva etapa y celebrar a quien está por nacer.",
      image: "/assets/baby-blessing.jpg",
      alt: "Ceremonia de maternidad acompañada por mujeres",
    },
    {
      title: "Temazcal",
      description: "Una experiencia guiada y coordinada con atención a las condiciones del espacio anfitrión.",
      image: "/assets/apertura-evento-liveaqua.jpg",
      alt: "Espacio preparado para una ceremonia de temazcal",
    },
    {
      title: "Apertura ritual de eventos",
      description: "Una bienvenida para pausar, conectar con la intención del encuentro y disponer al grupo.",
      image: "/assets/apertura-evento.jpg",
      alt: "Ritual de apertura para un grupo",
    },
  ],
  en: [
    {
      title: "Symbolic weddings",
      description: "A personal, warm and participatory ceremony to celebrate your union with the people you love.",
      image: "/assets/boda-simbolica-xime-may.webp",
      alt: "Couple during a symbolic wedding ceremony",
    },
    {
      title: "Cacao ceremonies",
      description: "A welcoming space to gather, share an intention and celebrate together, guided with care.",
      image: "/assets/ceremonia-cacao.jpg",
      alt: "A group gathered in a ceremonial circle",
    },
    {
      title: "Sound healing",
      description: "A listening and relaxation experience with sound instruments, adapted to your group and occasion.",
      image: "/assets/soundhealing.jpg",
      alt: "Instruments used in a sound experience",
    },
    {
      title: "Birthday ritual",
      description: "Honor a new chapter with words, meaningful symbols and the presence of your loved ones.",
      image: "/assets/ritual-evento.jpg",
      alt: "Guests gathered to celebrate a special moment",
    },
    {
      title: "Baby blessing",
      description: "A heartfelt gathering to welcome a new chapter and celebrate the person soon to be born.",
      image: "/assets/baby-blessing.jpg",
      alt: "A maternity ceremony shared with women",
    },
    {
      title: "Temazcal",
      description: "A guided experience coordinated with care for the conditions of the host venue.",
      image: "/assets/apertura-evento-liveaqua.jpg",
      alt: "Space prepared for a temazcal ceremony",
    },
    {
      title: "Ritual event opening",
      description: "A welcoming moment to pause, connect with the gathering's intention and bring the group together.",
      image: "/assets/apertura-evento.jpg",
      alt: "Opening ritual with a group",
    },
  ],
};

export const content: Record<Locale, SiteContent> = {
  es: {
    langName: "Español",
    switchLabel: "English",
    nav: { services: "Ceremonias", story: "Nuestra historia", contact: "Contacto", cta: "Cuéntanos tu idea" },
    hero: {
      eyebrow: "Ceremonias con intención · San Miguel de Allende",
      title: "Celebra lo que hace única tu historia.",
      description: "Diseñamos bodas simbólicas y ceremonias para los momentos que merecen vivirse con presencia, belleza y significado.",
      primary: "Cuéntanos qué celebras",
      secondary: "Explorar ceremonias",
      imageAlt: "Una pareja comparte su ceremonia simbólica al aire libre",
    },
    trust: { since: "Desde 2005", bilingual: "Español e inglés", custom: "Diseñadas para ustedes" },
    services: {
      eyebrow: "Ritos de paso y celebraciones",
      title: "Un encuentro a la medida de tu momento.",
      intro: "En San Miguel de Allende y alrededores, creamos experiencias íntimas o para grupos, en el lugar que elijan.",
      items: servicesByLocale.es,
      all: "¿Buscas otro tipo de ceremonia? Cuéntanos y la diseñamos contigo.",
    },
    story: {
      eyebrow: "Pachamama Ceremonias",
      title: "El valor de reunirnos y celebrar la vida.",
      paragraphs: [
        "Desde 2005, acompañamos a personas y familias a crear espacios de encuentro inspirados en la gratitud, la comunidad y el respeto por las raíces culturales.",
        "Cada ceremonia se conversa y se diseña con quienes la celebran: su historia, sus deseos, el lugar y la participación de sus seres queridos. Con una guía cercana y un servicio bilingüe, hacemos que todos puedan sentirse parte.",
      ],
      imageAlt: "Participantes reunidos en una ceremonia de Pachamama",
    },
    process: {
      eyebrow: "Un proceso sencillo y cercano",
      title: "De tu primera idea a un día inolvidable.",
      intro: "Primero escuchamos lo que quieres celebrar. Luego proponemos una experiencia y un paquete a la medida.",
      steps: [
        { title: "Cuéntanos", description: "Comparte la ocasión, la fecha aproximada y el lugar. Cada detalle puede definirse después." },
        { title: "Conversemos", description: "Agendamos una llamada para conocer sus ideas, resolver dudas y preparar una propuesta." },
        { title: "Diseñamos juntos", description: "Acordamos el formato y los detalles. Al confirmar el servicio, se solicita un anticipo del 50 %." },
      ],
    },
    testimonials: {
      eyebrow: "Palabras que nos acompañan",
      title: "Lo que se llevan quienes celebran con nosotros.",
      watchVideo: "Ver testimonio en video",
      closeVideo: "Cerrar video",
      openVideo: "Si el video no carga, ábrelo directamente en YouTube",
      items: [
        {
          quote: "Aunque soy muy ajena a este tipo de ceremonias, sentí que a mí se me abrió el corazón. Lo quiero vivir más veces, me agradó y lo recomiendo.",
          name: "Laura Álvarez",
          videoId: "ivyh2KQZnhg",
          thumbnail: "/assets/testimonio-laura.jpg",
        },
        {
          quote: "Me hubiese encantado tener una ceremonia así cuando era una niña. Recomiendo mucho a Dayana y Carlos; es un honor celebrar la vida con ellos.",
          name: "Invitada especial",
          videoId: "rY0cbQU3M9Q",
          thumbnail: "/assets/testimonio-2.png",
        },
        {
          quote: "La ceremonia estuvo llena de energía pura y luz; me quedo con el corazón lleno del amor que vimos concentrado en ese círculo.",
          name: "Blanca Figueroa",
          videoId: "XIXP5NBOTQo",
          thumbnail: "/assets/testimonio-3.png",
        },
      ],
    },
    faq: {
      eyebrow: "Resolvemos tus dudas",
      title: "Preguntas frecuentes sobre ceremonias.",
      items: [
        { question: "¿Una boda simbólica tiene validez legal?", answer: "No. Es una celebración personal y simbólica, no reemplaza el matrimonio civil ni tiene efectos legales. Si desean un matrimonio reconocido oficialmente, deben realizar el trámite civil correspondiente." },
        { question: "¿En qué lugares realizan ceremonias?", answer: "La base es San Miguel de Allende. También podemos conversar sobre eventos en Querétaro, León, Guanajuato y otros destinos; la disponibilidad y logística se revisan para cada fecha." },
        { question: "¿Las ceremonias pueden ser en inglés?", answer: "Sí. Podemos guiar la ceremonia en español o en inglés, y acordar de antemano el idioma más cómodo para ustedes y sus invitados." },
        { question: "¿Cómo se cotiza y cuándo se paga?", answer: "Primero conocemos sus necesidades en una llamada y preparamos una propuesta según la ceremonia, el lugar y el grupo. El anticipo del 50 % se solicita después de acordar el paquete y confirmar el servicio." },
        { question: "¿Con cuánta anticipación debo consultar?", answer: "Depende de la fecha y del tipo de ceremonia. Es buena idea escribirnos cuanto antes, especialmente para bodas y temporadas de alta demanda." },
      ],
    },
    contact: {
      eyebrow: "Empecemos por escucharte",
      title: "¿Qué te gustaría celebrar?",
      description: "Cuéntanos un poco sobre tu idea. Te responderemos para conocer los detalles y coordinar una llamada.",
      whatsapp: "Escribir por WhatsApp",
      email: "Enviar correo",
      phone: "Llámanos",
      formTitle: "Solicita una primera conversación",
      formDescription: "La fecha y el lugar son aproximados; puedes completar los detalles después.",
      fields: {
        name: "Tu nombre",
        email: "Correo electrónico",
        phone: "WhatsApp / teléfono",
        service: "¿Qué te gustaría celebrar?",
        servicePlaceholder: "Selecciona un servicio",
        eventDate: "Fecha aproximada",
        location: "Ciudad o lugar del evento",
        guests: "Número aproximado de invitados",
        message: "¿Qué tienes en mente? (opcional)",
        consent: "Acepto que Pachamama Ceremonias utilice estos datos para responder a mi consulta.",
        submit: "Enviar consulta",
        sending: "Enviando…",
        required: "Completa este campo.",
        success: "¡Gracias! Recibimos tu consulta y nos pondremos en contacto contigo.",
        error: "No pudimos enviar tu consulta. Inténtalo de nuevo o escríbenos por WhatsApp.",
        spam: "Gracias. Si necesitas información, contáctanos por WhatsApp.",
        schedule: "Si ya quieres elegir un horario, puedes reservar una llamada aquí:",
        calPending: "Al recibir tu consulta, coordinaremos una llamada por WhatsApp.",
      },
    },
    footer: { note: "Ceremonias y bodas simbólicas en San Miguel de Allende y alrededores.", privacy: "Tus datos se usan únicamente para atender tu consulta." },
  },
  en: {
    langName: "English",
    switchLabel: "Español",
    nav: { services: "Ceremonies", story: "Our story", contact: "Contact", cta: "Share your idea" },
    hero: {
      eyebrow: "Meaningful ceremonies · San Miguel de Allende",
      title: "Celebrate what makes your story yours.",
      description: "We create symbolic weddings and ceremonies for life's meaningful moments, with presence, beauty and intention.",
      primary: "Tell us what you’re celebrating",
      secondary: "Explore ceremonies",
      imageAlt: "A couple sharing their outdoor symbolic wedding ceremony",
    },
    trust: { since: "Since 2005", bilingual: "English and Spanish", custom: "Designed around you" },
    services: {
      eyebrow: "Life transitions and celebrations",
      title: "A gathering shaped around your moment.",
      intro: "In San Miguel de Allende and the surrounding region, we create intimate experiences and group ceremonies at your chosen venue.",
      items: servicesByLocale.en,
      all: "Looking for a different kind of ceremony? Tell us about it and we can shape it together.",
    },
    story: {
      eyebrow: "Pachamama Ceremonias",
      title: "The meaning of coming together to celebrate life.",
      paragraphs: [
        "Since 2005, we have helped people and families create moments of connection inspired by gratitude, community and respect for cultural roots.",
        "We plan each ceremony together with the people celebrating: your story, wishes, venue and the participation of loved ones. With thoughtful guidance in English or Spanish, everyone can feel included.",
      ],
      imageAlt: "Participants gathered at a Pachamama ceremony",
    },
    process: {
      eyebrow: "A thoughtful, simple process",
      title: "From your first idea to a day to remember.",
      intro: "We start by listening to what you want to celebrate, then shape an experience and package around your needs.",
      steps: [
        { title: "Tell us", description: "Share the occasion, an approximate date and the venue. The details can be refined later." },
        { title: "Let's talk", description: "We arrange a call to hear your ideas, answer questions and prepare a proposal." },
        { title: "Plan together", description: "We agree on the format and details. A 50% deposit is requested once the service is confirmed." },
      ],
    },
    testimonials: {
      eyebrow: "Kind words we carry with us",
      title: "What people remember about celebrating together.",
      watchVideo: "Watch the video testimonial",
      closeVideo: "Close video",
      openVideo: "If the video doesn't load, open it directly on YouTube",
      items: [
        {
          quote: "Although I am not very familiar with this kind of ceremony, I felt my heart open. I would love to experience it again; I enjoyed it and recommend it.",
          name: "Laura Álvarez",
          videoId: "ivyh2KQZnhg",
          thumbnail: "/assets/testimonio-laura.jpg",
        },
        {
          quote: "I would have loved to have a ceremony like this as a child. I highly recommend Dayana and Carlos; it is an honor to celebrate life with them.",
          name: "Special guest",
          videoId: "rY0cbQU3M9Q",
          thumbnail: "/assets/testimonio-2.png",
        },
        {
          quote: "The ceremony was full of pure energy and light. I left with my heart full of the love we saw gathered in that circle.",
          name: "Blanca Figueroa",
          videoId: "XIXP5NBOTQo",
          thumbnail: "/assets/testimonio-3.png",
        },
      ],
    },
    faq: {
      eyebrow: "A few helpful answers",
      title: "Frequently asked questions.",
      items: [
        { question: "Is a symbolic wedding legally binding?", answer: "No. It is a personal, symbolic celebration and does not replace a civil marriage or have legal effect. Couples seeking legal recognition must complete the relevant civil process." },
        { question: "Where do you hold ceremonies?", answer: "We are based in San Miguel de Allende. We can also discuss events in Querétaro, León, Guanajuato and other destinations; availability and logistics depend on each date." },
        { question: "Can the ceremony be in English?", answer: "Yes. We can guide the ceremony in English or Spanish and agree in advance on the language that feels most comfortable for you and your guests." },
        { question: "How do quotes and payments work?", answer: "We first learn about your needs on a call and prepare a proposal based on the ceremony, venue and group. The 50% deposit is requested after agreeing on the package and confirming the service." },
        { question: "How far in advance should I enquire?", answer: "It depends on the date and type of ceremony. We recommend reaching out as early as possible, especially for weddings and busy seasons." },
      ],
    },
    contact: {
      eyebrow: "Let's start by listening",
      title: "What would you like to celebrate?",
      description: "Tell us a little about your idea. We'll follow up to learn more and arrange a call.",
      whatsapp: "Message us on WhatsApp",
      email: "Send an email",
      phone: "Call us",
      formTitle: "Request an initial conversation",
      formDescription: "Your date and venue can be approximate; we can work out the details later.",
      fields: {
        name: "Your name",
        email: "Email address",
        phone: "WhatsApp / phone",
        service: "What would you like to celebrate?",
        servicePlaceholder: "Select a service",
        eventDate: "Approximate date",
        location: "Event city or venue",
        guests: "Approximate number of guests",
        message: "What are you envisioning? (optional)",
        consent: "I agree that Pachamama Ceremonias may use these details to respond to my enquiry.",
        submit: "Send enquiry",
        sending: "Sending…",
        required: "Please complete this field.",
        success: "Thank you! We received your enquiry and will be in touch.",
        error: "We couldn't send your enquiry. Please try again or message us on WhatsApp.",
        spam: "Thank you. If you need information, please contact us on WhatsApp.",
        schedule: "Ready to choose a time? You can book a call here:",
        calPending: "Once we receive your enquiry, we’ll arrange a call with you on WhatsApp.",
      },
    },
    footer: { note: "Ceremonies and symbolic weddings in San Miguel de Allende and the surrounding region.", privacy: "Your details are only used to respond to your enquiry." },
  },
};

export const siteUrl = "https://pachamamaceremonias.com";
export const whatsappUrl = "https://wa.me/524151012965";
export const contactEmail = "pachamamaceremonias@gmail.com";
export const contactPhone = "+524151012965";
