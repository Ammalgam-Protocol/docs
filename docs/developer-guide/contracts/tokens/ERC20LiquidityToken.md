# ERC20LiquidityToken
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/1592c5477df75ce2f8b168a6221f7a5e154d286b/contracts/tokens/ERC20LiquidityToken.sol)

**Inherits:**
[ERC20Base](/docs/developer-guide/contracts/tokens/ERC20Base.md)


## Functions
### constructor


```solidity
constructor(
    ERC20BaseConfig memory config
) ERC20Base(config);
```

### ownerMint

*override [ERC20Base-ownerMint](/docs/developer-guide/contracts/tokens/ERC4626DebtToken.md#ownermint).*


```solidity
function ownerMint(address sender, address to, uint256 assets, uint256 shares) public virtual override onlyOwner;
```

### ownerBurn

*override [ERC20Base-ownerBurn](/docs/developer-guide/contracts/tokens/ERC4626DebtToken.md#ownerburn).*


```solidity
function ownerBurn(address sender, address to, uint256 assets, uint256 shares) public virtual override onlyOwner;
```

