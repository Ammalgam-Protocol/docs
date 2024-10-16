# Constants
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/922bb12a291a5f6729dd85abc24fc6fec504a108/contracts/libraries/constants.sol)

### MIN_TICK
*The minimum tick that may be passed to #getSqrtRatioAtTick computed from log base 1.0001 of 2**-128*


```solidity
int24 constant MIN_TICK = -887_272;
```

### MAX_TICK
*The maximum tick that may be passed to #getSqrtRatioAtTick computed from log base 1.0001 of 2**128*


```solidity
int24 constant MAX_TICK = -MIN_TICK;
```

### LENDING_TICK_NOT_AVAILABLE
*Represents the absence of a valid lending tick, initialized to `int24` minimum value.*


```solidity
int24 constant LENDING_TICK_NOT_AVAILABLE = type(int24).min;
```

### ZERO_ADDRESS

```solidity
address constant ZERO_ADDRESS = address(0);
```

