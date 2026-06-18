import React from 'react';
import styles from './styles.module.scss';

export default function LogoStrip({ logos = [] }) {
  return (
    <div className={styles.logoStrip}>
      {logos.map((logo, i) => (
        <a
          key={i}
          className={`${styles.logoItem}${logo.src ? ' ' + styles.logoItemImage : ''}`}
          href={logo.href}
          target="_blank"
          rel="noopener noreferrer"
          title={logo.name}
        >
          <img src={logo.src} alt={logo.name} className={styles.logoImg} />
        </a>
      ))}
    </div>
  );
}
