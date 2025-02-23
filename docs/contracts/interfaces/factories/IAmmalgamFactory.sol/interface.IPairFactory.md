# IPairFactory
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/083c00a2031e49494b12e5e222d9534812423631/contracts/interfaces/factories/IAmmalgamFactory.sol)

An interface to minimize code around the AmmalgamPair creation due to
its large size.


## Functions
### createPair


```solidity
function createPair(
    bytes32 salt
) external returns (address pair);
```

