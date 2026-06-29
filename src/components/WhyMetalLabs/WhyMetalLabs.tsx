"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import styles from "./WhyMetalLabs.module.css";

const EASE = [0.44, 0, 0.56, 1] as const;

/* ---- Section-heading word stagger (same pattern as HowItWorks/ProductAgents) ---- */
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

/* ---- Shared primitive: check mark ---- */
function DrawCheck({ redraw = false }: { redraw?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <span className={styles.check}>
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <motion.path
          key={redraw ? "active" : "idle"}
          d="M2.5 6.2 4.8 8.5 9.5 3.5"
          stroke="#fff"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={reduce ? undefined : { pathLength: 1 }}
          transition={{ duration: 0.35, ease: EASE }}
        />
      </svg>
    </span>
  );
}

/* ---- Shared primitive: pulsing "live" dot ---- */
function LiveDot() {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={styles.liveDot}
      animate={reduce ? {} : { scale: [1, 1.4, 1], opacity: [1, 0.45, 1] }}
      transition={reduce ? undefined : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/* ============================================================
   Widget 1 — "One platform. Not three."
   Three tool chips fade/strike out → unified pill glows on hover.
   ============================================================ */
function PlatformWidget({ hovered }: { hovered: boolean }) {
  const reduce = useReducedMotion();
  const tools = ["Lead outreach", "Doc collection", "Servicing calls"];
  const active = hovered && !reduce;
  return (
    <div className={styles.widget}>
      <div className={styles.toolStack}>
        {tools.map((t, i) => (
          <motion.span
            key={t}
            className={styles.toolChip}
            initial={reduce ? false : { opacity: 0, x: -10 }}
            whileInView={reduce ? undefined : { opacity: active ? 0.3 : 0.55, x: 0 }}
            animate={{ opacity: active ? 0.3 : 0.55 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, ease: EASE, delay: i * 0.08 }}
          >
            {active && <span className={styles.toolStrike} />}
            <span className={styles.toolDot} />
            {t}
          </motion.span>
        ))}
      </div>
      <motion.div
        className={styles.unifiedPill}
        initial={reduce ? false : { opacity: 0, y: 10, scale: 0.96 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
        animate={active ? { scale: 1.03, boxShadow: "0 6px 20px rgba(44,24,11,0.22)" } : { scale: 1, boxShadow: "none" }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.45, ease: EASE, delay: reduce ? 0 : 0.32 }}
      >
        <span className={styles.unifiedMark}>
          <Image src="/brand/sphere.webp" alt="" width={20} height={20} />
        </span>
        Metal Labs · one platform
        <DrawCheck redraw={hovered} />
      </motion.div>
    </div>
  );
}

/* ============================================================
   Widget 2 — "Built for mortgage. Not adapted for it."
   Flow items highlight sequentially on hover; checks re-draw.
   ============================================================ */
function CallFlowWidget({ hovered }: { hovered: boolean }) {
  const reduce = useReducedMotion();
  const steps = [
    "Prequalification flow",
    "Objection handling",
    "Compliance guardrails",
    "Warm transfer to LO",
  ];
  return (
    <div className={styles.widget}>
      <div className={styles.flowHead}>
        <span className={styles.flowLabel}>Call flow</span>
        <span className={styles.flowTag}>Mortgage-native</span>
      </div>
      <div className={styles.flowList}>
        {steps.map((s, i) => (
          <motion.div
            key={s}
            className={styles.flowItem}
            initial={reduce ? false : { opacity: 0, x: -8 }}
            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
            animate={
              hovered && !reduce
                ? {
                    backgroundColor: "rgba(255,255,255,0.92)",
                    borderColor: "rgba(27,138,90,0.3)",
                    x: 3,
                  }
                : {
                    backgroundColor: "rgba(255,255,255,0.66)",
                    borderColor: "rgba(243,237,231,1)",
                    x: 0,
                  }
            }
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.35,
              ease: EASE,
              delay: hovered ? i * 0.07 : 0,
            }}
          >
            <DrawCheck redraw={hovered} />
            <span className={styles.flowName}>{s}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   Widget 3 — "Compliant by design." (light card)
   On hover, a new live log entry slides in; rows brighten.
   ============================================================ */
function ComplianceWidget({ hovered }: { hovered: boolean }) {
  const reduce = useReducedMotion();
  const log = [
    { time: "09:42", text: "Call recorded · audit-ready" },
    { time: "09:41", text: "Consent verified · TCPA" },
    { time: "09:38", text: "Cease-and-desist honored · FDCPA" },
    { time: "09:35", text: "Conversation logged · timestamped" },
  ];
  return (
    <div className={styles.complianceWidget}>
      <div className={styles.badgeRow}>
        {["TCPA", "FDCPA"].map((b) => (
          <span key={b} className={styles.complianceBadge}>
            <span className={styles.shield} aria-hidden="true">
              <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
                <path
                  d="M6 1 10.5 2.6V6c0 3-2 4.7-4.5 5.8C3 10.7 1.5 9 1.5 6V2.6L6 1Z"
                  fill="currentColor"
                  opacity="0.2"
                />
                <path
                  d="M6 1 10.5 2.6V6c0 3-2 4.7-4.5 5.8C3 10.7 1.5 9 1.5 6V2.6L6 1Z"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.2 6.3 5.5 7.6 8 4.9"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {b}
          </span>
        ))}
        <span className={styles.liveTag}>
          <LiveDot /> Live
        </span>
      </div>
      <div className={styles.logFeed}>
        {/* Live entry slides in only when hovered */}
        <AnimatePresence>
          {hovered && !reduce && (
            <motion.div
              key="live-entry"
              className={[styles.logRow, styles.logRowLive].join(" ")}
              initial={{ opacity: 0, y: 12, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -6, height: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <LiveDot />
              <span className={styles.logText}>Live audit trail active</span>
            </motion.div>
          )}
        </AnimatePresence>
        {log.map((l, i) => (
          <motion.div
            key={l.time}
            className={styles.logRow}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            animate={
              hovered && !reduce
                ? { backgroundColor: "rgba(255,255,255,0.92)", borderColor: "rgba(27,138,90,0.3)" }
                : { backgroundColor: "rgba(255,255,255,0.66)", borderColor: "rgba(243,237,231,1)" }
            }
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.35,
              ease: EASE,
              delay: hovered ? 0 : 0.1 + i * 0.1,
            }}
          >
            <span className={styles.logTime}>{l.time}</span>
            <span className={styles.logText}>{l.text}</span>
            <DrawCheck />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ---- Card entrance (staggered, in-view) ---- */
const cardsContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function WhyMetalLabs() {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className={styles.why} id="why-metal-labs" data-name="Why Metal Labs Section">
      <div className={styles.container}>
        {/* Section heading */}
        <motion.div
          className={styles.header}
          variants={headerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className={styles.eyebrow}>Why Metal Labs</p>
          <h2 className={styles.heading}>
            <Words text="Why the best lenders will choose Metal Labs." />
          </h2>
        </motion.div>

        {/* Asymmetric card grid */}
        <motion.div
          className={styles.grid}
          variants={reduce ? undefined : cardsContainer}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Card 1 — wide, light marble */}
          <motion.article
            className={[styles.card, styles.cardWide].join(" ")}
            variants={reduce ? undefined : cardVariant}
            whileHover={reduce ? undefined : { y: -4 }}
            transition={{ duration: 0.45, ease: EASE }}
            onHoverStart={() => setHovered(0)}
            onHoverEnd={() => setHovered(null)}
          >
            <Image
              src="/solutions/bg-marble.webp"
              alt=""
              fill
              sizes="(max-width: 1199px) 100vw, 58vw"
              className={styles.cardBg}
            />
            <div className={styles.glass}>
              <div className={styles.cardText}>
                <h3 className={styles.cardTitle}>One platform. Not three.</h3>
                <p className={styles.cardDesc}>
                  Stop stitching together tools. Metal Labs covers origination and servicing in one
                  place — with one integration, one dashboard, and one team to call.
                </p>
              </div>
              <PlatformWidget hovered={hovered === 0} />
            </div>
          </motion.article>

          {/* Card 2 — narrow, gradient */}
          <motion.article
            className={[styles.card, styles.cardNarrow].join(" ")}
            variants={reduce ? undefined : cardVariant}
            whileHover={reduce ? undefined : { y: -4 }}
            transition={{ duration: 0.45, ease: EASE }}
            onHoverStart={() => setHovered(1)}
            onHoverEnd={() => setHovered(null)}
          >
            <Image
              src="/solutions/bg-yellow.png"
              alt=""
              fill
              sizes="(max-width: 1199px) 100vw, 42vw"
              className={styles.cardBg}
            />
            <div className={styles.glass}>
              <div className={styles.cardText}>
                <h3 className={styles.cardTitle}>Built for mortgage. Not adapted for it.</h3>
                <p className={styles.cardDesc}>
                  Every call flow, objection handler, and compliance guardrail is designed for home
                  lending — not repurposed from a generic AI platform.
                </p>
              </div>
              <CallFlowWidget hovered={hovered === 1} />
            </div>
          </motion.article>

          {/* Card 3 — full-width, light glass over blue gradient */}
          <motion.article
            className={[styles.card, styles.cardFull].join(" ")}
            variants={reduce ? undefined : cardVariant}
            whileHover={reduce ? undefined : { y: -4 }}
            transition={{ duration: 0.45, ease: EASE }}
            onHoverStart={() => setHovered(2)}
            onHoverEnd={() => setHovered(null)}
          >
            <Image
              src="/solutions/bg-blue.png"
              alt=""
              fill
              sizes="100vw"
              className={styles.cardBg}
            />
            <div className={styles.glass}>
              <div className={styles.cardText}>
                <h3 className={styles.cardTitle}>Compliant by design.</h3>
                <p className={styles.cardDesc}>
                  TCPA and FDCPA compliance built into every interaction. Every call logged. Every
                  conversation auditable. Built for regulated lending from day one.
                </p>
              </div>
              <ComplianceWidget hovered={hovered === 2} />
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
