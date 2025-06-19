# ERC20LiquidityToken
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/6e61b51e90091137f7e2abb147c11731a6d4681e/contracts/tokens/ERC20LiquidityToken.sol)

**Inherits:**
[ERC20Base](/contracts/tokens/ERC20Base.sol/abstract.ERC20Base.md)


## Functions
### constructor


```solidity
constructor(
    ERC20BaseConfig memory config
) ERC20Base(config);
```

### ownerMint

*override [ERC20Base-ownerMint](/contracts/tokens/ERC4626DepositToken.sol/contract.ERC4626DepositToken.md#ownermint).*


```solidity
function ownerMint(address sender, address to, uint256, uint256 shares) public virtual override onlyOwner;
```

### ownerBurn

*override [ERC20Base-ownerBurn](/contracts/tokens/ERC4626DepositToken.sol/contract.ERC4626DepositToken.md#ownerburn).*


```solidity
function ownerBurn(address sender, address to, uint256, uint256 shares) public virtual override onlyOwner;
```

