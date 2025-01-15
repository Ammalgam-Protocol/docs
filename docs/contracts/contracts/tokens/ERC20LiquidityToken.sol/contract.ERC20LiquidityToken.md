# ERC20LiquidityToken
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/a776754587e2530d31f83af30e82bc8095fad927/contracts/tokens/ERC20LiquidityToken.sol)

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

*override [ERC20Base-ownerMint](/contracts/interfaces/tokens/IAmmalgamERC20.sol/interface.IAmmalgamERC20.md#ownermint).*


```solidity
function ownerMint(address sender, address to, uint256, uint256 shares) public virtual override onlyOwner;
```

### ownerBurn

*override [ERC20Base-ownerBurn](/contracts/interfaces/tokens/IAmmalgamERC20.sol/interface.IAmmalgamERC20.md#ownerburn).*


```solidity
function ownerBurn(address sender, address to, uint256, uint256 shares) public virtual override onlyOwner;
```

