// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const { themes } = require('prism-react-renderer');
const lightTheme = themes.github;
const darkTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Ammalgam Documentation',
  tagline: 'Decentralized Lending Exchange (DLEX)',
  favicon: 'img/favicon.svg',

  // Set the production url of your site here
  url: 'https://docs.ammalgam.xyz',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Ammalgam-Protocol', // Usually your GitHub org/user name.
  projectName: 'Ammalgam', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/ammalgam-protocol/docs/blob/main/',
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
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-2EZK5Z57G9',
          anonymizeIP: true,
        },
      }),
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  themeConfig:
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/favicon.svg',
      navbar: {
        title: 'Ammalgam',
        logo: {
          alt: 'Ammalgam Logo',
          src: 'img/favicon.svg',
          width: 32,
          height: 32,
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          // {to: '/blog', label: 'Blog', position: 'left'},
          { to: '/contracts', type: 'docSidebar', sidebarId: 'contractSidebar', label: 'Contracts', position: 'left'},
          {
            href: 'https://github.com/ammalgam-protocol/',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Overview',
                to: '/docs/overview',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/ammalgam',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/QJTyB5PAXw',
              },

            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Mirror',
                to: 'https://mirror.xyz/0x127d2749824e8a064Fe49246eD8DbD30859d4bCf',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/ammalgam-protocol',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Ammalgam DAO Docs Built with Docusaurus.`,
      },
      prism: {
        theme: lightTheme,
        darkTheme,
      },
    }),
};

module.exports = config;
