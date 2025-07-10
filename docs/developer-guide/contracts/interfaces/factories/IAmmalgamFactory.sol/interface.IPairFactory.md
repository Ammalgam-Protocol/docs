# IPairFactory
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/975f0ea3593c2ebbbad06ad90ec03f0a7b68c3e0/contracts/interfaces/factories/IAmmalgamFactory.sol)

An interface to minimize code around the AmmalgamPair creation due to
its large size.


## Functions
### createPair


```solidity
function createPair(
    bytes32 salt
) external returns (address pair);
```

