# ITransferValidator
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/972003d4054ccdb776f8aa37f6437b1f0f1c34aa/contracts/interfaces/callbacks/ITransferValidator.sol)

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


