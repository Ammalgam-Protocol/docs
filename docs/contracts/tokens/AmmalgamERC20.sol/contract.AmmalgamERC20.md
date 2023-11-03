# AmmalgamERC20
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/04a3f1fa0f3d490fb4de634cc2e3c4a82c163e7a/contracts/tokens/AmmalgamERC20.sol)

**Inherits:**
[AmmalgamERC20Base](/docs/contracts/tokens/AmmalgamERC20Base.sol/abstract.AmmalgamERC20Base.md)


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

