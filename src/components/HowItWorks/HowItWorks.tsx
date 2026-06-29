"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./HowItWorks.module.css";

const EASE = [0.44, 0, 0.56, 1] as const;

/* ---- Section-heading word stagger (same pattern as Solutions/Problem) ---- */
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

/* ---- Content (doc Section 4 — How It Works) ---- */
type Channel = {
  id: string;
  channel: string;
  title: string;
  description: string;
  bg: string;
};

const CHANNELS: Channel[] = [
  {
    id: "voice",
    channel: "Voice",
    title: "Natural borrower calls",
    description:
      "Inbound and outbound. Local presence dialing. Warm transfers to LOs with full conversation context.",
    bg: "/solutions/bg-green.png",
  },
  {
    id: "text",
    channel: "Text",
    title: "SMS follow-ups that convert",
    description:
      "Document reminders, payment nudges, appointment confirmations. Delivered when borrowers actually respond.",
    bg: "/solutions/bg-yellow.png",
  },
  {
    id: "email",
    channel: "Email",
    title: "Automated outreach that doesn't feel automated",
    description:
      "Personalized emails triggered by borrower behavior — not a blast schedule. Every message in context.",
    bg: "/solutions/bg-blue.png",
  },
];

/* ---- Card entrance (staggered, in-view) ---- */
const cardsContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function HowItWorks() {
  const reduce = useReducedMotion();

  return (
    <section className={styles.howItWorks} id="how-it-works" data-name="How It Works Section">
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
            <Words text="One agent. Every channel. Full context — always." />
          </h2>
          <p className={styles.subheading}>
            <Words text="Metal Labs agents work across voice, text, and email simultaneously. Every conversation is remembered. Every channel is connected. When a borrower calls after receiving a text, the agent picks up exactly where it left off." />
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className={styles.cards}
          variants={reduce ? undefined : cardsContainer}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, amount: 0.3 }}
        >
          {CHANNELS.map((c) => (
            <motion.article
              key={c.id}
              className={styles.card}
              variants={reduce ? undefined : cardVariant}
            >
              <Image
                src={c.bg}
                alt=""
                fill
                sizes="(max-width: 767px) 100vw, 33vw"
                className={styles.cardBg}
              />
              <div className={styles.glass}>
                <p className={styles.channel}>{c.channel}</p>
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <p className={styles.cardDesc}>{c.description}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
