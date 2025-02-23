# ICallback
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/6e61b51e90091137f7e2abb147c11731a6d4681e/contracts/interfaces/callbacks/IAmmalgamCallee.sol)

*This interface should be implemented by anyone wishing to use callbacks in the
`swap`, `borrow`, and `borrowLiquidity` functions in the  IAmmalgamPair interface.*


## Functions
### swapCall

Handles a swap call in the Ammalgam protocol.

*Callback passed as calldata to `swap` functions in `IAmmalgamPair`.*


```solidity
function swapCall(address sender, uint256 amountXAssets, uint256 amountYAssets, bytes calldata data) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The address of the sender initiating the swap call.|
|`amountXAssets`|`uint256`|The amount of token X involved in the swap.|
|`amountYAssets`|`uint256`|The amount of token Y involved in the swap.|
|`data`|`bytes`|The calldata provided to the swap function.|


### borrowCall

Handles a borrow call in the Ammalgam protocol.

*Callback passed as calldata to `borrow` and `borrowLiquidity` functions in `IAmmalgamPair`.*


```solidity
function borrowCall(
    address sender,
    uint256 amountXAssets,
    uint256 amountYAssets,
    uint256 amountLAssets,
    bytes calldata data
) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The address of the sender initiating the borrow call.|
|`amountXAssets`|`uint256`|The amount of token X involved in the borrow.|
|`amountYAssets`|`uint256`|The amount of token Y involved in the borrow.|
|`amountLAssets`|`uint256`|The amount of liquidity involved in the borrow.|
|`data`|`bytes`|The calldata provided to the borrow function.|


