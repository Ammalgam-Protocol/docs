# AmmalgamPair
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/083c00a2031e49494b12e5e222d9534812423631/contracts/AmmalgamPair.sol)

**Inherits:**
[IAmmalgamPair](/contracts/interfaces/IAmmalgamPair.sol/interface.IAmmalgamPair.md), [TokenController](/contracts/tokens/TokenController.sol/contract.TokenController.md)


## State Variables
### MINIMUM_LIQUIDITY

```solidity
uint256 private constant MINIMUM_LIQUIDITY = 10 ** 3;
```


### BUFFER

```solidity
uint256 private constant BUFFER = 95;
```


### unlocked

```solidity
uint256 private unlocked = 1;
```


### satStruct

```solidity
Saturation.SaturationStruct satStruct;
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

### constructor


```solidity
constructor();
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
    uint256 depositedTokenType,
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
function updateWithdrawShares(address to, uint256 depositedTokenType) private returns (uint256 withdrawnAssets);
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
    uint256 borrowedTokenType,
    uint256 depositedTokenType
) private;
```

### updateBorrowOrDepositSharesHelper


```solidity
function updateBorrowOrDepositSharesHelper(
    address to,
    uint256 tokenType,
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
    uint256 repayInAssets,
    uint256 reserveInAssets,
    uint256 missingInAssets,
    uint256 borrowTokenType,
    uint256 overSaturationPenaltyAmountDecreasedInAssets
) private returns (uint256 adjustedReservesInAssets);
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

### accrueInterestAndSaturationPenalties


```solidity
function accrueInterestAndSaturationPenalties() private returns (uint112, uint112);
```

### updateObservation


```solidity
function updateObservation(uint112 _reserveXAssets, uint112 _reserveYAssets, uint32 currentTimestamp) private;
```

### validateOnUpdate


```solidity
function validateOnUpdate(address validate, address update) public;
```

### validateSolvency


```solidity
function validateSolvency(
    address validate
) private;
```

### hasBorrows


```solidity
function hasBorrows(uint256 borrowX, uint256 borrowY, uint256 borrowL) private pure returns (bool);
```

### getInputParams


```solidity
function getInputParams(
    address toCheck
) private view returns (Validation.InputParams memory inputParams, bool hasBorrow);
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

### updateSaturation

update the saturation structure with its current position

*method is virtual to override for isolating tests behavior that does not consider saturation*


```solidity
function updateSaturation(Validation.InputParams memory inputParams, address account) internal virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`inputParams`|`Validation.InputParams`||
|`account`|`address`| for which the sat is updated|


### calcPenaltyForRepay

calc penalty to be repaid due to over saturation. the function will reduce the penalty upto the repaid amounts

*method is virtual to override for isolating tests behavior that does not consider saturation*


```solidity
function calcPenaltyForRepay(
    address account,
    uint256 currentSqrtPriceInXInQ128,
    uint256 repayAmountLInLAssets,
    uint256 repayAmountXInXAssets,
    uint256 repayAmountYInYAssets
)
    internal
    virtual
    returns (
        uint256 overSaturationPenaltyRemovedLInLAssets,
        uint256 overSaturationPenaltyRemovedXInXAssets,
        uint256 overSaturationPenaltyRemovedYInYAssets
    );
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account`|`address`| for which repay penalty is calculated|
|`currentSqrtPriceInXInQ128`|`uint256`| of the pair|
|`repayAmountLInLAssets`|`uint256`| on behalf of the account|
|`repayAmountXInXAssets`|`uint256`| on behalf of the account|
|`repayAmountYInYAssets`|`uint256`| on behalf of the account|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`overSaturationPenaltyRemovedLInLAssets`|`uint256`|the penalty to be paid in L|
|`overSaturationPenaltyRemovedXInXAssets`|`uint256`|the penalty to be paid in X|
|`overSaturationPenaltyRemovedYInYAssets`|`uint256`|the penalty to be paid in Y|


## Errors
### Locked

```solidity
error Locked();
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

