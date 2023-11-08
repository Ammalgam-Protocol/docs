import clsx from 'clsx';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';

const FeatureList = [
  {
    title: "DLEX",
    Svg: require('@site/static/icons/open_with.svg').default,
    description: (
      <>
        Combining lending and trading functions into one contract 
        creating capital efficiency and enhanced utility for users
      </>
    ),
    link: './docs/primary/overview#dlex'
  },
  {
    title: 'Trading',
    Svg: require('@site/static/icons/swap_horizontal.svg').default,
    description: (
      <>
        A Decentralized Exchange (DEX) that allows for the trading 
        of tokens and Automated Market Making for liquidity providers
      </>
    ),
    link: './docs/primary/overview#trading'
  },
  {
    title: 'Lending',
    Svg: require('@site/static/icons/swap_vertical.svg').default,
    description: (
      <>
        A permissionless overcollateralized pairwise lending protocol
      </>
    ),
    link: './docs/primary/overview#lending'
  },
  {
    title: 'Capital Efficiency',
    Svg: require('@site/static/icons/money.svg').default,
    description: (
      <>
        Giving market makers better returns by lending out unused
        assets that occur in automated market making using the X * Y = K 
        invariant
      </>
    ),
    link: './docs/primary/overview#capital-efficiency'
  },
  {
    title: 'Utility',
    Svg: require('@site/static/icons/delta_gamma.svg').default,
    description: (
      <>
        Offering lending and trading functions in one contract gives gives 
      </>
    ),
    link: './docs/primary/overview#utility-δ-γ'
  },
  {
    title: 'Autonomy',
    Svg: require('@site/static/icons/permissionless.svg').default,
    description: (
      <>
        Built without any external dependencies on oracles or other protocols
        allowing for permissionless lending allowing for a first
        to market lending and trading venue for the next big airdrop
      </>
    ),
    link: './docs/primary/overview#autonomy'
  },
];

function Feature({Svg, title, description, link}) {
  return (
      <div className={clsx('col col--4')}>
        <div className="text--center">
          <Svg className={styles.featureSvg} role="img" fill='var(--ifm-font-color-base)' />
        </div>
        <div className="text--center padding-horiz--md">
          <Link to={link}>
            <h3>{title}</h3>
          </Link>
          <p>{description}</p>
        </div>
      </div>
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
