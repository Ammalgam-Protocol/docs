# IAmmalgamERC20
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/922bb12a291a5f6729dd85abc24fc6fec504a108/contracts/interfaces/tokens/IAmmalgamERC20.sol)

**Inherits:**
IERC20, IERC20Metadata, IERC20Permit

*This interface extends IERC20, IERC20Metadata, and IERC20Permit, and defines mint and burn functions.*


## Functions
### ownerMint

Creates `amount` tokens and assigns them to `to` address, increasing the total supply.

*Emits a IERC20.Transfer event with `from` set to the zero address.*


```solidity
function ownerMint(address sender, address to, uint256 assets, uint256 shares) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`||
|`to`|`address`|The account to deliver the tokens to.|
|`assets`|`uint256`|The quantity of assets represented by the shares.|
|`shares`|`uint256`|The amount of shares to mint.|


### ownerBurn

Destroys `amount` tokens from `from` address, reducing the total supply.

*Emits a IERC20.Transfer event with `to` set to the zero address.*


```solidity
function ownerBurn(address sender, address from, uint256 assets, uint256 shares) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`||
|`from`|`address`|The account to deduct the tokens from.|
|`assets`|`uint256`|The quantity of assets represented by the shares.|
|`shares`|`uint256`|The amount of shares to be burned.|


## Events
### Mint
*Emitted when tokens are minted*


```solidity
event Mint(address indexed sender, address indexed to, uint256 shares);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`||
|`to`|`address`|Address where minted tokens are sent|
|`shares`|`uint256`|The amount of tokens being minted|

### Burn
*Emitted when tokens are burned*


```solidity
event Burn(address indexed sender, address indexed to, uint256 shares);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|Supplies Ammalgam Liquidity token into the pair contract and receives the minted assets in exchange|
|`to`|`address`|Address where burned tokens are sent|
|`shares`|`uint256`|The amount of tokens being burned|

### Borrow
*Emitted on a borrow of tokens*


```solidity
event Borrow(address indexed sender, address indexed to, uint256 assets, uint256 shares);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The address initiating the borrowing action|
|`to`|`address`|The address receiving the borrowed tokens|
|`assets`|`uint256`|The address of the borrowed token|
|`shares`|`uint256`|The amount of tokens being borrowed|

### Repay
*Emitted on a repayment of tokens*


```solidity
event Repay(address indexed sender, address indexed onBehalfOf, uint256 assets, uint256 shares);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The address initiating the repayment action|
|`onBehalfOf`|`address`|The address of the account on whose behalf tokens are repaid|
|`assets`|`uint256`|The address of the repaid token|
|`shares`|`uint256`|The amount of tokens being repaid|

### BorrowLiquidity
*Emitted on a liquidity borrow*


```solidity
event BorrowLiquidity(address indexed sender, uint256 borrowAmountL, address indexed to);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The address initiating the borrowing action|
|`borrowAmountL`|`uint256`|The amount of liquidity borrowed|
|`to`|`address`|Address where the borrowed liquidity is sent|

### RepayLiquidity
*Emitted on a liquidity repayment*


```solidity
event RepayLiquidity(address indexed sender, address indexed onBehalfOf, uint256 repayAmountL);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|Supplies borrowed liquidity into the pair contract and the corresponding Ammalgam Debt tokens will be destroyed|
|`onBehalfOf`|`address`|Address for whom the repayment is made|
|`repayAmountL`|`uint256`|The amount of liquidity being repaid|

