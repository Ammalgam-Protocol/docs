# BorrowCap
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/1e9f832cf58cf9b2fb60a347939c2da19caff649/contracts/libraries/BorrowCap.sol)

Per-block borrow cap using dual LX/LY accumulators to mitigate TWAP lag attacks.

*Tracks X-side and Y-side debt separately in L units. BORROW_L increases both sides.
On new block, uses previous block's last known totals as baseline. Checks delta on every call.
The per-block budget is: activeLiquidity × borrowCapBips / 10000.
`borrowCapBips` is per-pair configurable via `configure()`; when unconfigured (0),
it defaults to DEFAULT_BORROW_CAP_BIPS (500 = 5%).
The sqrt(1.5) worst-case factor (k ≈ 1.2247) remains as a constant safety margin
on X/Y borrow conversions to L-equivalents.
Both the baseline and current values are stored as inflated L-equivalents
(i.e. with the sqrt(1.5) worst-case factor already applied to X/Y components).
Because the delta is computed as currentLX - baselineLX, the inflation on
existing* borrows cancels out, while the inflation on *new* borrows is preserved:
baseline = L₁ + X₁ · k        (k = worst-case conversion factor)
current  = L₂ + X₂ · k
delta    = (L₂ - L₁) + (X₂ - X₁) · k
So a new X borrow of size dX contributes dX · k to the delta, not raw dX.*


## State Variables
### DEFAULT_BORROW_CAP_BIPS

```solidity
uint256 constant DEFAULT_BORROW_CAP_BIPS = 500;
```


### SQRT_BIPS

```solidity
uint256 constant SQRT_BIPS = 10_000;
```


### SQRT_WORST_CASE_BIPS

```solidity
uint256 constant SQRT_WORST_CASE_BIPS = 12_247;
```


## Functions
### checkBorrowCap

Check that the per-block borrow cap has not been exceeded.

*Computes LX and LY from raw borrow totals and oracle prices, then checks
delta against the per-block cap. On new block, uses previous block's
lastKnownLX/LY as the baseline snapshot. Repays lower the baseline.*


```solidity
function checkBorrowCap(
    State storage state,
    uint256 totalBorrowL,
    uint256 totalBorrowX,
    uint256 totalBorrowY,
    uint256 sqrtPriceMinQ72,
    uint256 sqrtPriceMaxQ72,
    uint256 activeLiquidity
) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`state`|`State`| per-pair borrow cap state|
|`totalBorrowL`|`uint256`| pair-level total BORROW_L assets|
|`totalBorrowX`|`uint256`| pair-level total BORROW_X assets|
|`totalBorrowY`|`uint256`| pair-level total BORROW_Y assets|
|`sqrtPriceMinQ72`|`uint256`| worst-case minimum sqrt price (for X-side deflation)|
|`sqrtPriceMaxQ72`|`uint256`| worst-case maximum sqrt price (for Y-side inflation)|
|`activeLiquidity`|`uint256`| active liquidity used to compute the cap|


### configure


```solidity
function configure(State storage state, uint16 _borrowCapBips) internal;
```

### computeLX

Compute the X-side debt in L units with worst-case sqrt(1.5) deflation.

*LX = totalBorrowL + convertXToL(totalBorrowX, sqrtPriceMin * SQRT_BIPS / SQRT_WORST_CASE_BIPS)*


```solidity
function computeLX(
    uint256 totalBorrowL,
    uint256 totalBorrowX,
    uint256 sqrtPriceMinQ72
) private pure returns (uint256);
```

### computeLY

Compute the Y-side debt in L units with worst-case sqrt(1.5) inflation.

*LY = totalBorrowL + convertYToL(totalBorrowY, sqrtPriceMax * SQRT_WORST_CASE_BIPS / SQRT_BIPS)*


```solidity
function computeLY(
    uint256 totalBorrowL,
    uint256 totalBorrowY,
    uint256 sqrtPriceMaxQ72
) private pure returns (uint256);
```

## Errors
### BorrowCapExceeded

```solidity
error BorrowCapExceeded();
```

### InvalidBorrowCapConfig

```solidity
error InvalidBorrowCapConfig();
```

## Structs
### State

```solidity
struct State {
    uint64 lastBlock;
    uint16 borrowCapBips;
    uint128 startOfBlockLX;
    uint128 startOfBlockLY;
    uint128 lastKnownLX;
    uint128 lastKnownLY;
}
```

