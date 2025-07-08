# ICallback
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/d1df5df9e4b968d0d06a1d2d00a0120c1be82e15/contracts/interfaces/callbacks/IAmmalgamCallee.sol)

*This interface should be implemented by anyone wishing to use callbacks in the
`swap`, `borrow`, and `borrowLiquidity` functions in the  IAmmalgamPair interface.*


## Functions
### ammalgamSwapCallV1

Handles a swap call in the Ammalgam protocol.

*Callback passed as calldata to `swap` functions in `IAmmalgamPair`.*


```solidity
function ammalgamSwapCallV1(
    address sender,
    uint256 amountXAssets,
    uint256 amountYAssets,
    bytes calldata data
) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The address of the sender initiating the swap call.|
|`amountXAssets`|`uint256`|The amount of token X involved in the swap.|
|`amountYAssets`|`uint256`|The amount of token Y involved in the swap.|
|`data`|`bytes`|The calldata provided to the swap function.|


### ammalgamBorrowCallV1


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
|`amountXShares`|`uint256`|The shares of token X involved in the borrow.|
|`amountYShares`|`uint256`|The shares of token Y involved in the borrow.|
|`data`|`bytes`|The calldata provided to the borrow function.|


### ammalgamBorrowLiquidityCallV1


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
|`amountXAssets`|`uint256`|The amount of token X involved in the borrow.|
|`amountYAssets`|`uint256`|The amount of token Y involved in the borrow.|
|`amountLShares`|`uint256`|The shares of liquidity involved in the borrow.|
|`data`|`bytes`|The calldata provided to the borrow function.|


### ammalgamLiquidateCallV1

Handles a liquidate call in the Ammalgam protocol. The callback is expected to transfer repayXInXAssets and repayYInYAssets from the liquidator to the pair.


```solidity
function ammalgamLiquidateCallV1(uint256 repayXInXAssets, uint256 repayYInYAssets) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`repayXInXAssets`|`uint256`|The amount of token X the liquidator should transfer to the pair.|
|`repayYInYAssets`|`uint256`|The amount of token Y the liquidator should transfer to the pair.|


