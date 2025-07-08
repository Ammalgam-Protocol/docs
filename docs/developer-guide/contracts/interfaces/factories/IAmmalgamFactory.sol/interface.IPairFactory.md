# IPairFactory
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/bbf468c990ab84694ca54d6197acec418d42c187/contracts/interfaces/factories/IAmmalgamFactory.sol)

An interface to minimize code around the AmmalgamPair creation due to
its large size.


## Functions
### createPair


```solidity
function createPair(
    bytes32 salt
) external returns (address pair);
```

