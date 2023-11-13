# AmmalgamPair
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/c2398bc2cc7b9fe383b005349741b4aa61a1c292/contracts/AmmalgamPair.sol)

**Inherits:**
[IAmmalgamPair](/contracts/interfaces/IAmmalgamPair.sol/interface.IAmmalgamPair.md), [AmmalgamERC20Controller](/contracts/tokens/AmmalgamERC20Controller.sol/contract.AmmalgamERC20Controller.md)


## State Variables
### MINIMUM_LIQUIDITY

```solidity
uint256 public constant MINIMUM_LIQUIDITY = 10 ** 3;
```


### LTV

```solidity
uint8 public constant override LTV = 75;
```


### MAX_BORROW

```solidity
uint8 public constant MAX_BORROW = 90;
```


### ALLOWED_LIQUIDITY_LEVERAGE

```solidity
uint8 public constant override ALLOWED_LIQUIDITY_LEVERAGE = 100;
```


### BUFFER

```solidity
uint8 public constant BUFFER = 95;
```


### externalLiquidity

```solidity
uint112 public override externalLiquidity = 0;
```


### factory

```solidity
address public immutable factory;
```


### feeToSetter

```solidity
address public immutable feeToSetter;
```


### activeLiquidity

```solidity
uint112 private activeLiquidity;
```


### activeLiquidityScaler

```solidity
uint256 private activeLiquidityScaler;
```


### obs

```solidity
GeometricBWAP.Observations private obs;
```


### reserveX

```solidity
uint112 private reserveX;
```


### reserveY

```solidity
uint112 private reserveY;
```


### depositedX

```solidity
uint112 private depositedX;
```


### depositedY

```solidity
uint112 private depositedY;
```


### borrowedX

```solidity
uint112 private borrowedX;
```


### borrowedY

```solidity
uint112 private borrowedY;
```


### kLast

```solidity
uint256 public kLast;
```


### unlocked

```solidity
uint256 private unlocked = 1;
```


### missingX

```solidity
uint112 public override missingX;
```


### missingY

```solidity
uint112 public override missingY;
```


## Functions
### lock


```solidity
modifier lock();
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
function updateExternalLiquidity(uint112 externalLiquidity_) external override onlyFeeToSetter;
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

### withdraw

withdraw X and/or Y


```solidity
function withdraw(address to) external lock;
```

### borrow


```solidity
function borrow(address to, uint256 amountX, uint256 amountY, bytes calldata data) external lock;
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

### repayLiquidity


```solidity
function repayLiquidity(address onBehalfOf)
    public
    lock
    returns (uint256 amountX, uint256 amountY, uint256 repayAmountL);
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
    uint256 activeLiquidity_
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

### _update


```solidity
function _update(uint256 balanceX, uint256 balanceY, uint112 _reserveX, uint112 _reserveY) private;
```

### _mintFee


```solidity
function _mintFee(uint112 _reserveX, uint112 _reserveY) private returns (bool feeOn);
```

### validateSolvency


```solidity
function validateSolvency(TokenType tokenType, address toCheck, uint256 amount, uint256 balanceFrom) public view;
```

### getNetAmounts


```solidity
function getNetAmounts() private view returns (uint256 amountX, uint256 amountY);
```

### configLongTermInterval


```solidity
function configLongTermInterval(uint24 longTermIntervalConfig) external onlyFeeToSetter;
```

### getObservations


```solidity
function getObservations() external view override returns (GeometricBWAP.Observations memory);
```

### getTickRange


```solidity
function getTickRange() external view returns (int24, int24);
```

## Errors
### AmmalgamLocked

```solidity
error AmmalgamLocked();
```

### AmmalgamForbidden

```solidity
error AmmalgamForbidden();
```

### AmmalgamInsufficientLiquidityMinted

```solidity
error AmmalgamInsufficientLiquidityMinted();
```

### AmmalgamInsufficientLiquidityBurned

```solidity
error AmmalgamInsufficientLiquidityBurned();
```

### AmmalgamInsufficientOutputAmount

```solidity
error AmmalgamInsufficientOutputAmount();
```

### AmmalgamInsufficientInputAmount

```solidity
error AmmalgamInsufficientInputAmount();
```

### AmmalgamInsufficientLiquidity

```solidity
error AmmalgamInsufficientLiquidity();
```

### AmmalgamInvalidToAddress

```solidity
error AmmalgamInvalidToAddress();
```

### AmmalgamK

```solidity
error AmmalgamK();
```

### AmmalgamDepositOverflow

```solidity
error AmmalgamDepositOverflow();
```

### AmmalgamInsufficientRepayLiquidity

```solidity
error AmmalgamInsufficientRepayLiquidity();
```

### AmmalgamOverflow

```solidity
error AmmalgamOverflow();
```

