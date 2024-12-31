# AmmalgamPair
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/a776754587e2530d31f83af30e82bc8095fad927/contracts/AmmalgamPair.sol)

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


### MAX_BORROW_PERCENTAGE

```solidity
uint8 private constant MAX_BORROW_PERCENTAGE = 90;
```


### ALLOWED_LIQUIDITY_LEVERAGE

```solidity
uint8 private constant ALLOWED_LIQUIDITY_LEVERAGE = 100;
```


### BUFFER

```solidity
uint8 private constant BUFFER = 95;
```


### externalLiquidity

```solidity
uint112 internal externalLiquidity = 0;
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

### updateExternalLiquidity


```solidity
function updateExternalLiquidity(
    uint112 externalLiquidity_
) external onlyFeeToSetter;
```

### mint


```solidity
function mint(
    address to
) external lock returns (uint256 liquidityShares);
```

### burn


```solidity
function burn(
    address to
) external lock returns (uint256 amountXAssets, uint256 amountYAssets);
```

### swap


```solidity
function swap(uint256 amountXOut, uint256 amountYOut, address to, bytes calldata data) external lock;
```

### deposit


```solidity
function deposit(
    address to
) external lock;
```

### updateDepositShares


```solidity
function updateDepositShares(
    uint8 depositedTokenType,
    uint256 amountAssets,
    uint256 reserveAssets,
    uint256 _missingAssets,
    address to
) private returns (uint256 adjustReserves);
```

### withdraw

withdraw X and/or Y


```solidity
function withdraw(
    address to
) external lock;
```

### updateWithdrawShares


```solidity
function updateWithdrawShares(address to, uint8 depositedTokenType) private returns (uint256 withdrawnAssets);
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
function updateBorrowOrDepositSharesHelper(
    address to,
    uint8 tokenType,
    uint256 amountAssets,
    bool isRoundingUp
) private;
```

### borrowLiquidity


```solidity
function borrowLiquidity(
    address to,
    uint256 borrowAmountLAssets,
    bytes calldata data
) external lock returns (uint256, uint256);
```

### repay


```solidity
function repay(
    address onBehalfOf
) public lock;
```

### repayHelper


```solidity
function repayHelper(
    address onBehalfOf,
    uint256 amountAssets,
    uint256 reserveAssets,
    uint256 _missingAssets,
    uint8 borrowTokenType
) private returns (uint256 adjustedReserves);
```

### repayLiquidity


```solidity
function repayLiquidity(
    address onBehalfOf
) public lock returns (uint256 amountXAssets, uint256 amountYAssets, uint256 repayLiquidityShares);
```

### skim


```solidity
function skim(
    address to
) external lock;
```

### sync


```solidity
function sync() external lock;
```

### depletionReserveAdjustmentWhenAssetIsAdded

*When assets are depleted, a user can deposit the depleted asset and earn additional deposit credit for moving
the swap curve from the adjusted amount due to assets being depleted to the original curve.*


```solidity
function depletionReserveAdjustmentWhenAssetIsAdded(
    uint256 amountAssets,
    uint256 reserveAssets,
    uint256 _missingAssets
) private pure returns (uint256 adjustReserves_);
```

### accrueInterest


```solidity
function accrueInterest() private returns (uint112, uint112);
```

### updateObservation


```solidity
function updateObservation(uint112 _reserveXAssets, uint112 _reserveYAssets, uint32 currentTimestamp) private;
```

### validateSolvency


```solidity
function validateSolvency(
    address toCheck
) public view;
```

### configLongTermInterval


```solidity
function configLongTermInterval(
    uint24 longTermIntervalConfigFactor
) external onlyFeeToSetter;
```

### transferAssets


```solidity
function transferAssets(address to, uint256 amountXAssets, uint256 amountYAssets) private;
```

### calcMinLiquidityConsideringDepletion


```solidity
function calcMinLiquidityConsideringDepletion(
    uint256 amountXAssets,
    uint256 amountYAssets,
    uint256 _reserveXAssets,
    uint256 _reserveYAssets,
    uint256 activeLiquidityAssets,
    uint256 depositLiquidityAssets,
    uint256 depositLiquidityShares,
    bool isRoundingUp
) private view returns (uint256 liquidityAssets, uint256 liquidityShares);
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

