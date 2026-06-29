"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLenis } from "@/components/providers/LenisProvider";
import { Mockup } from "./Mockups";
import styles from "./Solutions.module.css";

const EASE = [0.44, 0, 0.56, 1] as const;

/* ---- Section-heading word stagger (same pattern as Problem) ---- */
const headerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.018 } },
};
const wordVariant = {
  hidden: { opacity: 0.001, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
function Words({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <motion.span key={i} className={styles.word} variants={wordVariant}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </>
  );
}

/* ---- Content ---- */
type Feature = {
  id: string;
  group: "Origination" | "Servicing";
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    id: "inbound",
    group: "Origination",
    title: "Inbound lead qualification",
    description:
      "Every inbound lead gets contacted in seconds. Our AI agent qualifies, captures intent, and books the LO call — before your competitor even picks up the phone.",
  },
  {
    id: "outbound",
    group: "Origination",
    title: "Outbound lead calling",
    description:
      "Aged leads, CRM contacts, purchased lists — the agent dials them all, warms them up, and hands off only the ready ones to your loan officers.",
  },
  {
    id: "documents",
    group: "Origination",
    title: "Document collection",
    description:
      "Automated follow-ups across voice, text, and email until every doc is in. No chasing. No dropped applications. Faster clear-to-close.",
  },
  {
    id: "afterhours",
    group: "Origination",
    title: "After-hours support",
    description:
      "Borrowers don't wait until Monday. Neither does your AI agent. Inbound calls and texts handled 24/7, with full context on every conversation.",
  },
  {
    id: "chat",
    group: "Origination",
    title: "Website chat",
    description:
      "Every visitor who asks a question gets an answer — and a next step. Not a form. Not a callback request. An actual conversation.",
  },
  {
    id: "payments",
    group: "Servicing",
    title: "Payment reminders",
    description:
      "Proactive outreach before payments are due — across voice, text, and email. Fewer late payments. Fewer calls to your servicing team.",
  },
  {
    id: "delinquency",
    group: "Servicing",
    title: "Delinquency outreach",
    description:
      "Early, consistent contact the moment an account goes delinquent. The agent handles the conversation, sets up payment plans, and escalates only when it matters.",
  },
  {
    id: "collections",
    group: "Servicing",
    title: "Collections",
    description:
      "FDCPA-compliant collections calls at scale. The agent handles objections, negotiates payment arrangements, and recovers more with less headcount.",
  },
  {
    id: "payoff",
    group: "Servicing",
    title: "Payoff and loan inquiries",
    description:
      "Borrowers get instant, accurate answers on payoff amounts, loan status, and account details — without waiting on hold or emailing your servicing desk.",
  },
];

const GROUPS: Feature["group"][] = ["Origination", "Servicing"];

/* ---- Scroll-spy: which card currently occupies the sticky line ---- */
/* Replicates Planar's variant-appear effect: the active link advances as each
   card reaches the sticky zone. A trigger band near the top (120px sticky line
   down to ~45% viewport) ensures exactly one card is active at a time. */
function useActiveFeature(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const visible = new Set<string>();
    const order = new Map(ids.map((id, i) => [id, i]));

    const pickTopmost = () => {
      let best: string | null = null;
      let bestIdx = Infinity;
      visible.forEach((id) => {
        const idx = order.get(id) ?? Infinity;
        if (idx < bestIdx) {
          bestIdx = idx;
          best = id;
        }
      });
      if (best) setActiveId(best);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-feature");
          if (!id) return;
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
        });
        pickTopmost();
      },
      { rootMargin: "-120px 0px -55% 0px", threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(`feature-${id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

export default function Solutions() {
  const ids = useRef(FEATURES.map((f) => f.id)).current;
  const activeId = useActiveFeature(ids);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const lenis = useLenis();

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(`#feature-${id}`, { offset: -120 });
    } else {
      document.getElementById(`feature-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className={styles.solutions} id="solutions" data-name="Solutions Section">
      <div className={styles.container}>
        {/* Section heading */}
        <motion.div
          className={styles.header}
          variants={headerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className={styles.heading}>
            <Words text="Built for the full borrower lifecycle." />
          </h2>
          <p className={styles.subheading}>
            <Words text="Two sides of your business. One platform." />
          </p>
        </motion.div>

        {/* FAQ Tabs block — rendered immediately, no entrance animation */}
        <div className={styles.faqTabs}>
          {/* Sidebar — sticky; stays pinned while cards scroll */}
          <nav className={styles.sidebar} aria-label="Solutions categories">
            {GROUPS.map((group) => (
              <div key={group} className={styles.group}>
                <p className={styles.groupLabel}>{group}</p>
                {FEATURES.filter((f) => f.group === group).map((f) => (
                  <a
                    key={f.id}
                    href={`#feature-${f.id}`}
                    className={[styles.tabLink, activeId === f.id ? styles.tabActive : ""].join(" ").trim()}
                    aria-current={activeId === f.id ? "true" : undefined}
                    onClick={(e) => handleNavClick(e, f.id)}
                  >
                    {f.title}
                  </a>
                ))}
              </div>
            ))}
          </nav>

          {/* Cards — stacked, scroll normally */}
          <div className={styles.cards}>
            {FEATURES.map((f) => (
              <div
                key={f.id}
                id={`feature-${f.id}`}
                data-feature={f.id}
                className={styles.card}
                onMouseEnter={() => setHoveredId(f.id)}
                onMouseLeave={() => setHoveredId((cur) => (cur === f.id ? null : cur))}
              >
                <div className={styles.cardText}>
                  <p className={styles.cardTitle}>{f.title}</p>
                  <p className={styles.cardDesc}>{f.description}</p>
                </div>
                <div className={styles.cardVisual}>
                  <Mockup id={f.id} hovered={hoveredId === f.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
