# MathLib
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/922bb12a291a5f6729dd85abc24fc6fec504a108/contracts/libraries/MathLib.sol)

This file is a modified version of MathLib.sol from the Morpho-Blue project.
Original source: https://github.com/morpho-org/morpho-blue/blob/main/src/libraries/MathLib.sol
Licensed under GPL-2.0-or-later.


## Functions
### wMulDown

*Returns (`x` * `y`) / `WAD` rounded down.*


```solidity
function wMulDown(uint256 x, uint256 y) internal pure returns (uint256);
```

### wMulUp


```solidity
function wMulUp(uint256 x, uint256 y) internal pure returns (uint256);
```

### wDivDown

*Returns (`x` * `WAD`) / `y` rounded down.*


```solidity
function wDivDown(uint256 x, uint256 y) internal pure returns (uint256);
```

### wDivUp

*Returns (`x` * `WAD`) / `y` rounded up.*


```solidity
function wDivUp(uint256 x, uint256 y) internal pure returns (uint256);
```

### mulDivDown

*Returns (`x` * `y`) / `d` rounded down.*


```solidity
function mulDivDown(uint256 x, uint256 y, uint256 d) internal pure returns (uint256);
```

### mulDivUp

*Returns (`x` * `y`) / `d` rounded up.*


```solidity
function mulDivUp(uint256 x, uint256 y, uint256 d) internal pure returns (uint256);
```

### wTaylorCompounded

*Returns the sum of the first three non-zero terms of a Taylor expansion of e^(nx) - 1, to approximate a
continuous compound interest rate.*


```solidity
function wTaylorCompounded(uint256 x, uint256 n) internal pure returns (uint256);
```

