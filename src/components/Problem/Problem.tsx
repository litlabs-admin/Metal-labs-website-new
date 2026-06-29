"use client";

import { motion } from "framer-motion";
import styles from "./Problem.module.css";

const EASE = [0.44, 0, 0.56, 1] as const;

// Lead sentence renders dark; the continuation paragraphs render muted —
// all at one type size, matching Planar's "Intro" section.
const LEAD = "Most lenders are running three tools to do one job.";

const BODY = [
  "One platform for lead outreach. Another for doc collection follow-ups. A third for servicing calls. None of them talk to each other. Borrowers repeat themselves. Loan officers waste hours. Defaults slip through the cracks.",
  "Metal Labs replaces all of it. One AI agent platform that covers the entire borrower lifecycle — origination through servicing — across every channel your borrowers actually use.",
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.018 },
  },
};

const word = {
  hidden: { opacity: 0.001, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <motion.span key={i} className={styles.word} variants={word}>
          {w}
          {i < text.split(" ").length - 1 ? " " : ""}
        </motion.span>
      ))}
    </>
  );
}

export default function Problem() {
  return (
    <section className={styles.problem} data-name="Problem Section">
      <div className={styles.container}>
        <motion.div
          className={styles.text}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2 className={styles.lead}>
            <Words text={LEAD} />
          </h2>
          {BODY.map((p, i) => (
            <p key={i} className={styles.body}>
              <Words text={p} />
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
