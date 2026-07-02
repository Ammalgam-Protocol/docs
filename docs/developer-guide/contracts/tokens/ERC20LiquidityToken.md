# ERC20LiquidityToken
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/539fb3333b1a5bdb57027ffabb33730a0eae663d/contracts/tokens/ERC20LiquidityToken.sol)

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

*override [ERC20Base-ownerMint](/docs/developer-guide/contracts/tokens/ERC4626DepositToken.md#ownermint).*


```solidity
function ownerMint(address sender, address to, uint256 assets, uint256 shares) public virtual override onlyOwner;
```

### ownerBurn

*override [ERC20Base-ownerBurn](/docs/developer-guide/contracts/tokens/ERC4626DepositToken.md#ownerburn).*


```solidity
function ownerBurn(address sender, address to, uint256 assets, uint256 shares) public virtual override onlyOwner;
```

