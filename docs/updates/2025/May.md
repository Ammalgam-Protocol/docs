---
sidebar_position: 5
---

## tl;dr

- The team has been grinding to wrap up code changes before we start the Cantina Audit
- We are hosting an event at EthCC
- Due to changes in the team we are short on engineering resources

## Development

We were about finished last month with feedback from auditors. But, as we were wrapping things up,
there were some aspects of the math in our library that limits the risk of cascading liquidations
that was not sitting right with me. I decided to make some fixes that delayed our anticipated code
completion for our next audit with Cantina.

The library is responsible for measuring the price at which a new debt would get liquidated and
limiting the size of these debts based on the available market making reserves that could be the
only liquidity available to facilitate the swap that would happen during liquidations. I was not
happy with the penalty that was added when a given price range accumulated too many potential
liquidations relative to the market making reserves. It seemed insufficient to effect change or
compensate LPs if they couldn’t withdraw do to the risk getting maxed out. The more I looked, the
more unsatisfied I was. I also noticed that we were over estimating the risk of a position by a
factor close to 2. This would make it harder for us to facilitate lending out assets, because we
would prematurely hit the max the way we were measuring things. It just wasn’t right and the
potential impact seemed to large to ignore.

I am probably guilty of being a perfectionist, and at several points I asked myself if there was
sufficient concern to delay this last audit to make these fixes. I concluded it was worth it,
this had to be right, it is a critical piece of functionality to support permissionless lending.

## Go to Market

- Hosted several community events and AMAs with good attendance
- Launched our first Galxe campaign
- Worked on organizing our attendance and side event hosting at ETHCC for the end of June.
- Grew our newsletter mailing list to 50,000+
- Finalized paid ad campaign messaging and creatives in preparation for mainnet
- Hired new moderating talent for community engagement
