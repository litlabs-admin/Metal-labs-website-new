"use client";

import { motion, useReducedMotion } from "framer-motion";
import HeroButton from "@/components/Hero/HeroButton";
import styles from "./CTA.module.css";

const EASE = [0.44, 0, 0.56, 1] as const;

/* ---- Section-heading word stagger (same pattern as the other sections) ---- */
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

/* Actual Elora integration logo marks — SVG files copied from the Elora template cache. */
type Tile = { logo?: string; shimmer?: boolean; blank?: boolean };

/* 11 columns × 4 rows = 44 tiles (idx = row*11 + col), exactly matching Elora's
   1256px grid (11 × 96px tile + 10 × 20px gap). The centre block — rows 1-2,
   cols 2-8 — is left BLANK (clean white) so the headline + buttons sit in a real
   hole in the grid, exactly like the reference. Logos scatter around the edges. */
const HOLE = new Set([
  13, 14, 15, 16, 17, 18, 19, // row 1, cols 2-8
  24, 25, 26, 27, 28, 29, 30, // row 2, cols 2-8
]);

const LOGO_MAP: Record<number, Omit<Tile, "blank">> = {
  1:  { logo: "FDBSNxR3ZqRJIDmSSS7wjXE3a0.svg" },                // row0 col1  — gray V-chevron
  4:  { logo: "9xoo5iHRal6DkGzjtzhjBk7tX3M.svg", shimmer: true }, // row0 col4  — blue cross-star
  6:  { logo: "ew8cbuQoWiQFfM5B8kT3eau3i6g.svg" },                // row0 col6  — gray chain
  8:  { logo: "Wq0S7S01qIHFTeeoMEpvIM5ZFw.svg" },                 // row0 col8  — gray lightning
  10: { logo: "vWPx8ynO7P9EdxAlxLcIiwljgg.svg" },                 // row0 col10 — gray S-curve
  11: { logo: "M8xqnto01Pm4p5cV3855P8lSt3w.svg", shimmer: true }, // row1 col0  — orange sparkle
  21: { logo: "CFpm1LB2PM9s1NpZyKWUSKZchIA.svg" },                // row1 col10 — magenta flower
  22: { logo: "UfaMU2BnvP2YqJe1NhlVYCY3wE.svg" },                 // row2 col0  — gray leaf
  32: { logo: "hgeopcKjfZhFBFRWYBRLgoxGUQ.svg" },                 // row2 col10 — green arcs
  33: { logo: "YVQesY55yj9iho1HlTezHizQU.svg" },                  // row3 col0  — gray hashtag
  38: { logo: "frOVbb44VGMvhjQrcDipvPOFsF0.svg" },                // row3 col5  — gray stripes
  41: { logo: "df8drHzShkI2iTPM6DodjUuwg.svg", shimmer: true },   // row3 col8  — teal asterisk
};

const TILES: Tile[] = Array.from({ length: 44 }, (_, i) =>
  HOLE.has(i) ? { blank: true } : LOGO_MAP[i] ?? {}
);

/* Tile entrance — staggered scale/fade by index. */
const tileGridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.012 } },
};
const tileVariant = {
  hidden: { opacity: 0, scale: 0.82 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } },
};

export default function CTA() {
  const reduce = useReducedMotion();

  return (
    <section className={styles.cta} id="cta" data-name="Closing CTA Section">
      <div className={styles.container}>
        <div className={styles.stage}>
          {/* Scatter tile grid (background layer) */}
          <motion.div
            className={styles.grid}
            aria-hidden="true"
            variants={reduce ? undefined : tileGridVariants}
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={{ once: true, amount: 0.2 }}
          >
            {TILES.map((t, i) =>
              t.blank ? (
                // Centre hole — keeps the grid cell but stays clean white.
                <span key={i} className={styles.tileBlank} aria-hidden="true" />
              ) : (
                <motion.span
                  key={i}
                  className={[styles.tile, t.logo ? styles.tileLogo : ""].join(" ").trim()}
                  variants={reduce ? undefined : tileVariant}
                  whileHover={!reduce && t.logo ? { y: -3, scale: 1.06 } : undefined}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  {t.logo && (
                    <motion.img
                      className={styles.glyph}
                      src={`/integrations/${t.logo}`}
                      alt=""
                      width={40}
                      height={40}
                      animate={
                        !reduce && t.shimmer
                          ? { opacity: [0.75, 1, 0.75], scale: [1, 1.08, 1] }
                          : undefined
                      }
                      transition={
                        !reduce && t.shimmer
                          ? { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
                          : undefined
                      }
                    />
                  )}
                </motion.span>
              )
            )}
          </motion.div>

          {/* Centered content (overlays the grid; radial fade keeps it legible) */}
          <div className={styles.content}>
            <motion.h2
              className={styles.heading}
              variants={headerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
            >
              <Words text="Your competitors are still dialing manually." />
            </motion.h2>
            <motion.div
              className={styles.actions}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            >
              <HeroButton label="Book a Demo" variant="primary" />
              <HeroButton label="Call Our Agent →" variant="outline" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
