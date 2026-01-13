# ERC20DebtLiquidityToken
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/bab12491a59b8a6007058139c71cddb33c6f5ccb/contracts/tokens/ERC20DebtLiquidityToken.sol)

**Inherits:**
[ERC20DebtBase](/docs/developer-guide/contracts/tokens/ERC20DebtBase.sol/abstract.ERC20DebtBase.md)


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

