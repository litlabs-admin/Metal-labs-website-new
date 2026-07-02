"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./Footer.module.css";

const PRODUCT_LINKS = [
  { label: "Overview", href: "#" },
  { label: "Consumers", href: "#" },
  { label: "Enterprise", href: "#" },
  { label: "Platform", href: "#" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Features", href: "#" },
  { label: "Solutions", href: "#solutions" },
];

const RESOURCES_LINKS = [
  { label: "Integrations", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Request Demo", href: "#book-a-demo" },
  { label: "Customers", href: "#" },
  { label: "FAQ", href: "#" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Careers & Culture", href: "#" },
  { label: "Our Technology", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contact", href: "#" },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "#" },
  { label: "X (Twitter)", href: "#" },
  { label: "Instagram", href: "#" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Legal", href: "#" },
];

const COLUMNS = [
  { head: "Product", links: PRODUCT_LINKS },
  { head: "Resources", links: RESOURCES_LINKS },
  { head: "Company", links: COMPANY_LINKS },
  { head: "Social", links: SOCIAL_LINKS },
  { head: "Legal", links: LEGAL_LINKS },
];

const EXTERNAL_HEADS = new Set(["Social"]);

const EASE = [0.44, 0, 0.56, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, ease: EASE },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <motion.div
        className={styles.inner}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className={styles.top}>
          {/* Brand block — logo, tagline, CTA pill */}
          <motion.div className={styles.brand} variants={itemVariants}>
            <a href="#" className={styles.logo} aria-label="MetalLabs home">
              <span className={styles.logoMark}>
                <Image src="/brand/sphere.webp" alt="" width={28} height={28} />
              </span>
              <span className={styles.logoText}>MetalLabs</span>
            </a>

            <p className={styles.tagline}>
              Every borrower conversation, handled — across voice, text, and email.
            </p>

            <a href="#book-a-demo" className={styles.cta}>Book a Demo</a>
          </motion.div>

          {/* Link columns */}
          <div className={styles.columns}>
            {COLUMNS.map((col) => {
              const external = EXTERNAL_HEADS.has(col.head);
              return (
                <motion.nav
                  key={col.head}
                  className={styles.col}
                  variants={itemVariants}
                  aria-label={`${col.head} navigation`}
                >
                  <p className={styles.colHead}>{col.head}</p>
                  <ul className={styles.colLinks}>
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          className={styles.colLink}
                          {...(external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.nav>
              );
            })}
          </div>
        </div>

        <motion.p className={styles.copyright} variants={itemVariants}>
          © 2026 MetalLabs. All rights reserved.
        </motion.p>
      </motion.div>

      {/* Giant faded brand watermark, clipped by the footer's bottom edge */}
      <div className={styles.watermark} aria-hidden="true">
        metal labs
      </div>
    </footer>
  );
}
