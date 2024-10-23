# AmmalgamPair
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/922bb12a291a5f6729dd85abc24fc6fec504a108/contracts/AmmalgamPair.sol)

**Inherits:**
[IAmmalgamPair](/contracts/interfaces/IAmmalgamPair.sol/interface.IAmmalgamPair.md), [TokenController](/contracts/tokens/TokenController.sol/contract.TokenController.md)


## State Variables
### MINIMUM_LIQUIDITY

```solidity
uint256 private constant MINIMUM_LIQUIDITY = 10 ** 3;
```


### LTV

```solidity
uint8 private constant LTV = 75;
```


### MAX_BORROW

```solidity
uint8 private constant MAX_BORROW = 90;
```


### ALLOWED_LIQUIDITY_LEVERAGE

```solidity
uint8 private constant ALLOWED_LIQUIDITY_LEVERAGE = 100;
```


### BUFFER

```solidity
uint8 private constant BUFFER = 95;
```


### factory

```solidity
address private immutable factory;
```


### feeToSetter

```solidity
address private immutable feeToSetter;
```


### sharesToAssetsScaler

```solidity
Scalers internal sharesToAssetsScaler =
    Scalers({sharesToAssets: [uint128(RAY), uint128(RAY), uint128(RAY), uint128(RAY), uint128(RAY), uint128(RAY)]});
```


### lastLendingTimestampUpdate

```solidity
uint256 private lastLendingTimestampUpdate;
```


### reserveX

```solidity
uint112 private reserveX;
```


### reserveY

```solidity
uint112 private reserveY;
```


### missingX

```solidity
uint112 private missingX;
```


### missingY

```solidity
uint112 private missingY;
```


### shares

```solidity
uint112[6] internal shares;
```


### externalLiquidity

```solidity
uint112 internal externalLiquidity = 0;
```


### observations

```solidity
GeometricBWAP.Observations internal observations;
```


### unlocked

```solidity
uint256 private unlocked = 1;
```


## Functions
### _lock


```solidity
function _lock() private view;
```

### lock


```solidity
modifier lock();
```

### _onlyFeeToSetter


```solidity
function _onlyFeeToSetter() private view;
```

### onlyFeeToSetter


```solidity
modifier onlyFeeToSetter();
```

### constructor


```solidity
constructor();
```

### missingAssets


```solidity
function missingAssets() public view returns (uint112, uint112);
```

### updateExternalLiquidity


```solidity
function updateExternalLiquidity(uint112 externalLiquidity_) external onlyFeeToSetter;
```

### mint


```solidity
function mint(address to) external lock returns (uint256 liquidity);
```

### burn


```solidity
function burn(address to) external lock returns (uint256 amountX, uint256 amountY);
```

### swap


```solidity
function swap(uint256 amountXOut, uint256 amountYOut, address to, bytes calldata data) external lock;
```

### deposit


```solidity
function deposit(address to) external lock;
```

### updateDepositShares


```solidity
function updateDepositShares(
    uint8 depositedTokenType,
    uint256 amount,
    uint112 reserve,
    uint112 missing,
    address to
) private returns (uint256 adjustReserves);
```

### withdraw

withdraw X and/or Y


```solidity
function withdraw(address to) external lock;
```

### updateWithdrawShares


```solidity
function updateWithdrawShares(address to, uint8 depositedTokenType) private returns (uint256 assets);
```

### borrow


```solidity
function borrow(address to, uint256 amountXAssets, uint256 amountYAssets, bytes calldata data) external lock;
```

### borrowHelper


```solidity
function borrowHelper(
    Validation.VerifyMaxBorrowXYParams memory maxBorrowParams,
    address to,
    uint256 amountAssets,
    uint112 reserve,
    uint8 borrowedTokenType,
    uint8 depositedTokenType
) private;
```

### updateBorrowOrDepositSharesHelper


```solidity
function updateBorrowOrDepositSharesHelper(address to, uint8 tokenType, uint256 amountAssets) private;
```

### borrowLiquidity


```solidity
function borrowLiquidity(
    address to,
    uint256 borrowAmountL,
    bytes calldata data
) external lock returns (uint256, uint256);
```

### repay


```solidity
function repay(address onBehalfOf) public lock;
```

### repayHelper


```solidity
function repayHelper(
    address onBehalfOf,
    uint256 amountAssets,
    uint112 reserve,
    uint112 missing,
    uint8 borrowTokenType
) private returns (uint256 adjustedReserves);
```

### repayLiquidity


```solidity
function repayLiquidity(
    address onBehalfOf
) public lock returns (uint256 amountX, uint256 amountY, uint256 repayAmountL);
```

### depletionReserveAdjustmentWhenLiquidityIsAdded

*Minting when assets depleted requires less of the depleted asset as we
give extra credit to minter for bringing the scarce asset. We account
for liquidity as if moving from the unmodified invariant prior to mint
to the where it would move after the mint including the extra credited
scarce asset.
I continue to update the Desmos to help create test cases with easier
numbers to reason about, The current version of desmos is linked below.
The chart could use some clean up and reorganization to be clearer, will
do in the future.
https://www.desmos.com/calculator/etzuxkjeig*


```solidity
function depletionReserveAdjustmentWhenLiquidityIsAdded(
    uint112 reserve_,
    uint256 amount_,
    uint256 missing_,
    uint256 activeLiquidityAssets
) private pure returns (uint256);
```

### depletionReserveAdjustmentWhenAssetIsAdded

*When assets are depleted, a user can deposit the depleted asset and earn additional deposit credit for moving
the swap curve from the adjusted amount due to assets being depleted to the original curve.*


```solidity
function depletionReserveAdjustmentWhenAssetIsAdded(
    uint256 amount_,
    uint256 reserve_,
    uint256 missing_
) private pure returns (uint256 adjustReserves_);
```

### skim


```solidity
function skim(address to) external lock;
```

### sync


```solidity
function sync() external lock;
```

### getReserves


```solidity
function getReserves() public view returns (uint112 _reserveX, uint112 _reserveY, uint256 _blockLast);
```

### updateMissingAssets


```solidity
function updateMissingAssets() private;
```

### accrueInterest


```solidity
function accrueInterest() private returns (uint112, uint112);
```

### updateObservation


```solidity
function updateObservation(uint112 _reserveX, uint112 _reserveY) private;
```

### updateReserves


```solidity
function updateReserves(uint256 _reserveX, uint256 _reserveY) private;
```

### validateSolvency


```solidity
function validateSolvency(uint8 tokenType, address toCheck, uint256 sharesSentIn, uint256 sharesFrom) public view;
```

### configLongTermInterval


```solidity
function configLongTermInterval(uint24 longTermIntervalConfigFactor) external onlyFeeToSetter;
```

### getNetBalances


```solidity
function getNetBalances(uint112 _reserveX, uint112 _reserveY) internal view returns (uint256, uint256);
```

### transferAssets


```solidity
function transferAssets(address to, uint256 amountX, uint256 amountY) private;
```

### convertSharesToAssets


```solidity
function convertSharesToAssets(uint8 tokenType, uint256 _shares) private view returns (uint256 _assets);
```

### convertSharesToAssets


```solidity
function convertSharesToAssets(
    uint8 tokenType,
    uint256 _shares,
    Math.Rounding rounding
) private view returns (uint256);
```

### convertAssetsToShares


```solidity
function convertAssetsToShares(uint8 tokenType, uint256 _assets) private view returns (uint112 _shares);
```

### isDeposit


```solidity
function isDeposit(uint8 tokenType) private pure returns (bool);
```

### getLiquidityScalerAndActiveLiquidityAssets


```solidity
function getLiquidityScalerAndActiveLiquidityAssets() internal view returns (uint256, uint256, uint112);
```

### getAssets


```solidity
function getAssets(uint8 tokenType, address toCheck) private view returns (uint256);
```

### getAssets


```solidity
function getAssets(uint8 tokenType) private view returns (uint256);
```

### calcMinLiquidityConsideringDepletion


```solidity
function calcMinLiquidityConsideringDepletion(
    uint112 _reserveX,
    uint112 _reserveY,
    uint256 amountX,
    uint256 amountY,
    uint112 activeLiquidityAssets,
    uint256 scalerDL
) private view returns (uint256 liquidity);
```

### calcLiquidityConsideringDepletion


```solidity
function calcLiquidityConsideringDepletion(
    uint112 reserve,
    uint256 amount,
    uint256 missing,
    uint112 activeLiquidityAssets,
    uint256 scalerDL
) private pure returns (uint256 liquidity);
```

### computeScaler


```solidity
function computeScaler(uint8 tokenType) public view returns (uint128 newScaler);
```

### toUint112


```solidity
function toUint112(uint256 value) private pure returns (uint112);
```

## Errors
### Locked

```solidity
error Locked();
```

### Forbidden

```solidity
error Forbidden();
```

### InsufficientLiquidityMinted

```solidity
error InsufficientLiquidityMinted();
```

### InsufficientLiquidityBurned

```solidity
error InsufficientLiquidityBurned();
```

### InsufficientOutputAmount

```solidity
error InsufficientOutputAmount();
```

### InsufficientInputAmount

```solidity
error InsufficientInputAmount();
```

### InsufficientLiquidity

```solidity
error InsufficientLiquidity();
```

### InvalidToAddress

```solidity
error InvalidToAddress();
```

### K

```solidity
error K();
```

### InsufficientRepayLiquidity

```solidity
error InsufficientRepayLiquidity();
```

### Overflow

```solidity
error Overflow();
```

