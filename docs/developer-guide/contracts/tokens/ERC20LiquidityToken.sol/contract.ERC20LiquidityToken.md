# ERC20LiquidityToken
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/0225322e5b1d4d1ce3ec3ffc220dfd4d8afaf521/contracts/tokens/ERC20LiquidityToken.sol)

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

*override [ERC20Base-ownerMint](/docs/developer-guide/contracts/tokens/ERC20Base.sol/abstract.ERC20Base.md#ownermint).*


```solidity
function ownerMint(address sender, address to, uint256 assets, uint256 shares) public virtual override onlyOwner;
```

### ownerBurn

*override [ERC20Base-ownerBurn](/docs/developer-guide/contracts/tokens/ERC4626DebtToken.sol/contract.ERC4626DebtToken.md#ownerburn).*


```solidity
function ownerBurn(address sender, address to, uint256 assets, uint256 shares) public virtual override onlyOwner;
```

### ownerTransfer

Transfers `amount` tokens from the `from` address to the `to` address.

*override [ERC20Base-ownerTransfer](/docs/developer-guide/contracts/tokens/ERC20Base.sol/abstract.ERC20Base.md#ownertransfer).*


```solidity
function ownerTransfer(address from, address to, uint256 amount) public virtual override onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`from`|`address`|The account to deduct the tokens from.|
|`to`|`address`|The account to deliver the tokens to.|
|`amount`|`uint256`|The amount of tokens to be transferred.|


