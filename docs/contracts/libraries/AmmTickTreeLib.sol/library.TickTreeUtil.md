# TickTreeUtil
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/922bb12a291a5f6729dd85abc24fc6fec504a108/contracts/libraries/AmmTickTreeLib.sol)


## Functions
### setBit


```solidity
function setBit(Field field, uint256 pos) public pure returns (Field);
```

### unsetBit


```solidity
function unsetBit(Field field, uint256 pos) public pure returns (Field);
```

### isBitSet


```solidity
function isBitSet(Field field, uint256 pos) public pure returns (bool);
```

### level1IndexFromRootPos


```solidity
function level1IndexFromRootPos(uint256 pos) public pure returns (int256);
```

### level2IndexFromLevel1IndexAndPos


```solidity
function level2IndexFromLevel1IndexAndPos(int256 level1Index, uint256 pos) public pure returns (int256);
```

### level3IndexFromLevel2IndexAndPos


```solidity
function level3IndexFromLevel2IndexAndPos(int256 level2Index, uint256 pos) public pure returns (int256);
```

### leafIndexFromLevel3IndexAndPos


```solidity
function leafIndexFromLevel3IndexAndPos(int256 level3Index, uint256 pos) public pure returns (int256);
```

### binFromLeafIndexAndPos


```solidity
function binFromLeafIndexAndPos(int256 leafIndex, uint256 pos) public pure returns (Bin);
```

