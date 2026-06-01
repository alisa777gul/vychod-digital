import styles from "./Button.module.css";

export default function Button({ href, children, variant = "brush" }) {
  if (variant === "outline") {
    return (
      <a className={`${styles.button} ${styles.outlineButton}`} href={href}>
        <svg
          className={styles.outlineSvg}
          viewBox="0 0 220 64"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M12 14
               C48 11, 86 12, 120 12
               C154 12, 188 13, 209 17
               C211 28, 211 39, 205 48
               C165 51, 126 50, 88 50
               C52 50, 26 48, 13 44
               C10 34, 10 23, 12 14Z"
            fill="none"
            stroke="#df0014"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span>{children}</span>
      </a>
    );
  }

  return (
    <a className={`${styles.button} ${styles.brushButton}`} href={href}>
      <svg
        className={styles.brush}
        viewBox="0 0 220 64"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M10 18
             C38 12, 76 13, 110 12
             C145 11, 180 12, 210 17
             C214 24, 213 34, 207 41
             C170 45, 132 45, 94 45
             C58 45, 28 43, 11 38
             C7 31, 7 24, 10 18Z"
          fill="currentColor"
        />

        <path
          d="M40 54 C82 50, 135 52, 184 48"
          fill="none"
          stroke="var(--button-accent)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <path
          d="M88 58 C116 55, 148 56, 174 53"
          fill="none"
          stroke="var(--button-accent)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      <span>{children}</span>
    </a>
  );
}
