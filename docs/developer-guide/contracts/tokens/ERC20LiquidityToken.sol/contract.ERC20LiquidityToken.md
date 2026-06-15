# ERC20LiquidityToken
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/ec51218155bd2f8c1e5dc761ed4728baae81a01b/contracts/tokens/ERC20LiquidityToken.sol)

**Inherits:**
[ERC20Base](/docs/developer-guide/contracts/tokens/ERC20Base.sol/abstract.ERC20Base.md)


## Functions
### constructor


```solidity
constructor(
    ERC20BaseConfig memory config
) ERC20Base(config);
```

### ownerMint

*override [ERC20Base-ownerMint](/docs/developer-guide/contracts/tokens/ERC4626DepositToken.sol/contract.ERC4626DepositToken.md#ownermint).*


```solidity
function ownerMint(address sender, address to, uint256 assets, uint256 shares) public virtual override onlyOwner;
```

### ownerBurn

*override [ERC20Base-ownerBurn](/docs/developer-guide/contracts/tokens/ERC4626DepositToken.sol/contract.ERC4626DepositToken.md#ownerburn).*


```solidity
function ownerBurn(address sender, address to, uint256 assets, uint256 shares) public virtual override onlyOwner;
```

