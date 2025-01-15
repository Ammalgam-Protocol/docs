# ITransferValidator
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/a776754587e2530d31f83af30e82bc8095fad927/contracts/interfaces/callbacks/ITransferValidator.sol)

This interface is intended for validating the solvency of an account when transfers occur.


## Functions
### validateSolvency

Validates the solvency of an account for a given token transfer operation.

*Implementation should properly protect against any creation of new debt or transfer
of existing debt or collateral that would leave any individual address with insufficient collateral to cover all debts.*


```solidity
function validateSolvency(
    address toCheck
) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`toCheck`|`address`|The address of the account being checked for solvency.|


