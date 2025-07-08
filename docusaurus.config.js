// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const { themes } = require("prism-react-renderer");
const darkTheme = themes.dracula;

const ammalgamLogo = {
  alt: "Ammalgam Logo",
  src: "img/ammalgam-logo-dark.svg",
  height: 32,
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Ammalgam Protocol",
  tagline: "Decentralized Lending Exchange (DLEX)",
  favicon: "img/favicon.svg",

  // Set the production url of your site here
  url: "https://docs.ammalgam.xyz",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Ammalgam-Protocol", // Usually your GitHub org/user name.
  projectName: "Ammalgam", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/ammalgam-protocol/docs/blob/main/",
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        // leaving for context to add new tabs later
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     // 'https://github.com/ammalgam-protocol/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        theme: {
          customCss: require.resolve("./src/css/custom.scss"),
        },
        gtag: {
          trackingID: "G-2EZK5Z57G9",
          anonymizeIP: true,
        },
      }),
    ],
  ],
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV",
      crossorigin: "anonymous",
    },
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        {name: 'keywords', content: 'ammalgam, protocol, dlex, documentation, docs, dual purpose pools, decentralized lending exchange, developer guide'},
        {name: 'twitter:card', content: 'summary_large_image'},
        {name: 'twitter:image', content: 'img/social_share.jpg'},
        {name: 'twitter:title', content: 'Ammalgam Documentation'},
        {name: 'twitter:description', content: 'Explore our documentation and get started with Ammalgam'},
        {name: 'og:image', content: 'img/social_share.jpg'},
        {name: 'og:title', content: 'Ammalgam Documentation'},
        {name: 'og:description', content: 'Explore our documentation and get started with Ammalgam'},
      ],
      image: "/img/social_share.jpg",
      navbar: {
        logo: ammalgamLogo,
        items: [
          {
            to: "/docs/overview",
            label: "Overview",
            position: "left",
            activeBaseRegex: "/docs/overview",
          },
          {
            to: "/docs/getting-started",
            label: "Getting Started",
            position: "left",
            activeBaseRegex: "/docs/getting-started",
          },
          {
            to: "/docs/category/core-concepts",
            label: "Core Concepts",
            position: "left",
            activeBaseRegex: "/docs/core-concepts|/docs/category/core-concepts",
          },
          {
            href: "https://discord.gg/ammalgam",
            className: "header-discord-link",
            "aria-label": "Ammalgam Discord",
            position: "right",
          },
          {
            href: "https://github.com/ammalgam-protocol",
            className: "header-github-link",
            "aria-label": "Ammalgam GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        links: [
          {
            title: "Socials",
            items: [
              {
                label: "Twitter",
                href: "https://x.com/ammalgam",
                logo: "img/twitter.svg",
              },
              {
                label: "Discord",
                href: "https://discord.gg/ammalgam",
                logo: "img/discord.svg",
              },
              {
                label: "Mirror",
                href: "https://mirror.xyz/0x127d2749824e8a064Fe49246eD8DbD30859d4bCf",
                logo: "img/mirror.svg",
              },
            ],
          },
          {
            title: "Product",
            items: [
              {
                label: "Launch App",
                href: "https://beta.ammalgam.xyz",
              },
              {
                label: "Features",
                href: "https://ammalgam.xyz/#features",
              },
            ],
          },
          {
            title: "Resources",
            items: [
              {
                label: "Brand Kit",
                href: "https://duelinggalois.notion.site/Ammalgam-Brand-Kit-19e3195c2bf580788c37f51bc6f98fa3?pvs=74",
              },
            ],
          },
          {
            title: "Company",
            items: [
              {
                label: "Privacy Policy",
                href: "https://ammalgam.xyz/privacy",
              },
              {
                label: "Terms of Service",
                href: "https://ammalgam.xyz/terms",
              },
            ],
          },
        ],
        logo: ammalgamLogo,
        copyright: `Copyright © ${new Date().getFullYear()} Ammalgam`,
      },
      colorMode: {
        disableSwitch: true,
        defaultMode: 'dark',
      },
      prism: {
        theme: darkTheme,
      },
    }),
  plugins: ["docusaurus-plugin-sass"],
};

module.exports = config;
