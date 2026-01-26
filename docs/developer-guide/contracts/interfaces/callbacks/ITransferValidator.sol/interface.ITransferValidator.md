# ITransferValidator
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/7bd94fcabcb7d53f97e30a15843e54bc4e10b2d4/contracts/interfaces/callbacks/ITransferValidator.sol)

This interface is intended for validating the solvency of an account when transfers occur.


## Functions
### validateOnUpdate

Validates the solvency of an account for a given token transfer operation.

*Implementation should properly protect against any creation of new debt or transfer
of existing debt or collateral that would leave any individual address with insufficient collateral to cover all debts.*


```solidity
function validateOnUpdate(address validate, address update, bool alwaysUpdate) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`validate`|`address`|The address of the account being checked for solvency and having its saturation updated|
|`update`|`address`|The address of the account having its saturation updated|
|`alwaysUpdate`|`bool`|Whether to always update the saturation, even if the account is not borrowing|


