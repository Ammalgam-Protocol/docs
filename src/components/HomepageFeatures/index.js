import clsx from 'clsx';
import Link from '@docusaurus/Link';

import styles from './styles.module.scss';

const FeatureList = [
  {
    title: "Overview",
    Svg: require('@site/static/icons/dlex.svg').default,
    description: (
      <>
        Combining lending and trading functions into one contract 
        creating capital efficiency and enhanced utility for users
      </>
    ),
    link: './docs/overview'
  },
  {
    title: 'Core Concepts',
    Svg: require('@site/static/icons/trading.svg').default,
    description: (
      <>
        A Decentralized Exchange (DEX) that allows for the trading 
        of tokens and Automated Market Making for liquidity providers
      </>
    ),
    link: './docs/category/core-concepts'
  },
  {
    title: 'Capital Efficiency',
    Svg: require('@site/static/icons/capital.svg').default,
    description: (
      <>
        Giving market makers better returns by lending out unused
        assets that occur in automated market making using the X * Y = K 
        invariant
      </>
    ),
    link: './docs/core-concepts/capital-efficiency'
  },
  {
    title: 'Getting Started',
    Svg: require('@site/static/icons/lending.svg').default,
    description: (
      <>
        A permissionless over-collateralized pairwise lending protocol
      </>
    ),
    link: './docs/getting-started'
  },
  {
    title: 'Developer Guide',
    Svg: require('@site/static/icons/utility.svg').default,
    description: (
      <>
        Offering lending and trading functions in one contract gives 
      </>
    ),
    link: './docs/category/developer-guide'
  },
  {
    title: 'Updates',
    Svg: require('@site/static/icons/autonomy.svg').default,
    description: (
      <>
        Built without any external dependencies on oracles or other protocols
        allowing for permissionless lending allowing for a first
        to market lending and trading venue for the next big airdrop
      </>
    ),
    link: './docs/category/updates'
  },
];

function Feature({Svg, title, description, link}) {
  return (
    <div className={clsx('col col--4')}>
      <Link className={styles.link} to={link}>
        <div className="card padding--lg h-100">
          <div className="card__header">
            <div className={styles.featureIconContainer}>
              <Svg role="img" fill='var(--ifm-color-primary)' />
            </div>
            <h3>{title}</h3>
          </div>
          <div className={clsx(`card__body ${styles.description}`)}>
            {description}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={clsx(`row ${styles.rowGap}`)}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
