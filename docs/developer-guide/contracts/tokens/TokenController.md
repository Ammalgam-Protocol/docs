# TokenController
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/539fb3333b1a5bdb57027ffabb33730a0eae663d/contracts/tokens/TokenController.sol)

**Inherits:**
[InitializablePair](/docs/developer-guide/contracts/proxy/InitializablePair.md), [ITokenController](/docs/developer-guide/contracts/interfaces/tokens/ITokenController.md)

*Wrapper of the ERC20 tokens that has some functionality similar to the ERC1155.*


## State Variables
### tokenX

```solidity
IERC20 private tokenX;
```


### tokenY

```solidity
IERC20 private tokenY;
```


### _tokenDepositL

```solidity
IAmmalgamERC20 private _tokenDepositL;
```


### _tokenDepositX

```solidity
IAmmalgamERC20 private _tokenDepositX;
```


### _tokenDepositY

```solidity
IAmmalgamERC20 private _tokenDepositY;
```


### _tokenBorrowL

```solidity
IAmmalgamERC20 private _tokenBorrowL;
```


### _tokenBorrowX

```solidity
IAmmalgamERC20 private _tokenBorrowX;
```


### _tokenBorrowY

```solidity
IAmmalgamERC20 private _tokenBorrowY;
```


### factory

```solidity
IFactoryCallback internal factory;
```


### saturationAndGeometricTWAPState

```solidity
ISaturationAndGeometricTWAPState internal saturationAndGeometricTWAPState;
```


### allShares

```solidity
uint112[6] private allShares;
```


### allAssets
The first position in this array is never stored because it is instead computed as
$\sqrt{reserveX\cdot reserveY}+borrowedLAssets$. We keep this storage spot because
we heavily use DEPOSIT_L, DEPOSIT_X, DEPOSIT_Y, BORROW_L, BORROW_X, BORROW_Y to look
up positions throughout the code and didn't want to change all those references.


```solidity
uint112[6] private allAssets;
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


### externalLiquidity

```solidity
uint112 public override externalLiquidity;
```


### fragileLiquidityShares

```solidity
uint112 public override fragileLiquidityShares;
```


### userFragileLiquidityShares

```solidity
mapping(address => uint256) internal userFragileLiquidityShares;
```


### totalDepositLAssets

```solidity
uint112 internal transient totalDepositLAssets;
```


### totalDepositXAssets

```solidity
uint112 internal transient totalDepositXAssets;
```


### totalDepositYAssets

```solidity
uint112 internal transient totalDepositYAssets;
```


### totalBorrowLAssets

```solidity
uint112 internal transient totalBorrowLAssets;
```


### totalBorrowXAssets

```solidity
uint112 internal transient totalBorrowXAssets;
```


### totalBorrowYAssets

```solidity
uint112 internal transient totalBorrowYAssets;
```


### activeLiquidityAssets

```solidity
uint112 internal transient activeLiquidityAssets;
```


## Functions
### _initialize


```solidity
function _initialize() internal virtual override;
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
function underlyingTokens() public view virtual override returns (IERC20, IERC20);
```

### updateAssets


```solidity
function updateAssets(uint256 tokenType, uint112 assets) internal;
```

### updateExternalLiquidity


```solidity
function updateExternalLiquidity(
    uint112 _externalLiquidity
) external virtual onlyFeeToSetter;
```

### mintId


```solidity
function mintId(uint256 tokenType, address sender, address to, uint256 assets, uint256 shares_) internal;
```

### burnId


```solidity
function burnId(uint256 tokenType, address sender, address receiver, uint256 assets, uint256 shares_) internal;
```

### tokens


```solidity
function tokens(
    uint256 tokenType
) public view virtual override returns (IAmmalgamERC20);
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
) internal view returns (uint256 assetAmount);
```

### getRawReserves


```solidity
function getRawReserves() internal view returns (uint112 _reserveXAssets, uint112 _reserveYAssets);
```

### getReserves


```solidity
function getReserves()
    public
    view
    virtual
    returns (uint112 _reserveXAssets, uint112 _reserveYAssets, uint32 _lastUpdateTimestamp);
```

### referenceReserves


```solidity
function referenceReserves() external view virtual returns (uint112, uint112);
```

### totalAssetsAndShares


```solidity
function totalAssetsAndShares(
    bool withInterest
) public view virtual returns (uint112[6] memory _allAssets, uint112[6] memory _allShares);
```

### fragileLiquidityAssets

Computes fragile liquidity and validates it can be removed from active liquidity.


```solidity
function fragileLiquidityAssets(
    uint256 _activeLiquidityAssets
) internal view returns (uint256 _fragileLiquidityAssets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_activeLiquidityAssets`|`uint256`|The active liquidity available before the fragile liquidity decrement.|


### updateFragileLiquidity

used to update fragileLiquidityShares that have a borrow of x or y against them

*We then need to increase fragile liquidity when
1. a new borrow of x or y is made when none existed and the user has l deposits.
2. l deposits are minted to a user with existing borrows of x or y.
3. l deposits are transferred to a user with no existing l and but borrows of x or y.
4. debt of x or y is transferred to a user with l shares but no debt existing x or y debt.
Fragile liquidity then needs to be decreased when
1. all borrows of x and y are repaid for a user with l deposits.
2. l deposits are burned from a user with existing borrows of x or y.
3. l deposits are transferred from a user with borrows of x or y to a user with no borrow
of x or y.
4. last debt of x or y is transferred from a user with l deposits to a user with no l
deposits.*


```solidity
function updateFragileLiquidity(
    address user
) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user`|`address`|the address to update fragile liquidity for.|


### computeAssetsState

Recalculates current total assets, reserves, and protocol fees, accounting for elapsed time and interest.

*Core logic for interest accrual and state updates (used by `totalAssetsAndShares` when `withInterest` is true):
1. Fetches raw reserves before computing interest.
2. If `totalDepositLAssets` is not 0, returns transient asset values immediately (no interest to accrue).
3. Calculates time elapsed since last update (`deltaUpdateTimestamp`) and last lending state check (`deltaLendingTimestamp`).
4. If no time has elapsed since last lending check (`deltaLendingTimestamp == 0`), returns stored values without recalculation.
5. Otherwise:
- Computes the current market tick via `getTickFromReserves()` and bounds it to valid ranges.
- Determines active lending state tick and saturation percentage using `getLendingStateTick()`.
- Calls `Interest.accrueInterestWithAssets()` to calculate interest, update asset values, and compute protocol fees.
- Adds LP-earned interest portions to X and Y reserves.*


```solidity
function computeAssetsState()
    internal
    view
    returns (
        uint112[6] memory _allAssets,
        uint112 _reserveXAssets,
        uint112 _reserveYAssets,
        uint256[3] memory protocolFees
    );
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_allAssets`|`uint112[6]`|Array of six `uint112` values: Recalculated total assets for each of the 6 Ammalgam token types (post-interest).|
|`_reserveXAssets`|`uint112`|Reserve balance for Asset X, updated with LP-earned interest.|
|`_reserveYAssets`|`uint112`|Reserve balance for Asset Y, updated with LP-earned interest.|
|`protocolFees`|`uint256[3]`|Array of three `uint256` values: Accumulated protocol fees for DEPOSIT_L, DEPOSIT_X, and DEPOSIT_Y (from interest accrual).|


### accrueSaturationPenaltiesAndInterest


```solidity
function accrueSaturationPenaltiesAndInterest(
    address affectedAccount,
    uint256 minimumTimeBeforeUpdate
) internal returns (uint256 _reserveXAssets, uint256 _reserveYAssets, uint256 balanceXAssets, uint256 balanceYAssets);
```

### updateObservation


```solidity
function updateObservation(
    uint256 _reserveXAssets,
    uint256 _reserveYAssets,
    uint32 currentTimestamp,
    uint32 deltaUpdateTimestamp
) private;
```

### mintPenalties


```solidity
function mintPenalties(address account, uint32 deltaLendingTimestamp) internal;
```

### getAssets


```solidity
function getAssets(
    uint112[6] memory _totalAssets,
    uint112[6] memory _totalShares,
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
) internal returns (uint256 updatedReservesX, uint256 updatedReservesY);
```

### updateReferenceReserve


```solidity
function updateReferenceReserve(
    int256 newTick
) internal;
```

### mintProtocolFees


```solidity
function mintProtocolFees(
    uint256 tokenType,
    address feeTo,
    uint256 protocolFee,
    bool feeIncludedInTotalAssets
) internal;
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
function missingAssets() internal view returns (uint112 missingXAssets, uint112 missingYAssets);
```

### calculateActiveLiquidityAssets

Active liquidity from reserves, using the same depletion adjustment as the swap
K-check in `calculateReserveAdjustmentsForMissingAssets`. Caching raw `sqrt(X*Y)` is
non-monotonic across depletion cycles, letting saturation-tree leaves register above the
post-recovery `maxLeaf` and bricking the pair with `MaxTrancheOverSaturated()`.


```solidity
function calculateActiveLiquidityAssets(
    uint256 _reserveXAssets,
    uint256 _reserveYAssets
) internal view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_reserveXAssets`|`uint256`|The reserve X used for the active-liquidity calculation.|
|`_reserveYAssets`|`uint256`|The reserve Y used for the active-liquidity calculation.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The depletion-adjusted active liquidity, i.e. sqrt of the adjusted-reserve product.|


### getDepositAndActiveLiquidityAssets

Get the deposit, and active liquidity assets.


```solidity
function getDepositAndActiveLiquidityAssets()
    internal
    view
    returns (uint256 depositLiquidityAssets, uint256 currentActiveLiquidityAssets);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`depositLiquidityAssets`|`uint256`|The deposit liquidity assets.|
|`currentActiveLiquidityAssets`|`uint256`|The current active liquidity assets.|


### burnBadDebt


```solidity
function burnBadDebt(address borrower, uint256 tokenType, uint256 reserve) internal;
```

### getUpdatedReferenceReserves

*Get the updated reference reserves based on the `newTick`.*


```solidity
function getUpdatedReferenceReserves(
    int256 newTick
) internal view returns (uint112, uint112);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newTick`|`int256`|The current tick.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint112`|_referenceReserveX The updated reference reserve X.|
|`<none>`|`uint112`|_referenceReserveY The updated reference reserve Y.|


## Errors
### Forbidden

```solidity
error Forbidden();
```

