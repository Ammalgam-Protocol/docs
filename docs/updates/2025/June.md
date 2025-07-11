---
sidebar_position: 6
---

## tl;dr

- Major development with ecosystem partners
- Finalizing deals with incentives for LP partners at launch
- Starting Cantina Audit on July 10th and ChainSecurity July 7th

## Development

We are finally wrapped up with the requested changes from the first audit. It was a grind to finish,
and I thank everyone for the patience with us. The task of writing flawless code is brutal, but we
are very close, and the last audit with Cantina, as well as the review with our last auditors will
get us to where we need to be.

I am super proud of our team and the work we did. We had some unexpected changes in the engineering
team and the remaining team stepped up in a big way. There was some contract complexity that I
didn’t think could be handled, except by myself and an individual who is no longer with us. But the
team dove in headfirst and took on challenging math, code, and concepts in a really inspiring way.
We are really fortunate to have the team we have, and the talent keeps compounding.

Some of the extra time was due to some rethinking how we limit the risk of cascading liquidations. I
was deeply unsatisfied with multiple aspects of what we did. We had created the general design of how
to do this, but missed some key pieces of how to properly balance the fees within the
mechanism. Additionally, there were some rough approximations when we calculated where a debt would
get liquidated. Since the point where a debt gets liquidated can determine how much can be borrowed,
these approximations resulted in dropping the total amount available to borrow by around ~2/3rds,
which means it also limited the potential revenue from fees by a similar amount. Spending the time
to get this right, rather than approximately right, was something that I felt I had to do.

This piece of work that we spent so much time on is critical in allowing for permissionless lending
without oracles. We were able to minimize configurations and create a system that protects itself
from taking on too much liquidation risk. When the risk reaches the red line on our system, we
figured an appropriate amount to charge to properly incentivize LPs to provide more capital, and
borrowers to repay their debts. If no one asks, or sees these incentives, the system starts to allow
for positions in the saturated area to be restructured to move more debt out and closer to the
current price. This restructuring means will impact large positions most, i.e., Michael from Curve’s
liquidations would have started at a much earlier price and been done in chucks instead of happening
all at once. The system heals the risk even if no one responds to increased incentives or fees.

## Go to Market

- Revamped our ambassador program, optimizing accessibility and user experience.
- Organized a go-karting event at ETHCC, hosted in collaboration with several other companies.
- Worked to launch all new updated docs.
- Continued optimizing paid ad campaigns.
- Prepared for several upcoming co-marketing campaigns.
