# TokenController
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/bbf468c990ab84694ca54d6197acec418d42c187/contracts/tokens/TokenController.sol)

**Inherits:**
[ITokenController](/docs/developer-guide/contracts/interfaces/tokens/ITokenController.sol/interface.ITokenController.md)

*Wrapper of the ERC20 tokens that has some functionality similar to the ERC1155.*


## State Variables
### tokenX

```solidity
IERC20 private immutable tokenX;
```


### tokenY

```solidity
IERC20 private immutable tokenY;
```


### _tokenDepositL

```solidity
IAmmalgamERC20 private immutable _tokenDepositL;
```


### _tokenDepositX

```solidity
IAmmalgamERC20 private immutable _tokenDepositX;
```


### _tokenDepositY

```solidity
IAmmalgamERC20 private immutable _tokenDepositY;
```


### _tokenBorrowL

```solidity
IAmmalgamERC20 private immutable _tokenBorrowL;
```


### _tokenBorrowX

```solidity
IAmmalgamERC20 private immutable _tokenBorrowX;
```


### _tokenBorrowY

```solidity
IAmmalgamERC20 private immutable _tokenBorrowY;
```


### allShares

```solidity
uint112[6] private allShares;
```


### allAssets

```solidity
uint128[6] internal allAssets;
```


### reserveXAssets

```solidity
uint112 private reserveXAssets;
```


### reserveYAssets

```solidity
uint112 private reserveYAssets;
```


### lastUpdateTimestamp

```solidity
uint32 internal lastUpdateTimestamp;
```


### referenceReserveX

```solidity
uint112 internal referenceReserveX;
```


### referenceReserveY

```solidity
uint112 internal referenceReserveY;
```


### lastLendingTimestamp

```solidity
uint32 internal lastLendingTimestamp;
```


### missingXAssets

```solidity
uint112 internal missingXAssets;
```


### missingYAssets

```solidity
uint112 internal missingYAssets;
```


### lastPenaltyTimestamp

```solidity
uint32 internal lastPenaltyTimestamp;
```


### lastReserveLiquidity

```solidity
uint128 internal lastReserveLiquidity;
```


### lastActiveLiquidityAssets

```solidity
uint128 internal lastActiveLiquidityAssets;
```


### totalDepositLAssets

```solidity
uint256 internal totalDepositLAssets;
```


### totalDepositXAssets

```solidity
uint256 internal totalDepositXAssets;
```


### totalDepositYAssets

```solidity
uint256 internal totalDepositYAssets;
```


### totalBorrowLAssets

```solidity
uint256 internal totalBorrowLAssets;
```


### totalBorrowXAssets

```solidity
uint256 internal totalBorrowXAssets;
```


### totalBorrowYAssets

```solidity
uint256 internal totalBorrowYAssets;
```


### externalLiquidity

```solidity
uint112 public override externalLiquidity = 0;
```


### factory

```solidity
IFactoryCallback internal immutable factory;
```


### saturationAndGeometricTWAPState

```solidity
ISaturationAndGeometricTWAPState internal immutable saturationAndGeometricTWAPState;
```


## Functions
### constructor


```solidity
constructor();
```

### onlyFeeToSetter


```solidity
modifier onlyFeeToSetter();
```

### _onlyFeeToSetter


```solidity
function _onlyFeeToSetter() private view;
```

### underlyingTokens


```solidity
function underlyingTokens() public view override returns (IERC20, IERC20);
```

### updateAssets


```solidity
function updateAssets(uint256 tokenType, uint128 assets) private;
```

### updateExternalLiquidity


```solidity
function updateExternalLiquidity(
    uint112 _externalLiquidity
) external onlyFeeToSetter;
```

### mintId


```solidity
function mintId(uint256 tokenType, address sender, address to, uint256 assets, uint256 shares_) internal;
```

### burnId


```solidity
function burnId(uint256 tokenType, address sender, address from, uint256 assets, uint256 shares_) internal;
```

### tokens


```solidity
function tokens(
    uint256 tokenType
) public view override returns (IAmmalgamERC20);
```

### balanceOf


```solidity
function balanceOf(address account, uint256 tokenType) internal view returns (uint256);
```

### totalShares


```solidity
function totalShares(
    uint256 tokenType
) internal view returns (uint256);
```

### rawTotalAssets


```solidity
function rawTotalAssets(
    uint256 tokenType
) internal view returns (uint128);
```

### getReserves


```solidity
function getReserves() public view returns (uint112 _reserveXAssets, uint112 _reserveYAssets, uint32 _lastTimestamp);
```

### getTickRange


```solidity
function getTickRange() public view returns (int16 minTick, int16 maxTick);
```

### referenceReserves


```solidity
function referenceReserves() public view returns (uint112, uint112);
```

### totalAssets

Computes the current total Assets.

*If the last lending state update is outdated (i.e., not matching the current block timestamp),
the function recalculates the assets based on the duration since the last update, the lending state,
and reserve balances. If the timestamp is current, the previous asset (without recalculation) is returned.*


```solidity
function totalAssets() public view returns (uint128[6] memory);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint128[6]`|totalAssets An array of six `uint128` values representing the total assets for each of the 6 amalgam token types. These values may be adjusted based on the time elapsed since the last update. If the timestamp is up-to-date, the previously calculated total assets are returned without recalculation.|


### mintPenalties


```solidity
function mintPenalties(address account, uint32 deltaPenaltyTimestamp) internal;
```

### getAssets


```solidity
function getAssets(
    uint128[6] memory currentAssets,
    address toCheck
) internal view returns (uint256[6] memory userAssets);
```

### updateTokenController


```solidity
function updateTokenController(
    uint32 currentTimestamp,
    uint32 deltaUpdateTimestamp,
    uint32 deltaLendingTimestamp,
    uint256 _reserveXAssets,
    uint256 _reserveYAssets
) internal returns (uint112 updatedReservesX, uint112 updatedReservesY);
```

### updateReferenceReserve


```solidity
function updateReferenceReserve(
    int256 newTick
) internal;
```

### mintProtocolFees


```solidity
function mintProtocolFees(uint256 tokenType, address feeTo, uint256 protocolFee) private;
```

### updateReserves


```solidity
function updateReserves(uint256 newReserveXAssets, uint256 newReserveYAssets) internal;
```

### updateReservesAndReference


```solidity
function updateReservesAndReference(
    uint256 _reserveXAssets,
    uint256 _reserveYAssets,
    uint256 newReserveXAssets,
    uint256 newReserveYAssets
) internal;
```

### _castReserves


```solidity
function _castReserves(uint256 _reserveXAssets, uint256 _reserveYAssets) internal pure returns (uint112, uint112);
```

### getNetBalances


```solidity
function getNetBalances(uint256 _reserveXAssets, uint256 _reserveYAssets) internal view returns (uint256, uint256);
```

### missingAssets


```solidity
function missingAssets() internal view returns (uint112, uint112);
```

### updateMissingAssets


```solidity
function updateMissingAssets() internal;
```

### getDepositAndBorrowAndActiveLiquidityAssets

Get the deposit, borrow, and active liquidity assets.

*This function is used to get the deposit liquidity assets, borrow liquidity assets (BLA), last active liquidity assets (ALA_0), and current active liquidity assets (ALA_1).*


```solidity
function getDepositAndBorrowAndActiveLiquidityAssets()
    internal
    view
    returns (uint256 depositLiquidityAssets, uint256 borrowLAssets, uint256 currentActiveLiquidityAssets);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`depositLiquidityAssets`|`uint256`|The deposit liquidity assets.|
|`borrowLAssets`|`uint256`|The borrow liquidity assets.|
|`currentActiveLiquidityAssets`|`uint256`|The current active liquidity assets.|


### updateReservesAndActiveLiquidity

Update the reserves and active liquidity.

*This function is used to update the last reserves liquidity (RL_0) and last active liquidity assets (ALA_0).*


```solidity
function updateReservesAndActiveLiquidity(
    uint256 _reserveXAssets,
    uint256 _reserveYAssets
) internal returns (uint256 adjustedActiveLiquidity);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_reserveXAssets`|`uint256`|The reserve X assets.|
|`_reserveYAssets`|`uint256`|The reserve Y assets.|


### getAdjustedActiveLiquidity

Get the adjusted active liquidity which is the active liquidity without the swap fees.

*This function is used to get the adjusted active liquidity.*


```solidity
function getAdjustedActiveLiquidity(
    uint256 _reserveXAssets,
    uint256 _reserveYAssets
) internal view returns (uint256 adjustedActiveLiquidity);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_reserveXAssets`|`uint256`|The reserve X assets.|
|`_reserveYAssets`|`uint256`|The reserve Y assets.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`adjustedActiveLiquidity`|`uint256`|The adjusted active liquidity.|


### getCurrentAndAdjustedActiveLiquidity


```solidity
function getCurrentAndAdjustedActiveLiquidity(
    uint256 _reserveXAssets,
    uint256 _reserveYAssets
) internal view returns (uint256 currentReserveLiquidity, uint256 adjustedActiveLiquidity);
```

### getCurrentReserveLiquidity


```solidity
function getCurrentReserveLiquidity(uint256 _reserveXAssets, uint256 _reserveYAssets) private pure returns (uint256);
```

### burnBadDebt


```solidity
function burnBadDebt(address borrower, uint256 tokenType, uint256 reserve) internal;
```

## Errors
### Forbidden

```solidity
error Forbidden();
```

