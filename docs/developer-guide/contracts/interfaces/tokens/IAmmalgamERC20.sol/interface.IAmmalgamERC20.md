# IAmmalgamERC20
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/d1df5df9e4b968d0d06a1d2d00a0120c1be82e15/contracts/interfaces/tokens/IAmmalgamERC20.sol)

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


### ownerTransfer

Transfers `amount` tokens from the `from` address to the `to` address.


```solidity
function ownerTransfer(address from, address to, uint256 amount) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`from`|`address`|The account to deduct the tokens from.|
|`to`|`address`|The account to deliver the tokens to.|
|`amount`|`uint256`|The amount of tokens to be transferred.|


## Events
### Mint
*Emitted when tokens are minted*


```solidity
event Mint(address indexed sender, address indexed to, uint256 assets, uint256 shares);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`||
|`to`|`address`|Address where minted tokens are sent|
|`assets`|`uint256`|The amount of token assets being minted|
|`shares`|`uint256`|The amount of token shares being minted|

### Burn
*Emitted when tokens are burned*


```solidity
event Burn(address indexed sender, address indexed to, uint256 assets, uint256 shares);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|Supplies Ammalgam Liquidity token into the pair contract and receives the minted assets in exchange|
|`to`|`address`|Address where burned tokens are sent|
|`assets`|`uint256`|The amount of token assets being burned|
|`shares`|`uint256`|The amount of token shares being burned|

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
|`assets`|`uint256`|The amount of the borrowed token assets|
|`shares`|`uint256`|The amount of token shares being borrowed|

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
event BorrowLiquidity(address indexed sender, address indexed to, uint256 assets, uint256 shares);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The address initiating the borrowing action|
|`to`|`address`|Address where the borrowed liquidity is sent|
|`assets`|`uint256`|The amount of the borrowed liquidity token|
|`shares`|`uint256`|The amount of token shares being borrowed|

### RepayLiquidity
*Emitted on a liquidity repayment*


```solidity
event RepayLiquidity(address indexed sender, address indexed onBehalfOf, uint256 assets, uint256 shares);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|Supplies borrowed liquidity into the pair contract and the corresponding Ammalgam Debt tokens will be destroyed|
|`onBehalfOf`|`address`|Address for whom the repayment is made|
|`assets`|`uint256`|The amount of liquidity assets being repaid|
|`shares`|`uint256`|The amount of liquidity shares being repaid|

