import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Depleted Asset Protection',
    Svg: require('@site/static/img/favicon.svg').default,
    description: (
      <>
        A description of how the invariant curve works when assets are depleted due to excess borrowing of available assets.
      </>
    ),
    link: './docs/design/depleted_asset_protection'
  },
];

function Feature({Svg, title, description, link}) {
  return (
    <a href={link}>
      <div className={clsx('col col--4')}>
        <div className="text--center">
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <div className="text--center padding-horiz--md">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </a>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
