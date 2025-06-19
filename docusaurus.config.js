// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const { themes } = require("prism-react-renderer");
const lightTheme = themes.github;
const darkTheme = themes.dracula;

const ammalgamLogo = {
  alt: "Ammalgam Logo",
  src: "img/ammalgam-logo-light.svg",
  srcDark: "img/ammalgam-logo-dark.svg",
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
      image: "img/favicon.svg",
      navbar: {
        logo: ammalgamLogo,
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Documentation",
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
            title: "Docs",
            items: [
              {
                label: "Overview",
                to: "/docs/overview",
              },
              {
                label: "Litepaper",
                to: "/docs/litepaper",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Twitter",
                href: "https://twitter.com/ammalgam",
              },
              {
                label: "Discord",
                href: "https://discord.gg/ammalgam",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Mirror",
                href: "https://mirror.xyz/0x127d2749824e8a064Fe49246eD8DbD30859d4bCf",
              },
              {
                label: "GitHub",
                href: "https://github.com/ammalgam-protocol",
              },
            ],
          },
        ],
        logo: ammalgamLogo,
        copyright: `Copyright © ${new Date().getFullYear()} Ammalgam DAO. Built with Docusaurus.`,
      },
      prism: {
        theme: darkTheme,
      },
    }),
  plugins: ["docusaurus-plugin-sass"],
};

module.exports = config;
