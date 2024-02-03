---
sidebar_position: 2
---

import { Tweet } from 'react-tweet';

# January 2024

## tl;dr

- Now at 2.1M in commitments for seed round
- Drafted white paper, reviewing with ChainSecurity next week
- Making progress on interest logic, velocity will accelerate once I am able to focus on development again
- Conducting UX interviews with target users
- Networking with protocols that could potentially build vaults with Ammalgam
- [Announced](https://x.com/ammalgam/status/1752080424526860758?s=20) a side event at EthDenver


## Round

Very excited that we have 2.1M in commitments and two larger firms expressing interest in leading. I have asked a number of interested parties for a yes or no by the end of this week as I would like to start finalizing details next week and close. We have created a DevCo in Singapore that will issue the SAFE and Token Warrant, and should have drafts of those agreements to share soon. I will be reaching out soon with additional detail. 

## Development

### Front End

The front end team has been making great progress responding to feedback from the Alpha DApp release. I created a board in Notion to track all of our high level priorities for the front end. 

We continue to do our Sprint reviews publicly in Discord every other week. We
are also tweeting those progress updates on X:

<Tweet id="1745471899956859266" />

I am super proud of how our front end team has taken ownership and is driving continuous progress with very little oversight. 

### Contracts

I considered some design tradeoffs over the last few months considering the
benefits of soft liquidation. I refined the plan down to three options: a
complex one, a simpler one, and the original. I am most excited about the
complex one, but had to face the fact that we need to prioritize getting to
market before we take on any more complexity.

This left the simper version and the original. The main difference is that the simpler version would not need soft liquidations or price dependent liquidations. As I went through all the second order consequence of this design, I realized a few draw backs. I will drop a chart below of all the trade offs I saw with the three design options. 

#### Tradeoffs

| Version | Price Dependent Liquidations | Market Making and swaps | Short/long anything | Leveraged Market Making | Concentrated Liquidity | Borrow X and Y individually and earn interest on distinct deposits of x and y | Buy Calls and Puts |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Original  | Yes | Yes | Yes | Yes | No | Yes | No |
| Simple | No | Yes | Yes | No | No | No | No |
| Complex | No | Yes | Yes | Yes | Yes | Yes | Yes |

After thinking through the simple design, I was concerned about a few things. The simpler design loses a lot if you can not borrow X and Y individually. We would lose leveraged market making, delta neutral market making, and short/long market making.  At the end, I felt like I lost my vision trying to chase something shiny just off our path. Another risk that we end up with a product that feels like a replica of what I understand Frax is building with BAMM.

In the middle of this thought experiment, I decided I needed to get some feedback. I reached out to ChainSecurity and asked to work with them for a design audit to get some feedback. By the time we were approaching that window, I had started leaning back toward the original plan for version 1 and the complex plan for version 2. With this in mind, I wrote a draft of the white paper of the protocol. I will be working with ChainSecurity on this review next week. 

On the actual development, we are working through building in the interest rate models. After interest is done, we will need to build liquidations and wrap up some of the more complex work with our price observation design. The price observation has been the toughest work we have faced and has dragged on longer than I would have liked. This spec review with ChainSecurity will be super helpful to ensure we have everything we need here.

I am very excited about the coming months as I can refocus on building and get this beauty out the door!

## Business Development

We have done very well with raising funds and hitting our goals, but knew we needed to double efforts on go-to-market strategy. We are fleshing out the team and have several efforts in flight, including GTM design & execution, UX interviews and potential partnership / ecosystem networking, grant applications, IRL event planning, etc.

**GTM Strategy & Execution**: 

We are actively working to develop a fire meta narrative and content strategy to gain social media traction while simultaneously laying the groundwork for a big push on community building, beta release / incentive design, collab mgmt & partnerships. 

**UX Interviews**:

This month we conducted a UX interview with the Two Prime team which has 300M AUM and deploy a number of sophisticated strategies using both spot and options. We received very powerful feedback from that interview. Some things we learned confirmed what we already knew, and other bits helped us to better understand what we were missing.

I also was able to backchannel to the Yearn team to learn what their requirements are to build on other protocols. The answer was helpful, but not immediately. The first thing they asked for was to be able to look at our completed code. I also got connected with someone at Maple Finance, their product is designed to interface with institutional users. Some of their requirements related to that made it difficult to see any path to integration, but also made me realize that it may be useful to think about protocols wanting to user our product as much as build on top of it.

**Grants**:

We also worked on an OP grant right now that will be submitted this week. We also spoke with the Arbitrum team about potential help they could provide. 

**Events**:

Last, we planned a side event at EthDenver. I love racing, so we planned a Go-Kart tournament. The cost for this was about a third of hosting a booth and we think it has potential to have larger impact on product awareness.