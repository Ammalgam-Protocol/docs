# Constants
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/6e61b51e90091137f7e2abb147c11731a6d4681e/contracts/libraries/constants.sol)

### LENDING_TICK_NOT_AVAILABLE
*Represents the absence of a valid lending tick, initialized to `int16` minimum value since type(int16).min < MIN_TICK*


```solidity
int16 constant LENDING_TICK_NOT_AVAILABLE = type(int16).min;
```

### ZERO_ADDRESS

```solidity
address constant ZERO_ADDRESS = address(0);
```

### Q32
*used to store the timestamp as a uint32.*


```solidity
uint256 constant Q32 = 1 << 32;
```

### Q64
*used to store the timestamp as a uint64.*


```solidity
uint256 constant Q64 = 1 << 64;
```

### Q128
*used to represent values that could be smaller than 1*


```solidity
uint256 constant Q128 = 1 << 128;
```

### DEFAULT_MID_TERM_INTERVAL
*Default mid-term interval config used at the time of GeometricTWAP initialization.*


```solidity
uint16 constant DEFAULT_MID_TERM_INTERVAL = 12;
```

### DEFAULT_LONG_TERM_BUFFER_FACTOR
*Default long-term buffer factor used at the time of GeometricTWAP initialization.*


```solidity
uint24 constant DEFAULT_LONG_TERM_BUFFER_FACTOR = 1;
```

### MAX_TICK_DELTA
*`MAX_TICK_DELTA` limits the `newTick` to be within the outlier range of the current mid-term price.*


```solidity
int256 constant MAX_TICK_DELTA = 10;
```

### DEFAULT_TICK_DELTA_FACTOR
*`DEFAULT_TICK_DELTA_FACTOR` is used when the long-term buffer is initialised.*


```solidity
int256 constant DEFAULT_TICK_DELTA_FACTOR = 1;
```

### MAG2

```solidity
uint256 constant MAG2 = 100;
```

### LTVMAX_IN_MAG2

```solidity
uint256 constant LTVMAX_IN_MAG2 = 75;
```

### LTVMAX_PLUS_ONE_IN_MAG2_Q128

```solidity
uint256 constant LTVMAX_PLUS_ONE_IN_MAG2_Q128 = ((LTVMAX_IN_MAG2 + MAG2) * Q128) / MAG2;
```

### ALLOWED_LIQUIDITY_LEVERAGE

```solidity
uint256 constant ALLOWED_LIQUIDITY_LEVERAGE = 100;
```

### SWAP_FEE

```solidity
uint256 constant SWAP_FEE = 3;
```

