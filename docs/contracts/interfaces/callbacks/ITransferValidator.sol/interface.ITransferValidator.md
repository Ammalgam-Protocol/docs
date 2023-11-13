# ITransferValidator
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/6642ecf302d69320796403bcb5da0c96165f00bd/contracts/interfaces/callbacks/ITransferValidator.sol)

This interface is intended for validating the solvency of an account when transfers occur.


## Functions
### validateSolvency

Validates the solvency of an account for a given token transfer operation.

*Implementation should properly protect against any creation of new debt or transfer
of existing debt or collateral that would leave any individual address with insufficient collateral to cover all debts.*


```solidity
function validateSolvency(TokenType tokenType, address toCheck, uint256 amount, uint256 balanceFrom) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenType`|`TokenType`|The type of the token being checked for solvency.|
|`toCheck`|`address`|The address of the account being checked for solvency.|
|`amount`|`uint256`|The amount of the tokens of the specified type.|
|`balanceFrom`|`uint256`|The balance of the account for the specified token type.|


