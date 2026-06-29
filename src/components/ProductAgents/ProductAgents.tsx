"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./ProductAgents.module.css";

const EASE = [0.44, 0, 0.56, 1] as const;

/* ---- Section-heading word stagger (same pattern as Solutions/HowItWorks) ---- */
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

/* ---- Content (doc Section 5 — Product Agents) ---- */
type Agent = {
  id: string;
  group: "Origination" | "Servicing";
  title: string;
  description: string;
  grad: string;
};

/* Same painterly gradient images used in HowItWorks (bg-green/yellow/blue),
   cycled across the 7 cards. */
const AGENTS: Agent[] = [
  // --- Origination ---
  {
    id: "loan-officer",
    group: "Origination",
    title: "AI Loan Officer",
    description:
      "Prequalifies borrowers, captures intent, and books LO calls — 24/7, in under a second.",
    grad: "/solutions/bg-green.png",
  },
  {
    id: "doc-collection",
    group: "Origination",
    title: "AI Doc Collection Agent",
    description:
      "Follows up on missing documents across voice, text, and email until the file is complete.",
    grad: "/solutions/bg-yellow.png",
  },
  {
    id: "outbound-lead",
    group: "Origination",
    title: "AI Outbound Lead Agent",
    description:
      "Works your CRM and lead lists — calling, qualifying, and warming up borrowers for your LOs.",
    grad: "/solutions/bg-blue.png",
  },
  {
    id: "after-hours",
    group: "Origination",
    title: "AI After-Hours Agent",
    description:
      "Handles inbound calls and texts when your team is offline. No lead left behind.",
    grad: "/solutions/bg-green.png",
  },
  // --- Servicing ---
  {
    id: "payment-reminder",
    group: "Servicing",
    title: "AI Payment Reminder Agent",
    description:
      "Proactive reminders before due dates. Fewer late payments, less manual outreach.",
    grad: "/solutions/bg-blue.png",
  },
  {
    id: "delinquency",
    group: "Servicing",
    title: "AI Delinquency Agent",
    description:
      "Early outreach on overdue accounts — empathetic, compliant, and effective at setting up payment plans.",
    grad: "/solutions/bg-yellow.png",
  },
  {
    id: "collections",
    group: "Servicing",
    title: "AI Collections Agent",
    description:
      "FDCPA-compliant collections at scale. Recovers more without adding headcount.",
    grad: "/solutions/bg-blue.png",
  },
];

const GROUPS: Agent["group"][] = ["Origination", "Servicing"];

/* ---- Card entrance (staggered, in-view) ---- */
const cardsContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function ProductAgents() {
  const reduce = useReducedMotion();

  return (
    <section className={styles.productAgents} id="product-agents" data-name="Product Agents Section">
      <div className={styles.container}>
        {/* Section heading */}
        <motion.div
          className={styles.header}
          variants={headerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className={styles.eyebrow}>Product Agents</p>
          <h2 className={styles.heading}>
            <Words text="Purpose-built agents for every step of the journey." />
          </h2>
          <p className={styles.subheading}>
            <Words text="Not a generic AI. Agents trained on how mortgage actually works." />
          </p>
        </motion.div>

        {/* Grouped grids: Origination, then Servicing */}
        <div className={styles.groups}>
          {GROUPS.map((group) => (
            <div key={group} className={styles.group}>
              <p className={styles.groupLabel}>{group} Agents</p>
              <motion.div
                className={styles.grid}
                variants={reduce ? undefined : cardsContainer}
                initial={reduce ? false : "hidden"}
                whileInView={reduce ? undefined : "show"}
                viewport={{ once: true, amount: 0.3 }}
              >
                {AGENTS.filter((a) => a.group === group).map((a) => (
                  <motion.article
                    key={a.id}
                    className={styles.card}
                    variants={reduce ? undefined : cardVariant}
                  >
                    <Image
                      src={a.grad}
                      alt=""
                      fill
                      sizes="(max-width: 767px) 50vw, (max-width: 1199px) 33vw, 25vw"
                      className={styles.gradient}
                    />
                    <div className={styles.cardBody}>
                      <p className={styles.cardName}>{a.title}</p>
                      <p className={styles.cardDesc}>{a.description}</p>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
