# IAmmalgamCallee
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/8a7f458eaa44bd6bb81314db98899ee7d35f8c57/contracts/interfaces/callbacks/IAmmalgamCallee.sol)

*This interface should be implemented by anyone wishing to use callbacks in the
`swap`, `borrow`, and `borrowLiquidity` functions in the  IAmmalgamPair interface.*


## Functions
### swapCall

Handles a swap call in the Ammalgam protocol.

*Callback passed as calldata to `swap` functions in `IAmmalgamPair`.*


```solidity
function swapCall(address sender, uint256 amountX, uint256 amountY, bytes calldata data) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The address of the sender initiating the swap call.|
|`amountX`|`uint256`|The amount of token X involved in the swap.|
|`amountY`|`uint256`|The amount of token Y involved in the swap.|
|`data`|`bytes`|The calldata provided to the swap function.|


### borrowCall

Handles a borrow call in the Ammalgam protocol.

*Callback passed as calldata to `borrow` and `borrowLiquidity` functions in `IAmmalgamPair`.*


```solidity
function borrowCall(address sender, uint256 amountX, uint256 amountY, uint256 amountL, bytes calldata data) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The address of the sender initiating the borrow call.|
|`amountX`|`uint256`|The amount of token X involved in the borrow.|
|`amountY`|`uint256`|The amount of token Y involved in the borrow.|
|`amountL`|`uint256`|The amount of liquidity involved in the borrow.|
|`data`|`bytes`|The calldata provided to the borrow function.|


