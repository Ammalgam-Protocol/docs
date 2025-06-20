---
sidebar_position: 3
title: "AMMs"
---

# AMMs, Orderbooks & Off-Chain Matching

Ammalgam was forked from Uniswap V2 and has maintained the interface and utility of the Uniswap V2 Factory and Pair contract. The factory allows any two ERC-20 tokens to be grouped together to create a new Pair contract. The Pair allows for users to provide both assets in equal value to allow for traders to swap between the two assets in return for a small fee associated with each swap. Swaps are priced based on the invariant curve $X \cdot Y = K$ where the quantities of the two ERC-20 tokens in the pair are $X$ and $Y$ and $K$, sometimes known as the invariant, must have a starting value before the swap that is less than or equal to the value after the swap.

Our protocol into the Pair contract by adding methods to allow for depositing and borrowing of the two tokens $X$ and $Y$ as well as the ability to borrow market-making shares. The units of market making shares are tracked in units of $L$ which is equal to $\sqrt{K} = L$ for the value of $K$ associated with the individual deposit of $X$ and $Y$ rather than the values of the entire pool. Borrowed market maker liquidity is also tracked in units of $L$ but the underlying $X$ and $Y$ associated with the borrowed $L$ is what is transferred back to the users. Market making gives a portfolio payout with negative gamma often referred to as Impermanent Loss (IL). Borrowing market making liquidity gives users access to impairment gain.