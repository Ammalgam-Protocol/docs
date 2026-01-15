# IBorrowCallback
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/cef53501625920a7a613159ed164f5d718c999a3/contracts/interfaces/callbacks/IAmmalgamCallee.sol)


## Functions
### ammalgamBorrowCallV1

The callback in the `AmmalgamPair.borrow()` function transfers borrowed `amountXAssets` and `amountYAssets`
to the borrower which doesn't include the initial lending fee. The `amountXShares` and `amountYShares`
minted debt shares for the `borrower` include the initial lending fee.


```solidity
function ammalgamBorrowCallV1(
    address sender,
    uint256 amountXAssets,
    uint256 amountYAssets,
    uint256 amountXShares,
    uint256 amountYShares,
    bytes calldata data
) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`||
|`amountXAssets`|`uint256`|The amount of token X involved in the borrow.|
|`amountYAssets`|`uint256`|The amount of token Y involved in the borrow.|
|`amountXShares`|`uint256`|The shares of token X involved in the borrow including the initial lending fee.|
|`amountYShares`|`uint256`|The shares of token Y involved in the borrow including the initial lending fee.|
|`data`|`bytes`|The calldata provided to the borrow function.|


### ammalgamBorrowLiquidityCallV1

The callback in the `AmmalgamPair.borrowLiquidity()` function transfers borrowed
`amountXAssets` and `amountYAssets` to the borrower which doesn't include the initial lending fee.
The `amountLShares` minted debt shares for the `borrower` include the initial lending fee.


```solidity
function ammalgamBorrowLiquidityCallV1(
    address sender,
    uint256 amountXAssets,
    uint256 amountYAssets,
    uint256 amountLShares,
    bytes calldata data
) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`||
|`amountXAssets`|`uint256`|The amount of token X involved in the borrow liquidity.|
|`amountYAssets`|`uint256`|The amount of token Y involved in the borrow liquidity.|
|`amountLShares`|`uint256`|The shares of liquidity involved in the borrow liquidity including the initial lending fee.|
|`data`|`bytes`|The calldata provided to the borrow liquidity function.|


