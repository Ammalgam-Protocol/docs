---
sidebar_position: 2
---

# February 2024

## tl;dr

- Hired a solidity developer
- Completed an audit of the draft white paper with ChainSecurity
- 2.75m in commitments, aiming to close the round this month

## Development

### New Hire

We hired a new solidity engineer who I am very excited to introduce: Imi was one
of the [finalists at EthGlobal
hackathon](https://www.youtube.com/live/ASnWiZ4moA8?si=3giCUgUHv5ImbF8X&t=45m32s)
for his submission of an
[EIP-7543](https://ethereum-magicians.org/t/decimal-math-on-evm/16194) to
include financial math op codes into the evm. If these op codes were adopted,
the uniswap v3 tick math library could be rewritten with half a dozen lines of
code. He is a seasoned engineer with relevant experience in tradfi. With a
number of developer priorities needing a high level of math competency falling
on me and my time being spread thin while raising seed, Imi will take a huge
load off me and ensure we solve the most technical problems efficiently.

### Contracts

This last month we contracted with ChainSecurity to review a draft of our
Whitepaper. I did this to make sure we were getting an outside technical
feedback on what we were building. I am excited that there were no major gotchas
that came out of the review. We did realize there were some assumptions we made
about block times that do not hold on all L2s that will require a small fix to
some prior work. 

We have made considerable progress on interest rate logic. Once that is wrapped
up, we will commence liquidation logic. Imi and I will work on finishing some of
the more technical problems associated with protecting the protocol while
lending out assets without an oracle. I think we can start Audits in the first
half or Q2 with the additional developer and my focus being redirected to
engineering. 

### Front End

We have revamped our pool page to feel more like Aave and Compound to create a
more seamless experience for retail users, which will be merged this week. We
have also been working on upgrading our wallet connection package with Rainbow
Kit.  This work touched a number of places in our app and has subsequently been
time consuming, but we believe it is an important enhancement. 

Our next priority is to enhance Ammalgam’s swap page. We knew from user feedback
that the leverage loving degenerate audience struggled to understand how to use
the dapp for that purpose. We believe adding the ability to easily long and
short from the swap page will make the functionality more accessible. I think
this enhancement will be a very compelling component of our go to market. Users
will have a simple UI to access almost unbounded leverage (bounded by the
available market maker liquidity in pool) without the risk of liquidation. 

## Go to Market

We put a lot of thought into go to market the last month. We are fortunate to
have a number of resources come into the mix at the perfect time. The work we
have put in is starting to take form: we are developing, exploring, and refining
some very interesting ideas that highlight Ammalgam’s unique value proposition
in the context of meta narratives currently capturing attention and liquidity in
the ecosystem.  We are excited the strategy is coalescing and are excited to
start putting into motion soon. 