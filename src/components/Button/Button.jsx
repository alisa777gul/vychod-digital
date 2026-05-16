import styles from "./Button.module.css";

export default function Button({ href, children, variant = "dark" }) {
  return (
    <a className={`${styles.button} ${styles[variant]}`} href={href}>
      {children}
    </a>
  );
}
