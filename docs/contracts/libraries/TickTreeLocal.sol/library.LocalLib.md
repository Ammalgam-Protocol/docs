# LocalLib
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/922bb12a291a5f6729dd85abc24fc6fec504a108/contracts/libraries/TickTreeLocal.sol)


## State Variables
### ROOT_BITS

```solidity
uint256 private constant ROOT_BITS = 2;
```


### LEVEL_BITS

```solidity
uint256 private constant LEVEL_BITS = 64;
```


### BIN_POS_IN_LEAF_BITS

```solidity
uint256 private constant BIN_POS_IN_LEAF_BITS = 2;
```


### ROOT_BEFORE

```solidity
uint256 private constant ROOT_BEFORE = 0;
```


### LEVEL1_BEFORE

```solidity
uint256 private constant LEVEL1_BEFORE = ROOT_BEFORE + ROOT_BITS;
```


### LEVEL2_BEFORE

```solidity
uint256 private constant LEVEL2_BEFORE = LEVEL1_BEFORE + LEVEL_BITS;
```


### LEVEL3_BEFORE

```solidity
uint256 private constant LEVEL3_BEFORE = LEVEL2_BEFORE + LEVEL_BITS;
```


### BIN_POS_IN_LEAF_BEFORE

```solidity
uint256 private constant BIN_POS_IN_LEAF_BEFORE = LEVEL3_BEFORE + LEVEL_BITS;
```


### ROOT_MASK

```solidity
uint256 internal constant ROOT_MASK = (ONES >> (256 - ROOT_BITS)) << ROOT_BEFORE;
```


### LEVEL1_MASK

```solidity
uint256 internal constant LEVEL1_MASK = (ONES >> (256 - LEVEL_BITS)) << LEVEL1_BEFORE;
```


### LEVEL2_MASK

```solidity
uint256 internal constant LEVEL2_MASK = (ONES >> (256 - LEVEL_BITS)) << LEVEL2_BEFORE;
```


### LEVEL3_MASK

```solidity
uint256 internal constant LEVEL3_MASK = (ONES >> (256 - LEVEL_BITS)) << LEVEL3_BEFORE;
```


### BIN_POS_IN_LEAF_MASK

```solidity
uint256 internal constant BIN_POS_IN_LEAF_MASK = (ONES >> (256 - BIN_POS_IN_LEAF_BITS)) << BIN_POS_IN_LEAF_BEFORE;
```


### ROOT_MASK_INV

```solidity
uint256 private constant ROOT_MASK_INV = ~ROOT_MASK;
```


### LEVEL1_MASK_INV

```solidity
uint256 private constant LEVEL1_MASK_INV = ~LEVEL1_MASK;
```


### LEVEL2_MASK_INV

```solidity
uint256 private constant LEVEL2_MASK_INV = ~LEVEL2_MASK;
```


### LEVEL3_MASK_INV

```solidity
uint256 private constant LEVEL3_MASK_INV = ~LEVEL3_MASK;
```


### BIN_POS_IN_LEAF_MASK_INV

```solidity
uint256 private constant BIN_POS_IN_LEAF_MASK_INV = ~BIN_POS_IN_LEAF_MASK;
```


## Functions
### root


```solidity
function root(Local local) internal pure returns (Field);
```

### setRoot


```solidity
function setRoot(Local local, Field val) internal pure returns (Local);
```

### level1


```solidity
function level1(Local local) internal pure returns (Field);
```

### setLevel1


```solidity
function setLevel1(Local local, Field val) internal pure returns (Local);
```

### level2


```solidity
function level2(Local local) internal pure returns (Field);
```

### setLevel2


```solidity
function setLevel2(Local local, Field val) internal pure returns (Local);
```

### level3


```solidity
function level3(Local local) internal pure returns (Field);
```

### setLevel3


```solidity
function setLevel3(Local local, Field val) internal pure returns (Local);
```

### binPosInLeaf


```solidity
function binPosInLeaf(Local local) internal pure returns (uint256);
```

### setBinPosInLeaf


```solidity
function setBinPosInLeaf(Local local, uint256 val) internal pure returns (Local);
```

