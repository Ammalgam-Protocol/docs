# AmmalgamERC20
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/6642ecf302d69320796403bcb5da0c96165f00bd/contracts/tokens/AmmalgamERC20.sol)

**Inherits:**
[AmmalgamERC20Base](/contracts/tokens/AmmalgamERC20Base.sol/abstract.AmmalgamERC20Base.md)


## Functions
### constructor


```solidity
constructor(
    string memory name,
    string memory symbol,
    TokenType _tokenType
) AmmalgamERC20Base(name, symbol, _tokenType);
```

### _beforeTokenTransfer


```solidity
function _beforeTokenTransfer(address from, address to, uint256 amount) internal override;
```

