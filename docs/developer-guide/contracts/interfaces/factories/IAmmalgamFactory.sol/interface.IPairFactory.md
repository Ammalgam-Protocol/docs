# IPairFactory
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/85df9cff0e774de8aef6efe8ec7df8cd94f03568/contracts/interfaces/factories/IAmmalgamFactory.sol)

An interface to minimize code around the AmmalgamPair creation due to
its large size.


## Functions
### createPair


```solidity
function createPair(
    bytes32 salt
) external returns (address pair);
```

