import React from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

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
  // Положите файл резюме в папку /public как cv.pdf — ссылка ниже уже на него ссылается.
  cv: "/cv.pdf",
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

const projects = [
  {
    chips: ["UX/UI", "Web", "Mobile"],
    title: "FX Exchange для бизнеса",
    description:
      "Задизайнила FX-обменник для юридических лиц с нуля — от MVP с ограниченными валютными парами и лимитами операций до полноценного продукта для покупки и продажи валюты по динамическим котировкам. По мере развития продукта проектировала новые сценарии и усложняла флоу: сделки по валютным контрактам, фиксация курса, сложные сценарии подписания и онбординг.",
    results: ["MVP → полноценный продукт", "Проведение usability-тестирований", "Рост ежедневных FX-операций в 5,9 раза"],
    note: null,
  },
  {
    chips: ["UX/UI", "Mobile"],
    title: "Редизайн международных переводов",
    description:
      "Редизайнила флоу международных переводов для юридических лиц: изначально задача заключалась в добавлении новых полей по стандарту ISO 20022, но я предложила переработать весь пользовательский сценарий. Разделила перегруженную одностраничную форму на последовательные шаги, интегрировала новые требования стандарта и добавила больше прозрачности в процесс — включая уведомления о нерабочих днях и подсказки о ближайшей доступной дате перевода.",
    results: [],
    note: "Флоу уже запущен, продуктовые метрики сейчас собираются",
  },
  {
    chips: ["UX/UI", "Web", "Mobile"],
    title: "Договоры по QR для электронного документооборота",
    description:
      "Спроектировала новый сценарий массового подписания договоров в B2B-платформе электронного документооборота — для случаев, когда инициатор не знает данные контрагентов заранее. Вместе с командой провела usability-тестирования и создала flow, в котором компания делится QR-кодом или ссылкой на типовой договор, а контрагент самостоятельно заполняет свои данные и подписывает документ. Сценарий также стал дополнительной точкой входа в продукт для новых пользователей.",
    results: ["−32% времени от создания до подписания", "QR → registration conversion 11%"],
    note: null,
  },
];

const experience = [
  {
    company: "Alatau City Bank (ex. Jusan Bank)",
    period: "декабрь 2025 — настоящее время",
    description:
      "Работаю в команде ВЭДа, в банке для юридических лиц. Наша команда отвечает за все валютные продукты: всевозможные конвертации, переводы, валютные контракты. Как единственный дизайнер в команде, я успела поработать с этими продуктами сразу с нескольких сторон — не только дизайнила пользовательские интерфейсы (web и mobile), но и проектировала админ-панель для валютного контроля и казначейства.",
  },
  {
    company: "Documentolog",
    period: "май 2025 — ноябрь 2025",
    description:
      "Изначально начала работу в команде как дизайнер для лендингов, но позже благодаря помощи коллег доросла до дизайнера продукта по электронному документообороту для физ. лиц и предпринимателей. Здесь научилась работать с кроссплатформенными продуктами, много концептить и не бояться предлагать смелые решения.",
  },
  {
    company: "New Project",
    period: "март 2024 — май 2025",
    description:
      "Моя первая работа как продуктового дизайнера началась здесь. Дизайнила интерфейс для мобильного приложения для брокеров. В этой команде я узнала больше о бизнес-процессах и том, какое место в них занимает дизайн; о том, как фича проходит свой путь от гипотезы до реализации и конечного пользователя.",
  },
];

function ProjectScreenshotPlaceholder() {
  return (
    <div
      className="rounded-2xl h-full min-h-[280px] flex items-center justify-center"
      style={{ background: "#FFFFFF" }}
    >
      <div className="text-center px-6">
        <div
          className="mx-auto mb-3 rounded-full flex items-center justify-center"
          style={{ width: 40, height: 40, background: "#EEF0F3" }}
        >
          <ArrowUpRight size={18} color={FAINT} />
        </div>
        <p className="text-sm" style={{ color: FAINT }}>
          Скриншот интерфейса
        </p>
      </div>
    </div>
  );
}

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
          <div className="flex items-center gap-3">
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
              download
              className="cv-btn flex items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-medium text-white"
              style={{ background: ACCENT }}
            >
              CV <ArrowDown size={14} />
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
          Продуктовый дизайнер в <Accent>B2B fintech</Accent>. Работаю
          над продуктами для банкинга: от <Accent>валютных операций до международных переводов</Accent>.
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
              className="rounded-3xl p-6 md:p-8 grid md:grid-cols-2 gap-8 items-stretch"
              style={{ background: "#F3F4F7" }}
            >
              <ProjectScreenshotPlaceholder />
              <div className="flex flex-col justify-center">
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
                  {p.description}
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
          На самом деле, за каждым проектом стоит гораздо больше трудов. Давайте созвонимся, и я
          расскажу вам подробнее о трудностях, исследованиях, решениях и результатах моей работы.
          Связаться со мной можно{" "}
          <TextLink href={LINKS.telegram} color={ACCENT} external>
            через Telegram
          </TextLink>
          , или{" "}
          <TextLink href={`mailto:${LINKS.email}`} color={ACCENT}>
            напишите мне на почту
          </TextLink>
          , или{" "}
          <TextLink href={LINKS.linkedin} color={ACCENT} external>
            установите контакт в LinkedIn
          </TextLink>
          .
        </p>
      </Section>

      <footer className="border-t" style={{ borderColor: "#EEF0F3" }}>
        <Section className="py-8 text-[13px]" style={{ color: FAINT }}>
          © {new Date().getFullYear()} Айсулу Айтбаева
        </Section>
      </footer>
    </div>
  );
}
