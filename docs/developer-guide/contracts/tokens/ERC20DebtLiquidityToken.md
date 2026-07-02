# ERC20DebtLiquidityToken
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/539fb3333b1a5bdb57027ffabb33730a0eae663d/contracts/tokens/ERC20DebtLiquidityToken.sol)

**Inherits:**
[ERC20DebtBase](/docs/developer-guide/contracts/tokens/ERC20DebtBase.md)


## Functions
### constructor


```solidity
constructor(
    ERC20BaseConfig memory config
) ERC20DebtBase(config);
```

### ownerMint


```solidity
function ownerMint(
    address sender,
    address to,
    uint256 assets,
    uint256 shares
) public override(ERC20Base, IAmmalgamERC20) onlyOwner;
```

### ownerBurn


```solidity
function ownerBurn(address sender, address onBehalfOf, uint256 assets, uint256 shares) public override onlyOwner;
```

