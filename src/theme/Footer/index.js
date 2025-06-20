import React from 'react';
import Link from '@docusaurus/Link';
import { useThemeConfig } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';

const socialIcons = {
  discord: {
    src: '/img/discord.svg',
    alt: 'Discord',
  },
  twitter: {
    src: '/img/x.svg',
    alt: 'Twitter',
  },
  mirror: {
    src: '/img/mirror.svg',
    alt: 'Mirror',
  }
}


function Footer() {
  const { footer } = useThemeConfig();
  const { logo, links, copyright } = footer;

  const socialLinks = links.find((l) => l.title === 'Socials')?.items;

  const externalLinks = [
    ...links.filter((l) => l.title !== 'Socials'),
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo-section">
          <div className="footer-logo-items">
            <Link href="/">
              <img src={useBaseUrl(logo.src)} alt={logo.alt} height={32} />
            </Link>
            <div className="footer-social-links">
              {socialLinks.map(({ href, label }) => {
                const icon = socialIcons[label.toLowerCase()];
                return (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    className="footer-social-link"
                    aria-label={icon.alt}
                  >
                    <img
                      src={useBaseUrl(icon.src)}
                      alt={icon.alt}
                      width={20}
                      height={20}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
          <p className="footer-copyright">{copyright}</p>
        </div>
        <div className="footer-links-section">
          {externalLinks.map((linkGroup) => (
            <div key={linkGroup.title} className="footer-link-column">
              <h4 className="footer-link-title">{linkGroup.title}</h4>
              <ul className="footer-link-list">
                {linkGroup.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      target="_blank"
                      className="footer-link-item"
                      rel="noopener noreferrer"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
