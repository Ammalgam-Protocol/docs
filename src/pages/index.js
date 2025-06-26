import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';
import styles from './index.module.scss';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title="Docs"
      description="Ammalgam Protocol is a permissionless over-collateralized pairwise lending protocol which combines lending and trading to create capital efficiency and enhanced utility for users">
       <header className={clsx('hero', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">Ammalgam Documentation</h1>
          <p>Ammalgam introduces a new primitive in decentralized finance: the Decentralized Lending Exchange (DLEX). By combining trading and lending into a single protocol, DLEX unlocks a level of capital efficiency that traditional platforms can't match, offering up to a 60% increase in yield for liquidity providers.</p>
        </div>
      </header>
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
