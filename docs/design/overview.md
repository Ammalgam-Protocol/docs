---
sidebar_position: 1
---

# Architecture Overview

## Forking Uniswap v2

​To build a lending protocol into the Uniswap v2 pair contract, Ammalgam began
as a fork of the Uniswap v2 contracts. However, the DLEX design requires various
deposit borrow tokens and, as such, multiple ERC-20s. Thus, the single contract
of the Uniswap v2 Pair was significantly modified.

## Pair contracts

The Uniswap v2 pair contract is an ERC-20 token that amongst other information
represents the share of swap liquidity a user deposited into the pair. To
accommodate the DLEX structure and to avoid code space constraints, Ammalgam’s
architecture removes the ERC-20 representing swap liquidity of the logic out of
the original V2 Pair contract and splits the pair contract into seven, separate
contracts.

The exterior contracts create six tokens representing the six functions of
Ammalgam.


![pair contracts](./assets/PairContracts.svg)

The interior contract, labeled in the  diagram Uniswap v2 Lending Pool, contains
most of remaining UniswapV2 interface as well as the addition of lending
functions and libraries.


The interior contract, labeled in our diagram Uniswap v2 Lending Pool, contains
most of the initial
[IUniswapV2](https://github.com/Uniswap/v2-core/blob/master/contracts/interfaces/IUniswapV2Pair.sol)
interface except for those functions associated with the IERC20 that were moved.
Additionally lending functions and libraries have been added to the pair
contract.

Users can also deposit asset X or Y individually to be used as collateral and to
be lent out to earn yield, but not to be used to fill swaps or earn swap fees.

### ERC-4626 Vault Standard

When borrowing X, Y, or L a transferable debt token is issued to borrowers. We
use the ERC-4626 vault standard to represent deposits, but only use the ERC-20
for swap liquidity due to the fact that there are two underlying assets with a
variable share to asset rate depending on price.

