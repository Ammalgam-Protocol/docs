# IPairFactory
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/b02f234f650997c7e7f19495c04e5606555377fd/contracts/interfaces/factories/IAmmalgamFactory.sol)

An interface to minimize code around the AmmalgamPair creation due to
its large size.


## Functions
### createPair


```solidity
function createPair(
    bytes32 salt
) external returns (address pair);
```

