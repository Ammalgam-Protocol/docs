# TokenController
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/a776754587e2530d31f83af30e82bc8095fad927/contracts/tokens/TokenController.sol)

**Inherits:**
[ITokenController](/contracts/interfaces/tokens/ITokenController.sol/interface.ITokenController.md)

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


### shares

```solidity
uint112[6] private shares;
```


### allAssets

```solidity
Assets private allAssets = Assets({assets: [uint128(0), 0, 0, 0, 0, 0]});
```


### reserveXAssets

```solidity
uint112 private reserveXAssets;
```


### reserveYAssets

```solidity
uint112 private reserveYAssets;
```


### lastLiquidity

```solidity
uint128 internal lastLiquidity;
```


### missingXAssets

```solidity
uint112 private missingXAssets;
```


### missingYAssets

```solidity
uint112 private missingYAssets;
```


### factory

```solidity
IAmmalgamFactory internal immutable factory;
```


### observations

```solidity
GeometricTWAP.Observations internal observations;
```


## Functions
### constructor


```solidity
constructor();
```

### underlyingTokens


```solidity
function underlyingTokens() public view override returns (IERC20, IERC20);
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
function getReserves() public view returns (uint112 _reserveXAssets, uint112 _reserveYAssets, uint256 _lastTimestamp);
```

### totalAssets

Computes the current total Assets.

*If the last lending state update is outdated (i.e., not matching the current block timestamp),
the function recalculates the assets based on the duration since the last update, the lending state,
and reserve balances. If the timestamp is current, the previous asset (without recalculation) is returned.*


```solidity
function totalAssets(
    uint256 tokenType
) public view returns (uint128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenType`|`uint256`|The type of token for which the assets is being computed. Can be one of BORROW_X, DEPOSIT_X, BORROW_Y, DEPOSIT_Y, BORROW_L, or DEPOSIT_L.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint128`|totalAssets The computed scaling factor, adjusted if necessary based on the time elapsed since the last update.|


### getAssets


```solidity
function getAssets(uint256 tokenType, address toCheck) internal view returns (uint256);
```

### updateTokenController


```solidity
function updateTokenController(
    uint256 duration,
    uint256 _reserveXAssets,
    uint256 _reserveYAssets
) internal returns (uint112 updatedReservesX, uint112 updatedReservesY);
```

### mintProtocolFees


```solidity
function mintProtocolFees(uint256 tokenType, address feeTo, uint256 protocolFee) private;
```

### updateReserves


```solidity
function updateReserves(uint256 _reserveXAssets, uint256 _reserveYAssets) internal;
```

### updateReservesAndLiquidity


```solidity
function updateReservesAndLiquidity(uint256 _reserveXAssets, uint256 _reserveYAssets) internal;
```

### _updateLastLiquidity


```solidity
function _updateLastLiquidity(uint256 _reservesX, uint256 _reservesY) private;
```

### _castReserves


```solidity
function _castReserves(uint256 _reserveXAssets, uint256 _reserveYAssets) private pure returns (uint112, uint112);
```

### _updateReserves


```solidity
function _updateReserves(uint112 _reserveXAssets, uint112 _reserveYAssets) private;
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


```solidity
function getDepositAndBorrowAndActiveLiquidityAssets()
    internal
    view
    returns (uint256 depositLiquidityAssets, uint256 borrowLAssets, uint256 activeLiquidityAssets);
```

### getLastAndCurrentLiquidity


```solidity
function getLastAndCurrentLiquidity(
    uint256 _reserveXAssets,
    uint256 _reserveYAssets
) private view returns (uint256 _lastLiquidity, uint256 currentLiquidity);
```

## Errors
### TokenCreationFailure

```solidity
error TokenCreationFailure();
```

## Structs
### TokenData

```solidity
struct TokenData {
    IERC20 tokenX;
    IERC20 tokenY;
    IAmmalgamERC20 tokenDepositL;
    IAmmalgamERC20 tokenDepositX;
    IAmmalgamERC20 tokenDepositY;
    IAmmalgamERC20 tokenBorrowL;
    IAmmalgamERC20 tokenBorrowX;
    IAmmalgamERC20 tokenBorrowY;
}
```

