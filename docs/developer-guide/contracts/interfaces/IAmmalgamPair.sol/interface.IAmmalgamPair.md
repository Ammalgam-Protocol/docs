# IAmmalgamPair
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/569946a105ba5696a3f30dfd05e01dfbb1c6c82a/contracts/interfaces/IAmmalgamPair.sol)

**Inherits:**
[ITransferValidator](/docs/developer-guide/contracts/interfaces/callbacks/ITransferValidator.sol/interface.ITransferValidator.md)


## Functions
### mint

Mints tokens and assigns them to `to` address.

*Calculates the amount of tokens to mint based on reserves and balances. Requires liquidity > 0.
Emits a #Mint event.*


```solidity
function mint(
    address to
) external returns (uint256 liquidity);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to`|`address`|address to which tokens will be minted|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`liquidity`|`uint256`|amount of tokens minted|


### burn

Burns liquidity tokens from the contract and sends the underlying assets to `to` address.

*Calculates the amounts of assets to be returned based on liquidity.
Requires amountXAssets and amountYAssets to be greater than 0.
Emits a #Burn event and performs a safe transfer of assets.*


```solidity
function burn(
    address to
) external returns (uint256 amountXAssets, uint256 amountYAssets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to`|`address`|address to which the underlying assets will be transferred|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountXAssets`|`uint256`|amount of first token to be returned|
|`amountYAssets`|`uint256`|amount of second token to be returned|


### swap

Executes a swap of tokens.

*Requires at least one of `amountXOut` and `amountYOut` to be greater than 0,
and that the amount out does not exceed the reserves.
An optimistically transfer of tokens is performed.
A callback is executed if `data` is not empty.
Emits a #Swap event.*


```solidity
function swap(uint256 amountXOut, uint256 amountYOut, address to, bytes calldata data) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amountXOut`|`uint256`|Amount of first token to be swapped out.|
|`amountYOut`|`uint256`|Amount of second token to be swapped out.|
|`to`|`address`|Address to which the swapped tokens are sent.|
|`data`|`bytes`|Data to be sent along with the call, can be used for a callback.|


### deposit

Handles deposits into the contract.

*Verifies deposit amounts and types, adjusts reserves if necessary, mints corresponding tokens, and updates missing assets.*


```solidity
function deposit(
    address to
) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to`|`address`|Address to which tokens will be minted.|


### withdraw

Handles withdrawals from the contract.

*Verifies withdrawal amounts, burns corresponding tokens, transfers the assets, and updates missing assets.*


```solidity
function withdraw(
    address to
) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to`|`address`|Address to which the withdrawn assets will be transferred.|


### borrow

Handles borrowing from the contract.

*Verifies the borrowing amounts, mints corresponding debt tokens, transfers the assets, and updates missing assets. Also supports flash loan interactions.*


```solidity
function borrow(address to, uint256 amountXAssets, uint256 amountYAssets, bytes calldata data) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to`|`address`|Address to which the borrowed assets will be transferred.|
|`amountXAssets`|`uint256`|Amount of asset X to borrow.|
|`amountYAssets`|`uint256`|Amount of asset Y to borrow.|
|`data`|`bytes`|Call data to be sent to external contract if flash loan interaction is desired.|


### borrowLiquidity

Handles liquidity borrowing from the contract.

*Verifies the borrowing amount, mints corresponding tokens, transfers the assets, and updates reserves. Also supports flash loan interactions.*


```solidity
function borrowLiquidity(
    address to,
    uint256 borrowAmountLAssets,
    bytes calldata data
) external returns (uint256, uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to`|`address`||
|`borrowAmountLAssets`|`uint256`|Amount of liquidity to borrow.|
|`data`|`bytes`|Call data to be sent to external contract if flash loan is desired.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|borrowedLX Amount of asset X borrowed.|
|`<none>`|`uint256`|borrowedLY Amount of asset Y borrowed.|


### repay

Handles repayment of borrowed assets.

*Burns corresponding borrowed tokens, adjusts the reserves, and updates missing assets.*


```solidity
function repay(
    address onBehalfOf
) external returns (uint256 repayXInXAssets, uint256 repayYInYAssets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`onBehalfOf`|`address`|Address of the entity on whose behalf the repayment is made.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`repayXInXAssets`|`uint256`|Amount of token X repaid|
|`repayYInYAssets`|`uint256`|Amount of token Y repaid|


### repayLiquidity

Handles repayment of borrowed liquidity.

*Calculates repayable liquidity, burns corresponding tokens, adjusts reserves, and updates active liquidity.*


```solidity
function repayLiquidity(
    address onBehalfOf
) external returns (uint256 repaidLXInXAssets, uint256 repaidLYInYAssets, uint256 repayLiquidityAssets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`onBehalfOf`|`address`|Address of the entity on whose behalf the liquidity repayment is made.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`repaidLXInXAssets`|`uint256`|Amount of liquidity repaid in X.|
|`repaidLYInYAssets`|`uint256`|Amount of liquidity repaid in Y.|
|`repayLiquidityAssets`|`uint256`|Amount of liquidity repaid in L.|


### skim

Transfers excess tokens to a specified address.

*Calculates the excess of tokenX and tokenY balances and transfers them to the specified address.*


```solidity
function skim(
    address to
) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to`|`address`|The address to which the excess tokens are transferred.|


### sync

Updates the reserves to match the current token balances.

*Reads the current balance of tokenX and tokenY in the contract, and updates the reserves to match these balances.*


```solidity
function sync() external;
```

### liquidate

LTV based liquidation. The LTV dictates the max discount that can be had by the liquidator.


```solidity
function liquidate(
    address borrower,
    address to,
    uint256 seizedLAssets,
    uint256 seizedXAssets,
    uint256 seizedYAssets,
    uint256 repayXAssets,
    uint256 repayYAssets,
    uint256 liquidationType
) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`borrower`|`address`|The account being liquidated.|
|`to`|`address`|The account to send the liquidated deposit to|
|`seizedLAssets`|`uint256`|The amount of L tokens to be transferred from the hard deposit.|
|`seizedXAssets`|`uint256`|The amount of X tokens to be transferred from the hard deposit.|
|`seizedYAssets`|`uint256`|The amount of Y tokens to be transferred from the hard deposit.|
|`repayXAssets`|`uint256`|The amount of X assets being repaid on behalf of the borrower.|
|`repayYAssets`|`uint256`|The amount of Y assets being repaid on behalf of the|
|`liquidationType`|`uint256`|The type of liquidation to be performed: HARD, SATURATION, LEVERAGE|


## Events
### Swap
*Emitted on a token swap*


```solidity
event Swap(
    address indexed sender,
    uint256 amountXIn,
    uint256 amountYIn,
    uint256 amountXOut,
    uint256 amountYOut,
    address indexed to
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The address initiating the swap|
|`amountXIn`|`uint256`|The amount of token X provided for the swap|
|`amountYIn`|`uint256`|The amount of token Y provided for the swap|
|`amountXOut`|`uint256`|The amount of token X received from the swap|
|`amountYOut`|`uint256`|The amount of token Y received from the swap|
|`to`|`address`|Address where the swapped tokens are sent|

### Liquidate
*Emitted on liquidation*


```solidity
event Liquidate(
    address indexed borrower,
    address indexed to,
    uint256 seizedLAssets,
    uint256 seizedXAssets,
    uint256 seizedYAssets,
    uint256 repayXAssets,
    uint256 repayYAssets,
    uint256 actualRepaidXAssets,
    uint256 actualRepaidYAssets,
    uint256 liquidationType
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`borrower`|`address`|The account being liquidated.|
|`to`|`address`|The account to send the liquidated deposit to|
|`seizedLAssets`|`uint256`|The amount of L tokens to be transferred from the hard deposit.|
|`seizedXAssets`|`uint256`|The amount of X tokens to be transferred from the hard deposit.|
|`seizedYAssets`|`uint256`|The amount of Y tokens to be transferred from the hard deposit.|
|`repayXAssets`|`uint256`|The amount of X assets requested to be credited, in the case of hard liquidations, this will be the portion of the repay credited to borrowed X assets, but not L assets.|
|`repayYAssets`|`uint256`|The amount of Y assets requested to be credited, in the case of hard liquidations, this will be the portion of the repay credited to borrowed Y assets, but not L assets.|
|`actualRepaidXAssets`|`uint256`|The actual amount of X assets repaid by the liquidator. In the case of repaid L, this amount will exceed repayXAssets by that amount of X assets portion of L.|
|`actualRepaidYAssets`|`uint256`|The actual amount of Y assets repaid by the liquidator. In the case of repaid L, this amount will exceed repayYAssets by that amount of Y assets portion of L.|
|`liquidationType`|`uint256`|The type of liquidation to be performed: HARD, SATURATION, LEVERAGE|

