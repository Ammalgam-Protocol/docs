# AmmalgamERC20
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/c2398bc2cc7b9fe383b005349741b4aa61a1c292/contracts/tokens/AmmalgamERC20.sol)

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

