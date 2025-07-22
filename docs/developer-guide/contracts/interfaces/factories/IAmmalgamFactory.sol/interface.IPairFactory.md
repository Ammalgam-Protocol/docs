# IPairFactory
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/0225322e5b1d4d1ce3ec3ffc220dfd4d8afaf521/contracts/interfaces/factories/IAmmalgamFactory.sol)

An interface to minimize code around the AmmalgamPair creation due to
its large size.


## Functions
### createPair


```solidity
function createPair(
    bytes32 salt
) external returns (address pair);
```

