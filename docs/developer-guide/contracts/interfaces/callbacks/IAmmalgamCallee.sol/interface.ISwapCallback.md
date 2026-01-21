# ISwapCallback
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/de13c38088c0b45b6bd39defd3fcb48057983399/contracts/interfaces/callbacks/IAmmalgamCallee.sol)

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


