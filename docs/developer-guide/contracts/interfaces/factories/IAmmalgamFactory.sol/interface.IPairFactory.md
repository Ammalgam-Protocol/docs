# IPairFactory
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/777758268663000ff55bdeeb52b3c5eebb91dd7f/contracts/interfaces/factories/IAmmalgamFactory.sol)

An interface to minimize code around the AmmalgamPair creation due to
its large size.


## Functions
### createPair


```solidity
function createPair(
    bytes32 salt
) external returns (address pair);
```

