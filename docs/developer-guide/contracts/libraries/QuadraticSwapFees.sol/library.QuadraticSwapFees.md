# QuadraticSwapFees
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/a28e502b1e8800dac8120731b7ed6f1fd472b8a7/contracts/libraries/QuadraticSwapFees.sol)

**Author:**
Will

A library to calculate fees that grow quadratically with respect to price, square root
price to be exact. This library relies on a reference reserve from the start of the block to
determine what the overall growth in price has been in the current block. If one swap were to
pay one fee, that same swap broken into two swaps would pay two fees that would add up to the
one. If the price moves away from the reserve, and then back towards the reserve, the fee is
minimal until the price again crosses the starting price.


## State Variables
### MIN_FEE_Q64
Minimum fee is one tenth of a basis point.


```solidity
uint256 public constant MIN_FEE_Q64 = 0x1999999999999999;
```


### BIPS_Q64
10000 bips per 100 percent in Q64.


```solidity
uint256 public constant BIPS_Q64 = 0x27100000000000000000;
```


### MAX_QUADRATIC_FEE_PERCENT
Max percent fee growing at a quadratic rate. After this the growths slows down.


```solidity
uint256 internal constant MAX_QUADRATIC_FEE_PERCENT = 40;
```


### N
A scaler that controls how fast the fee grows, at 20, 9x price change will be
a 40% fee.


```solidity
uint256 internal constant N = 20;
```


### LINEAR_START_REFERENCE_SCALER
the $$\sqrt{price}$$ at which we switch from quadratic fee to a more linear fee.
```math
(MAX\_QUADRATIC\_FEE\_PERCENT + N) / N
```


```solidity
uint256 private constant LINEAR_START_REFERENCE_SCALER = 3;
```


### MAX_QUADRATIC_FEE_PERCENT_BIPS
the fee at `LINEAR_START_REFERENCE_SCALER` in bips


```solidity
uint256 private constant MAX_QUADRATIC_FEE_PERCENT_BIPS = 4000;
```


### N_TIMES_BIPS_Q64_PER_PERCENT
$$ N * 100 * Q64 $$ or `N` times bips in one percent in Q64


```solidity
uint256 private constant N_TIMES_BIPS_Q64_PER_PERCENT = 0x7d00000000000000000;
```


### TWO_Q64
2 times Q64 or Q65


```solidity
uint256 private constant TWO_Q64 = 0x20000000000000000;
```


### MAX_QUADRATIC_FEE_Q64
`MAX_QUADRATIC_FEE_PERCENT` in Q64, $$ MAX_QUADRATIC_FEE_PERCENT * Q64 $$


```solidity
uint256 private constant MAX_QUADRATIC_FEE_Q64 = 0x280000000000000000;
```


## Functions
### calculateSwapFeeBipsQ64

Returns a swap fee given the current reserve reference.


```solidity
function calculateSwapFeeBipsQ64(
    uint256 input,
    uint256 referenceReserve,
    uint256 currentReserve
) internal pure returns (uint256 fee);
```

