# ERC4626Deposit
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/922bb12a291a5f6729dd85abc24fc6fec504a108/contracts/tokens/ERC4626Deposit.sol)

**Inherits:**
[ERC4626DepositBase](/contracts/tokens/ERC4626DepositBase.sol/abstract.ERC4626DepositBase.md)


## Functions
### constructor


```solidity
constructor(ERC20BaseConfig memory config, address _asset) ERC4626DepositBase(config, _asset);
```

### ownerMint

*override [AmmalgamERC20Base-ownerMint](/contracts/tokens/ERC4626DebtToken.sol/contract.ERC4626DebtToken.md#ownermint).*


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

*override [AmmalgamERC20Base-ownerBurn](/contracts/tokens/ERC4626DebtToken.sol/contract.ERC4626DebtToken.md#ownerburn).*


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


### _deposit

*ERC4626 facade for [IAmmalgamPair-deposit](/contracts/interfaces/IAmmalgamPair.sol/interface.IAmmalgamPair.md#deposit).
both deposit and mint calls _deposit*


```solidity
function _deposit(address caller, address receiver, uint256 assets, uint256) internal virtual override;
```

### _withdraw

*ERC4626 facade for [IAmmalgamPair-withdraw](/contracts/interfaces/IAmmalgamPair.sol/interface.IAmmalgamPair.md#withdraw).
both withdraw and redeem calls _withdraw*


```solidity
function _withdraw(address caller, address receiver, address, uint256, uint256 shares) internal virtual override;
```

