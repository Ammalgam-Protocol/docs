import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.scss';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title="Docs"
      description="Ammalgam Protocol is a permissionless over-collateralized pairwise lending protocol which combines lending and trading to create capital efficiency and enhanced utility for users">
       <header className={clsx('hero', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">Ammalgam Documentation</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
        </div>
      </header>
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
