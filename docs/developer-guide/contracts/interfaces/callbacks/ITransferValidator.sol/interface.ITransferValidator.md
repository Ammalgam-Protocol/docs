# ITransferValidator
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/308b70cbaad52276d27a3a7c1a1e210d635ddff3/contracts/interfaces/callbacks/ITransferValidator.sol)

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


