# ISwapCallback
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/2eece5abfebce288fb02f1e415a4c82da2c74b65/contracts/interfaces/callbacks/IAmmalgamCallee.sol)

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


