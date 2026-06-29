import styles from "./HeroButton.module.css";

type HeroButtonProps = {
  label: string;
  href?: string;
  /** "primary" = dark fill, "outline" = white with border */
  variant?: "primary" | "outline";
  className?: string;
};

/**
 * Sasonix-style pill button with the dual-layer "slide-up" text hover effect.
 * Two stacked copies of the label translate on hover so the label appears to
 * roll upward. Reused by both hero CTAs and the navbar CTA.
 */
export default function HeroButton({
  label,
  href = "#",
  variant = "primary",
  className = "",
}: HeroButtonProps) {
  return (
    <a
      href={href}
      className={`${styles.button} ${styles[variant]} ${className}`}
      data-variant={variant}
    >
      <span className={styles.textMask} aria-hidden="true">
        <span className={styles.textRoll}>
          <span className={styles.textLine}>{label}</span>
          <span className={styles.textLine}>{label}</span>
        </span>
      </span>
      {/* Accessible label (the rolling spans are aria-hidden) */}
      <span className={styles.srOnly}>{label}</span>
    </a>
  );
}
