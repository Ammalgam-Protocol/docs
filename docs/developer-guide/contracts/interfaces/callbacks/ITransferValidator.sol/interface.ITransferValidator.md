# ITransferValidator
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/a28e502b1e8800dac8120731b7ed6f1fd472b8a7/contracts/interfaces/callbacks/ITransferValidator.sol)

This interface is intended for validating the solvency of an account when transfers occur.


## Functions
### validateOnUpdate

Validates the solvency of an account for a given token transfer operation.

*Implementation should properly protect against any creation of new debt or transfer
of existing debt or collateral that would leave any individual address with insufficient collateral to cover all debts.*


```solidity
function validateOnUpdate(address validate, address update, bool isBorrow) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`validate`|`address`|The address of the account being checked for solvency and having its saturation updated|
|`update`|`address`|The address of the account having its saturation updated|
|`isBorrow`|`bool`||


