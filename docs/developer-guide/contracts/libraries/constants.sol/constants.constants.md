# Constants
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/293918265c3eb930cc655bff0a30fa632ec63bd3/contracts/libraries/constants.sol)

### B_IN_Q72
*This basis was a modification to Uniswap V3's basis, to fit ticks into int16 instead of
int24. We use the form $$\frac{2^{9}}{2^{9}-1}$$ which is just under 1.002. This basis
format gives smaller errors since the fraction is more compatible with binary Q128
fractions since the base is inverted in the tick math library before multiplications are
applied.
```math
\begin{align*}
&   \frac{2^{9}}{2^{9}-1}^{-1} \cdot 2^{128}
& & \frac{10001}{10000}^{-1} \cdot 2^{128}
\\
&   \frac{2^{9}-1}{2^{9}} \cdot 2^{256}
& & \frac{10000\cdot2^{256}}{10001}
\\
&   339617752923046005526922703901628039168
& & \frac{3402823669209384634633746074317682114560000}{10001}
\\
&   0xff800000000000000000000000000000
& & 0xfffcb933bd6fad37aa2d162d1a594001
\\
\end{align*}
```
We use this constant outside of the tick math library, and use a Q72 as that format is
easier to work with multiplication without overflows.
```python
>>> hex(int(mpm.nint(mpm.fdiv(2**9, 2**9-1) * 2**72)))
```*


```solidity
uint256 constant B_IN_Q72 = 0x1008040201008040201;
```

### TRANCHE_B_IN_Q72
*In Saturation we combine 25 ticks to make one tranche.
```python
>>> hex(int(mpm.nint(mpm.fdiv(2**9, 2**9-1)**25 * 2**72)))
```*


```solidity
uint256 constant TRANCHE_B_IN_Q72 = 0x10cd2b2ae53a69d3552;
```

### TRANCHE_B_MINUS_ONE_IN_Q72
*B - 1 or `TRANCHE_B_IN_Q72 - Q72`.*


```solidity
uint256 constant TRANCHE_B_MINUS_ONE_IN_Q72 = 0xcd2b2ae53a69d3552;
```

### FRAGILE_LIQUIDITY_DECREMENT_PERCENTAGE
*We decrement the active liquidity used to measure available saturation by this
percentage of fragile liquidity, or liquidity that has some amount of x or y borrowed
against it. Reducing by 100% would ensure that that fragile liquidity could always be
liquidated since burning it would not decrease the saturation. However, this also means
that fragile liquidity adds no value to the risk of the pool, even if it may not be
liquidated until after risk closer to the price. This value also ensures that recursively
leveraging large amounts of x and y against liquidity can not allow more debt to be
borrowed then the underlying stable liquidity not at risk of being seized and burned
during liquidation. Crediting 10% of the fragile liquidity is a compromise to allow some
benefit of leveraged liquidity to increase borrowing capacity without allowing for it to
be vulnerable to allow excessive borrowing.*


```solidity
uint256 constant FRAGILE_LIQUIDITY_DECREMENT_PERCENTAGE = 95;
```

### EXPECTED_SATURATION_LTV_MAG2
*The amount of LTV we expect liquidations to occur at*


```solidity
uint256 constant EXPECTED_SATURATION_LTV_MAG2 = 85;
```

### MAX_SATURATION_RATIO_IN_MAG2
*percentage of max sat per tranche considered healthy; max sat per
tranche is $$liquidity \frac{B-1}{2}$$ with B the tranche basis, which is the max
sat such that the liquidation would not cause a swap larger than a tranche*


```solidity
uint256 constant MAX_SATURATION_RATIO_IN_MAG2 = 95;
```

### LENDING_TICK_NOT_AVAILABLE
*Represents the absence of a valid lending tick, initialized to `int16` minimum value since a
`type(int16).min < MIN_TICK`.*


```solidity
int16 constant LENDING_TICK_NOT_AVAILABLE = type(int16).min;
```

### ZERO_ADDRESS
*the default zero address*


```solidity
address constant ZERO_ADDRESS = address(0);
```

### Q16
*2**16*


```solidity
uint256 constant Q16 = 0x10000;
```

### Q32
*2**32*


```solidity
uint256 constant Q32 = 0x100000000;
```

### Q56
*2**56.*


```solidity
uint256 constant Q56 = 0x100000000000000;
```

### Q64
*2**64.*


```solidity
uint256 constant Q64 = 0x10000000000000000;
```

### Q72
*2**72.*


```solidity
uint256 constant Q72 = 0x1000000000000000000;
```

### Q88
*2**88.*


```solidity
uint256 constant Q88 = 0x10000000000000000000000;
```

### Q112
*2**112.*


```solidity
uint256 constant Q112 = 0x10000000000000000000000000000;
```

### Q128
*2**128.*


```solidity
uint256 constant Q128 = 0x100000000000000000000000000000000;
```

### Q144
*2**144.*


```solidity
uint256 constant Q144 = 0x1000000000000000000000000000000000000;
```

### Q200
*2**200.*


```solidity
uint256 constant Q200 = 0x100000000000000000000000000000000000000000000000000;
```

### BIPS
*number of bips in 1, 1 bips = 0.01%.*


```solidity
uint256 constant BIPS = 10_000;
```

### INITIAL_LENDING_FEE_BIPS
*Initial fee applied to all newly opened debts and flash loans. This upfront fee prevents
griefing attacks via "dust" positions—small debts that would be unprofitable for liquidators to close.
The fee accumulates in the protocol, creating an economic incentive to liquidate these positions
if they become eligible for liquidation.
5 bips = 0.05%.*


```solidity
uint256 constant INITIAL_LENDING_FEE_BIPS = 5;
```

### DEFAULT_MID_TERM_INTERVAL
*Default mid-term interval config used at the time of GeometricTWAP initialization.*


```solidity
uint16 constant DEFAULT_MID_TERM_INTERVAL = 8;
```

### MINIMUM_LIQUIDITY
*minimum liquidity to initialize a pool, amount is burned to eliminate the threat of
donation attacks.*


```solidity
uint256 constant MINIMUM_LIQUIDITY = 1000;
```

### MINIMUM_LONG_TERM_TIME_UPDATE_CONFIG
*Represents the minimum time period required between recorded long-term intervals.
Calculated as the product of `DEFAULT_MID_TERM_INTERVAL` and `GeometricTWAP.
MINIMUM_LONG_TERM_INTERVAL_FACTOR`.*


```solidity
uint24 constant MINIMUM_LONG_TERM_TIME_UPDATE_CONFIG = 112;
```

### MAX_TICK_DELTA
*`MAX_TICK_DELTA` limits the `newTick` to be within the outlier range of the current mid-term price.*


```solidity
int256 constant MAX_TICK_DELTA = 10;
```

### DEFAULT_TICK_DELTA_FACTOR
*`DEFAULT_TICK_DELTA_FACTOR` is used when the long-term buffer is initialized.*


```solidity
int256 constant DEFAULT_TICK_DELTA_FACTOR = 1;
```

### LTVMAX_IN_MAG2
*the system loan to value minimum, 75% * 100.*


```solidity
uint256 constant LTVMAX_IN_MAG2 = 75;
```

### ALLOWED_LIQUIDITY_LEVERAGE
*the system allowed leverage exposures with similar underlying assets, ie L is half X and
half Y, so we allow 100X leverage of borrowed X and Y against L.*


```solidity
uint256 constant ALLOWED_LIQUIDITY_LEVERAGE = 100;
```

### ALLOWED_LIQUIDITY_LEVERAGE_MINUS_ONE
*Allowed leverage minus one.*


```solidity
uint256 constant ALLOWED_LIQUIDITY_LEVERAGE_MINUS_ONE = 99;
```

### N_TIMES_FEE
*constant used in Quadratic swap fees that controls the speed at which fees increase with
respect to the price change.*


```solidity
uint256 constant N_TIMES_FEE = 20;
```

### MAG1
*Magnitude 1*


```solidity
uint256 constant MAG1 = 10;
```

### MAG2
*Magnitude 2*


```solidity
uint256 constant MAG2 = 100;
```

### MAG4
*Magnitude 4*


```solidity
uint256 constant MAG4 = 10_000;
```

### MAG6
*Magnitude 6*


```solidity
uint256 constant MAG6 = 1_000_000;
```

### SAT_PERCENTAGE_DELTA_4_WAD
*Saturation percentages in WADs*


```solidity
uint256 constant SAT_PERCENTAGE_DELTA_4_WAD = 94.1795538580338563e16;
```

### SAT_PERCENTAGE_DELTA_5_WAD

```solidity
uint256 constant SAT_PERCENTAGE_DELTA_5_WAD = 92.3156868017020937e16;
```

### SAT_PERCENTAGE_DELTA_6_WAD

```solidity
uint256 constant SAT_PERCENTAGE_DELTA_6_WAD = 90.4887067368814135e16;
```

### SAT_PERCENTAGE_DELTA_7_WAD

```solidity
uint256 constant SAT_PERCENTAGE_DELTA_7_WAD = 88.6978836489829983e16;
```

### SAT_PERCENTAGE_DELTA_DEFAULT_WAD

```solidity
uint256 constant SAT_PERCENTAGE_DELTA_DEFAULT_WAD = 95e16;
```

### LIQUIDITY_INTEREST_RATE_MAGNIFICATION

```solidity
uint256 constant LIQUIDITY_INTEREST_RATE_MAGNIFICATION = 5;
```

### MAX_SATURATION_PERCENT_IN_WAD
*Maximum percentage for the saturation allowed, used to limit the maximum saturation per tranche.*


```solidity
uint256 constant MAX_SATURATION_PERCENT_IN_WAD = 0.95e18;
```

### MAX_UTILIZATION_PERCENT_IN_WAD
*Maximum percentage for the utilization allowed.*


```solidity
uint256 constant MAX_UTILIZATION_PERCENT_IN_WAD = 0.9e18;
```

### SECONDS_IN_YEAR

```solidity
uint256 constant SECONDS_IN_YEAR = 365 days;
```

### INTEREST_PERIOD_FOR_SWAP
*The interval for swap to check borrowed interest to update reserves.
Updating once a day would limit rate change in price to 0.003% if one reserve
had max interest and the other had none.
It also would require 40 days to go from 94% depletion to 95% depletion.
ref: https://www.desmos.com/calculator/sxfc3tcz8c*


```solidity
uint32 constant INTEREST_PERIOD_FOR_SWAP = 1 days - 1;
```

### DEFAULT_INTEREST_PERIOD
*The interval for non-swap to check borrowed interest to update reserves.*


```solidity
uint32 constant DEFAULT_INTEREST_PERIOD = 0;
```

### BUFFER
*Buffer ratio at which lending of the scarce asset stops.
Derived from 95 / 5.*


```solidity
uint256 constant BUFFER = 19;
```

### BUFFER_NUMERATOR
*Numerator buffer used for depleted-asset threshold calculations.
Derived from 100 / 5.*


```solidity
uint256 constant BUFFER_NUMERATOR = 20;
```

### BUFFER_OBS
*Observation buffer used when computing the new tick from reserves.
Derived from 45 / 5.*


```solidity
uint256 constant BUFFER_OBS = 9;
```

### BUFFER_OBS_NUMERATOR
*Observation buffer numerator used for depleted-asset threshold calculations.
Derived from 50 / 5.*


```solidity
uint256 constant BUFFER_OBS_NUMERATOR = 10;
```

### INDEX_FULL_IMPL
*index implementation for default full functionality*


```solidity
uint256 constant INDEX_FULL_IMPL = 0;
```

### INDEX_LOCKED_LOANS
*index implementation that locks borrowing, withdrawing, burning, except liquidation*


```solidity
uint256 constant INDEX_LOCKED_LOANS = 1;
```

### INDEX_BLOCK_ALL_TRANSFERS
*index implementation that blocks all transfers:  withdraw, burn, borrow and liquidation*


```solidity
uint256 constant INDEX_BLOCK_ALL_TRANSFERS = 2;
```

### INDEX_FROZEN
*index implementation that freezes any function calling the pair: mints, swaps, ..etc*


```solidity
uint256 constant INDEX_FROZEN = 3;
```

