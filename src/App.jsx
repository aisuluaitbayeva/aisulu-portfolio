import React, { useState, useEffect } from "react";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, MapPin, X } from "lucide-react";

const ACCENT = "#1F48CE";
const INK = "#0B1220";
const MUTED = "#4B5162";
const FAINT = "#9AA0AC";
const DISPLAY_FONT = "'Manrope', sans-serif";

// Реальные контакты
const LINKS = {
  telegram: "https://t.me/aisulu_aitbayeva",
  linkedin: "http://linkedin.com/in/aisulu-aitbayeva/",
  email: "aisulu.aitbayeva@gmail.com",
  // Положите файл резюме в папку /public как CV_RU.pdf — ссылка ниже уже на него ссылается.
  cv: "/CV_RU.pdf",
};

// Section wrapper: content fills 85% of viewport width, capped at a max
// content width so it doesn't overstretch on very large screens.
function Section({ children, style = {}, className = "" }) {
  return (
    <div
      className={className}
      style={{
        width: "85%",
        maxWidth: 1280,
        marginLeft: "auto",
        marginRight: "auto",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Accent({ children }) {
  return <span style={{ color: ACCENT }}>{children}</span>;
}

function TextLink({ href, color = INK, external = false, children }) {
  return (
    <a
      href={href}
      style={{ color }}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <span className="story-link">{children}</span>
    </a>
  );
}

// ---- Карусель медиа внутри карточки проекта ----
//
// Как добавить реальные скриншоты/видео:
// 1. Положите файлы в папку /public (например, fx-1.png, fx-2.png)
// 2. В массиве projects ниже, в поле media конкретного проекта,
//    замените { src: null } на { src: "/fx-1.png" } (для видео — { src: "/demo.mp4", video: true })
// 3. Один элемент в массиве media = один слайд. Точки-индикаторы и автопрокрутка
//    появляются автоматически, как только элементов больше одного — руками включать не нужно.
function ProjectMedia({ media, altBase }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const slide = media[index];

  // Автопрокрутка: 5 секунд на слайд — минимум, который рекомендуют для
  // авто-каруселей (NN/g), чтобы пользователь успевал считать содержимое.
  // Останавливается при наведении курсора.
  useEffect(() => {
    if (media.length <= 1 || paused || zoomed) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % media.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [media.length, paused, zoomed]);

  // Закрытие модалки по Escape
  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e) => e.key === "Escape" && setZoomed(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomed]);

  const goPrev = () => setIndex((i) => (i - 1 + media.length) % media.length);
  const goNext = () => setIndex((i) => (i + 1) % media.length);

function SlideContent({ item, variant = "thumbnail" }) {
    const sizingClass =
      variant === "thumbnail" ? "h-full w-full object-cover" : "max-h-[80vh] max-w-full object-contain";

    if (!item?.src) {
      return (
        <div className="h-full w-full flex items-center justify-center">
          <div className="text-center px-6">
            <div
              className="mx-auto mb-3 rounded-full flex items-center justify-center"
              style={{ width: 40, height: 40, background: "#EEF0F3" }}
            >
              <ArrowUpRight size={18} color={FAINT} />
            </div>
            <p className="text-sm" style={{ color: FAINT }}>
              {media.length > 1 ? `Скриншот ${index + 1} из ${media.length}` : "Скриншот интерфейса"}
            </p>
          </div>
        </div>
      );
    }
    if (item.video) {
      return <video src={item.src} className={sizingClass} autoPlay loop muted playsInline />;
    }
    return <img src={item.src} alt={item.alt || altBase} className={sizingClass} />;
  }

  return (
    <>
      <div
        className="relative rounded-2xl aspect-[4/3] overflow-hidden cursor-zoom-in"
        style={{ background: "#FFFFFF" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onClick={() => setZoomed(true)}
      >
        <div className="relative h-full w-full">
          {media.map((item, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-700 ease-in-out"
              style={{ opacity: i === index ? 1 : 0 }}
            >
              <SlideContent item={item} />
            </div>
          ))}
        </div>

        {media.length > 1 && (
          <div
            className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-2 rounded-full"
            style={{ background: "rgba(11,18,32,0.55)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {media.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Слайд ${i + 1}`}
                onClick={() => setIndex(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === index ? 16 : 6,
                  height: 6,
                  background: i === index ? "#FFFFFF" : "rgba(255,255,255,0.5)",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {zoomed && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          style={{ background: "rgba(11,18,32,0.75)" }}
          onClick={() => setZoomed(false)}
        >
          <button
            type="button"
            aria-label="Закрыть"
            className="absolute top-6 right-6 rounded-full p-2"
            style={{ background: "rgba(255,255,255,0.15)" }}
            onClick={() => setZoomed(false)}
          >
            <X size={20} color="#FFFFFF" />
          </button>
          <div
            className="flex items-center gap-4 max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {media.length > 1 && (
              <button
                type="button"
                aria-label="Предыдущее изображение"
                onClick={goPrev}
                className="shrink-0 rounded-full p-2 flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.15)" }}
              >
                <ChevronLeft size={22} color="#FFFFFF" />
              </button>
            )}

            <div
              className="rounded-2xl overflow-hidden flex-1 flex items-center justify-center"
              style={{ background: "#F3F4F7" }}
            >
              <SlideContent item={slide} variant="full" />
            </div>

            {media.length > 1 && (
              <button
                type="button"
                aria-label="Следующее изображение"
                onClick={goNext}
                className="shrink-0 rounded-full p-2 flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.15)" }}
              >
                <ChevronRight size={22} color="#FFFFFF" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const projects = [
  {
    chips: ["UX/UI", "B2B Fintech", "Web", "Mobile"],
    title: "FX Exchange для бизнеса",
    description:
      "Задизайнила FX-обменник для юридических лиц с нуля — от MVP с ограниченными валютными парами и лимитами операций до полноценного продукта для покупки и продажи валюты по динамическим котировкам. По мере развития продукта проектировала новые сценарии: сделки по валютным контрактам, фиксация курса, сложные сценарии подписания и онбординг",
    results: ["От MVP к полноценному продукту", "Проведение usability-тестирований", "Рост ежедневных FX-операций в 5,9 раза"],
    note: null,
    media: [
       { src: "/FX-1.png" },
       { src: "/FX-2.png" },
    ],
  },
  {
    chips: ["UX/UI", "B2B Fintech", "Mobile"],
    title: "Редизайн международных переводов",
    description:
      "Редизайнила флоу международных переводов для юридических лиц: изначально задача заключалась в добавлении новых полей по стандарту ISO 20022, но я предложила переработать весь пользовательский сценарий. Разделила перегруженную одностраничную форму на последовательные шаги, интегрировала новые требования стандарта и добавила больше прозрачности в процесс, включая уведомления о нерабочих днях и подсказки о ближайшей доступной дате перевода",
    results: [],
    note: "Флоу уже запущен, продуктовые метрики сейчас собираются",
    media: [{ src: null }],
  },
  {
    chips: ["UX/UI", "B2B SaaS", "Web", "Mobile"],
    title: "Договоры по QR для электронного документооборота",
    description:
      "Спроектировала новый сценарий массового подписания договоров в B2B-платформе электронного документооборота для случаев, когда инициатор не знает данные контрагентов заранее. Вместе с командой провела usability-тестирования и создала флоу, в котором компания делится QR-кодом или ссылкой на типовой договор, а контрагент самостоятельно заполняет свои данные и подписывает документ. Сценарий также стал дополнительной точкой входа в продукт для новых пользователей",
    results: ["Проведение usability-тестирований", "−32% времени от создания до подписания", "Конверсия во флоу регистрации 11%"],
    note: null,
    media: [{ src: null }],
  },
];

const experience = [
  {
    company: "Alatau City Bank (ex. Jusan Bank)",
    period: "декабрь 2025 — настоящее время",
    description:
      "Работаю в команде ВЭД, в банке для юридических лиц. Наша команда отвечает за все валютные продукты: конвертации, переводы, валютные контракты. Как единственный дизайнер в команде, я успела поработать с этими продуктами сразу с нескольких сторон — не только дизайнила пользовательские интерфейсы (web и mobile), но и проектировала админ-панель для валютного контроля и казначейства",
  },
  {
    company: "Documentolog",
    period: "май 2025 — ноябрь 2025",
    description:
      "Начала работу как дизайнер маркетинговых лендингов, а затем перешла в продуктовую команду и стала проектировать сервис электронного документооборота для физических лиц и предпринимателей. Здесь научилась работать с кроссплатформенными продуктами и много концептить",
  },
  {
    company: "NewProject",
    period: "март 2024 — май 2025",
    description:
      "Моя первая работа как продуктового дизайнера началась здесь. Дизайнила интерфейс для мобильного приложения для брокеров. В этой команде я узнала больше о бизнес-процессах и о том, какое место в них занимает дизайн; о том, как фича проходит свой путь от гипотезы до реализации и конечного пользователя",
  },
];

export default function App() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: INK, background: "#FFFFFF" }}>
      <style>{`
        .story-link { position: relative; }
        .story-link::after {
          content: "";
          position: absolute;
          left: 0; right: 0; bottom: -2px;
          height: 1px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s ease;
        }
        a:hover .story-link::after { transform: scaleX(1); }
        .cv-btn { transition: background 0.2s ease, transform 0.15s ease; }
        .cv-btn:hover { transform: translateY(-1px); }
      `}</style>

      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b backdrop-blur"
        style={{ background: "rgba(255,255,255,0.85)", borderColor: "#EEF0F3" }}
      >
        <Section className="flex items-center justify-between py-4">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img src="/Avatar.jpeg" className="rounded-full object-cover" style={{ width: 48, height: 48 }} />
            <span className="font-semibold text-[15px]" style={{ fontFamily: DISPLAY_FONT }}>
              Айсулу Айтбаева
            </span>
          </div>
          <nav className="flex items-center gap-6 text-[14px]">
            <TextLink href={LINKS.telegram} external>
              Telegram
            </TextLink>
            <TextLink href={LINKS.linkedin} external>
              LinkedIn
            </TextLink>
            <TextLink href={`mailto:${LINKS.email}`}>Email</TextLink>
            <a
              href={LINKS.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="cv-btn flex items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-medium text-white"
              style={{ background: ACCENT }}
            >
              CV <ArrowRight size={14} />
            </a>
          </nav>
        </Section>
      </header>

      {/* Hero */}
      <Section className="pt-20 pb-16">
        <p
          className="text-[26px] md:text-[36px] leading-[1.4] font-semibold max-w-5xl"
          style={{ fontFamily: DISPLAY_FONT }}
        >
          Продуктовый дизайнер в <Accent>B2B fintech</Accent>. Сейчас работаю
          над продуктами для банкинга: от <Accent>валютных операций</Accent> до <Accent>международных переводов</Accent>.
          Из сложных финансовых процессов и требований законодательства я делаю{" "}
          <Accent>понятные интерфейсы</Accent>, полезные для пользователей и бизнеса
        </p>
      </Section>

      {/* Projects */}
      <Section className="pb-8">
        <h2 className="text-[13px] font-semibold uppercase tracking-wide mb-8" style={{ color: FAINT }}>
          Проекты
        </h2>
        <div className="flex flex-col gap-6">
          {projects.map((p, i) => (
            <div
              key={i}
              className="rounded-3xl p-6 md:p-8 grid md:grid-cols-5 gap-8 items-center"
              style={{ background: "#F3F4F7" }}
            >
              <div className="md:col-span-3">
                <ProjectMedia media={p.media} altBase={p.title} />
              </div>
              <div className="md:col-span-2 flex flex-col justify-center">
                <div className="flex gap-2 mb-4 flex-wrap">
                  {p.chips.map((c) => (
                    <span
                      key={c}
                      className="text-[12px] font-medium px-3 py-1 rounded-full"
                      style={{ background: "#E4E6EA", color: MUTED }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <h3
                  className="text-[22px] md:text-[24px] font-semibold mb-3"
                  style={{ fontFamily: DISPLAY_FONT }}
                >
                  {p.title}
                </h3>
                <p className="text-[15px] leading-[1.65] mb-5" style={{ color: MUTED }}>
                  {i === 0 && (
                    <>
                      Задизайнила FX-обменник для юридических лиц с нуля — от MVP с ограниченными валютными парами и лимитами операций до полноценного продукта для покупки и продажи валюты по динамическим котировкам. По мере развития продукта проектировала новые сценарии:{" "}
                      <strong className="font-semibold">
                        сделки по валютным контрактам, фиксация курса, сложные сценарии подписания и онбординг
                      </strong>
                    </>
                  )}
                  {i === 1 && (
                    <>
                      Редизайнила флоу международных переводов для юридических лиц: изначально задача заключалась в добавлении новых полей по стандарту ISO 20022, но я предложила переработать весь пользовательский сценарий.{" "}
                      <strong className="font-semibold">Разделила перегруженную одностраничную форму</strong> на последовательные шаги,{" "}
                      <strong className="font-semibold">интегрировала новые требования</strong> стандарта и {" "}
                      <strong className="font-semibold">добавила больше прозрачности в процесс</strong>, включая уведомления о нерабочих днях и подсказки о ближайшей доступной дате перевода
                    </>
                  )}
                  {i === 2 && (
                    <>
                      Спроектировала <strong className="font-semibold">новый сценарий массового подписания договоров</strong> в B2B-платформе электронного документооборота для случаев, когда инициатор не знает данные контрагентов заранее. Вместе с командой провела usability-тестирования и создала флоу, в котором компания делится QR-кодом или ссылкой на типовой договор, а контрагент самостоятельно заполняет свои данные и подписывает документ. Сценарий также стал{" "}
                      <strong className="font-semibold">дополнительной точкой входа в продукт</strong> для новых пользователей
                    </>
                  )}
                </p>

                {p.results.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {p.results.map((r) => (
                      <div
                        key={r}
                        className="rounded-xl px-4 py-3 text-[13px] font-semibold flex-1 min-w-[160px]"
                        style={{ background: "#DADCE1", color: INK, fontFamily: DISPLAY_FONT }}
                      >
                        {r}
                      </div>
                    ))}
                  </div>
                )}

                {p.note && (
                  <p className="text-[13px] italic" style={{ color: FAINT }}>
                    {p.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section className="py-16">
        <h2 className="text-[13px] font-semibold uppercase tracking-wide mb-8" style={{ color: FAINT }}>
          Опыт работы
        </h2>
        <div className="flex flex-col">
          {experience.map((e, i) => (
            <div
              key={e.company}
              className="grid md:grid-cols-[280px_1fr] gap-2 md:gap-10 py-7"
              style={{ borderTop: i === 0 ? "1px solid #EEF0F3" : "none", borderBottom: "1px solid #EEF0F3" }}
            >
              <div>
                <p className="text-[17px] font-semibold" style={{ fontFamily: DISPLAY_FONT }}>
                  {e.company}
                </p>
                <p className="text-[14px] mt-1" style={{ color: FAINT }}>
                  {e.period}
                </p>
              </div>
              <p className="text-[15px] leading-[1.65]" style={{ color: MUTED }}>
                {e.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact CTA */}
      <Section className="pb-24">
        <p
          className="text-[26px] md:text-[36px] leading-[1.4] font-semibold max-w-5xl"
          style={{ fontFamily: DISPLAY_FONT }}
        >
          На самом деле, за каждым проектом стоит своя история. Давайте обсудим детали вместе, и я
          расскажу вам подробнее о трудностях, исследованиях, решениях и результатах моей работы.
          Связаться со мной можно{" "}
          <TextLink href={LINKS.telegram} color={ACCENT} external>
            через Telegram
          </TextLink>
          , или{" "}
          <TextLink href={`mailto:${LINKS.email}`} color={ACCENT}>
            напишите мне на почту
          </TextLink>
          , или{" "}
          <TextLink href={LINKS.linkedin} color={ACCENT} external>
            установите контакт в LinkedIn
          </TextLink>
        </p>
      </Section>

      <footer className="border-t" style={{ borderColor: "#EEF0F3" }}>
        <Section className="py-8 text-[13px] flex items-center justify-between" style={{ color: FAINT }}>
          <span>© {new Date().getFullYear()} Айсулу Айтбаева</span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} />
            Алматы, Казахстан
          </span>
        </Section>
      </footer>
    </div>
  );
} 
