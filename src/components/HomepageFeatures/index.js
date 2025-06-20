import clsx from 'clsx';
import Link from '@docusaurus/Link';

import styles from './styles.module.scss';

const FeatureList = [
  {
    title: "Overview",
    icon: require('@site/static/icons/overview.png').default,
    description: (
      <>
        Birds eye view about Ammalgam
      </>
    ),
    link: './docs/overview'
  },
  {
    title: 'Core Concepts',
    icon: require('@site/static/icons/core_concepts.png').default,
    description: (
      <>
        Understand the basics of Ammalgam
      </>
    ),
    link: './docs/category/core-concepts'
  },
  {
    title: 'Capital Efficiency',
    icon: require('@site/static/icons/capital_efficiency.png').default,
    description: (
      <>
        Know more about increased gains
      </>
    ),
    link: './docs/core-concepts/capital-efficiency'
  },
  {
    title: 'Getting Started',
    icon: require('@site/static/icons/getting_started.png').default,
    description: (
      <>
        Learn how to use DLEX
      </>
    ),
    link: './docs/getting-started'
  },
  {
    title: 'Developer Guide',
    icon: require('@site/static/icons/developer_guide.png').default,
    description: (
      <>
        Protocol smart contracts
      </>
    ),
    link: './docs/category/developer-guide'
  },
  {
    title: 'Updates',
    icon: require('@site/static/icons/updates.png').default,
    description: (
      <>
        Monthly progress updates
      </>
    ),
    link: './docs/category/updates'
  },
];

function Feature({icon, title, description, link}) {
  return (
    <div className={clsx('col col--6 md:col--4')}>
      <Link className={styles.link} to={link}>
        <div className={clsx('card', styles.homepageCard)}>
          <div className="card__image">
            <img src={icon} alt={title} width={100} height={100} />
          </div>
          <div className="card__body">
            <div className={styles.title}>{title}</div>
            <p className={styles.description}>
              {description}
            </p>
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
