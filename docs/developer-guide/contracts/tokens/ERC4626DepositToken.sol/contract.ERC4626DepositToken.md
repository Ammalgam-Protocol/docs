# ERC4626DepositToken
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/0225322e5b1d4d1ce3ec3ffc220dfd4d8afaf521/contracts/tokens/ERC4626DepositToken.sol)

**Inherits:**
ERC4626, [ERC20Base](/docs/developer-guide/contracts/tokens/ERC20Base.sol/abstract.ERC20Base.md)


## Functions
### constructor


```solidity
constructor(ERC20BaseConfig memory config, address _asset) ERC4626(IERC20(_asset)) ERC20Base(config);
```

### ownerMint

*override {AmmalgamERC20Base-ownerMint}.*


```solidity
function ownerMint(address sender, address to, uint256 assets, uint256 shares) public virtual override onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The address that sent the underlying assets to the pair contract.|
|`to`|`address`|The address that will receive the minted shares.|
|`assets`|`uint256`|The amount of underlying assets that were sent to the pair contract.|
|`shares`|`uint256`|The amount of shares that will be minted.|


### ownerBurn

*override {AmmalgamERC20Base-ownerBurn}.*


```solidity
function ownerBurn(address sender, address to, uint256 assets, uint256 shares) public virtual override onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The owner of the Ammalgam Deposit token.|
|`to`|`address`|The address that will receive the underlying assets.|
|`assets`|`uint256`|The amount of underlying assets that will be received.|
|`shares`|`uint256`|The amount of shares that will be burned.|


### ownerTransfer

Transfers `amount` tokens from the `from` address to the `to` address.


```solidity
function ownerTransfer(address from, address to, uint256 amount) public virtual override onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`from`|`address`|The account to deduct the tokens from.|
|`to`|`address`|The account to deliver the tokens to.|
|`amount`|`uint256`|The amount of tokens to be transferred.|


### _deposit

*ERC4626 facade for [IAmmalgamPair-deposit](/lib/openzeppelin-contracts/lib/erc4626-tests/ERC4626.prop.sol/interface.IERC4626.md#deposit).
both deposit and mint calls _deposit*


```solidity
function _deposit(address caller, address receiver, uint256 assets, uint256) internal virtual override;
```

### _withdraw

*ERC4626 facade for [IAmmalgamPair-withdraw](/lib/openzeppelin-contracts/lib/erc4626-tests/ERC4626.prop.sol/interface.IERC4626.md#withdraw).
both withdraw and redeem calls _withdraw*


```solidity
function _withdraw(address caller, address receiver, address, uint256, uint256 shares) internal virtual override;
```

### _update


```solidity
function _update(address from, address to, uint256 amount) internal virtual override(ERC20Base, ERC20);
```

### balanceOf


```solidity
function balanceOf(
    address account
) public view override(ERC20Base, ERC20, IERC20) returns (uint256);
```

### decimals


```solidity
function decimals() public view override(ERC20Base, ERC4626) returns (uint8);
```

### totalAssets


```solidity
function totalAssets() public view override returns (uint256);
```

### _convertToShares


```solidity
function _convertToShares(uint256 assets, Math.Rounding rounding) internal view override returns (uint256);
```

### _convertToAssets


```solidity
function _convertToAssets(uint256 shares, Math.Rounding rounding) internal view override returns (uint256);
```

