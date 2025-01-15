# Constants
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/a776754587e2530d31f83af30e82bc8095fad927/contracts/libraries/constants.sol)

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

### Q128
*used to represent values that could be smaller than 1*


```solidity
uint256 constant Q128 = 1 << 128;
```

### DEFAULT_MID_TERM_INTERVAL
*Default mid-term interval config used at the time of GeometricTWAP initialization.*


```solidity
uint24 constant DEFAULT_MID_TERM_INTERVAL = 12;
```

### DEFAULT_LONG_TERM_BUFFER_FACTOR
*Default long-term buffer factor used at the time of GeometricTWAP initialization.*


```solidity
uint24 constant DEFAULT_LONG_TERM_BUFFER_FACTOR = 1;
```

