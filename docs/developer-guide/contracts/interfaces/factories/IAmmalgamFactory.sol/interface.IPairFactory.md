# IPairFactory
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/82dff11576b9df76b675736dba889653cf737de9/contracts/interfaces/factories/IAmmalgamFactory.sol)

An interface to minimize code around the AmmalgamPair creation due to
its large size.


## Functions
### createPair


```solidity
function createPair(
    bytes32 salt
) external returns (address pair);
```

