"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import HeroButton from "./HeroButton";
import styles from "./Hero.module.css";

const EASE = [0.44, 0, 0.56, 1] as const;

const riseUp = {
  hidden: { opacity: 0, y: 60 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: i * 0.15 },
  }),
};

export default function Hero() {
  return (
    <section className={styles.hero} data-name="Hero Section">
      {/* Background image */}
      <div className={styles.bg} data-name="Hero Image">
        <Image
          src="/hero/hero-bg.avif"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.bgImage}
        />
      </div>

      {/* Bottom gradient overlay */}
      <div className={styles.gradient} data-name="Linear" aria-hidden="true" />

      {/* Main container */}
      <div className={styles.container}>
        {/* Content: title + buttons + trust line */}
        <motion.div
          className={styles.content}
          variants={riseUp}
          custom={0}
          initial="hidden"
          animate="show"
        >
          <div className={styles.title}>
            <p className={styles.eyebrow}>For US Mortgage &amp; Home Lenders</p>
            <h1 className={styles.headline}>
              The only AI agent platform
              <br className={styles.headlineBreak} />
              {" "}mortgage lenders will ever need.
            </h1>
            <p className={styles.subtext}>
              From the first lead call to the final payment — MetalLabs handles
              every borrower conversation across voice, text, and email. One
              platform. No gaps. No excuses.
            </p>
          </div>

          <div className={styles.buttons}>
            <HeroButton
              label="Book a Demo"
              href="#book-a-demo"
              variant="primary"
            />
            <HeroButton
              label="Call our AI agent now"
              href="#call"
              variant="outline"
            />
          </div>

          <p className={styles.trust}>
            Built for US home lenders · Voice · Text · Email · TCPA Compliant
          </p>
        </motion.div>

        {/* Dashboard mockups */}
        <motion.div
          className={styles.dashboardContent}
          variants={riseUp}
          custom={1}
          initial="hidden"
          animate="show"
        >
          <div className={styles.codeCard} data-name="Code Card">
            <div className={styles.codeCardInner}>
              <Image
                src="/brand/sphere.webp"
                alt="MetalLabs sphere"
                width={120}
                height={120}
                className={styles.codeCardSphere}
              />
              <span className={styles.codeCardLabel}>MetalLabs Platform</span>
              <span className={styles.codeCardSub}>Product screenshot coming soon</span>
            </div>
          </div>
          <div className={styles.dashboard} data-name="Dashboard">
            <Image
              src="/hero/dashboard.avif"
              alt="MetalLabs dashboard"
              width={4000}
              height={1844}
              className={styles.dashboardImg}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
