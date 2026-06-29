"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { label: "Solutions", href: "#solutions" },
  { label: "Product", href: "#product" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "About", href: "#about" },
];

const SCROLL_THRESHOLD = 50;

const menuVariants = {
  hidden: { opacity: 0, y: -8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.44, 0, 0.56, 1] as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: [0.44, 0, 0.56, 1] as const } },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navClass = [styles.navbar, scrolled ? styles.scrolled : ""].join(" ").trim();

  return (
    <>
      <header className={navClass} data-name="Navbar">
        <div className={styles.inner}>
          {/* Logo */}
          <a href="#" className={styles.logo} aria-label="MetalLabs home">
            <span className={styles.logoMark}>
              <Image src="/brand/sphere.webp" alt="" width={28} height={28} priority />
            </span>
            <span className={styles.logoText}>MetalLabs</span>
          </a>

          {/* Center nav links */}
          <ul className={styles.links}>
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={styles.link}>{link.label}</a>
              </li>
            ))}
          </ul>

          {/* Right CTA */}
          <div className={styles.actions}>
            <a href="#book-a-demo" className={styles.ctaButton}>Book a Demo</a>
            <button
              className={styles.hamburger}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className={[styles.bar, menuOpen ? styles.barTopOpen : ""].join(" ").trim()} />
              <span className={[styles.bar, menuOpen ? styles.barMidOpen : ""].join(" ").trim()} />
              <span className={[styles.bar, menuOpen ? styles.barBotOpen : ""].join(" ").trim()} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-page menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            variants={menuVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <ul className={styles.mobileLinks}>
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={styles.mobileLink}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#book-a-demo"
              className={styles.mobileCta}
              onClick={() => setMenuOpen(false)}
            >
              Book a Demo
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
