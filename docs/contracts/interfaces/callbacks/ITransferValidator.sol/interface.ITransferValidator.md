# ITransferValidator
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/922bb12a291a5f6729dd85abc24fc6fec504a108/contracts/interfaces/callbacks/ITransferValidator.sol)

This interface is intended for validating the solvency of an account when transfers occur.


## Functions
### validateSolvency

Validates the solvency of an account for a given token transfer operation.

*Implementation should properly protect against any creation of new debt or transfer
of existing debt or collateral that would leave any individual address with insufficient collateral to cover all debts.*


```solidity
function validateSolvency(uint8 tokenType, address toCheck, uint256 amount, uint256 balanceFrom) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenType`|`uint8`|The type of the token being checked for solvency.|
|`toCheck`|`address`|The address of the account being checked for solvency.|
|`amount`|`uint256`|The amount of the tokens of the specified type.|
|`balanceFrom`|`uint256`|The balance of the account for the specified token type.|


