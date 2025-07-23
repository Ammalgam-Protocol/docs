# IPairFactory
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/a28e502b1e8800dac8120731b7ed6f1fd472b8a7/contracts/interfaces/factories/IAmmalgamFactory.sol)

An interface to minimize code around the AmmalgamPair creation due to
its large size.


## Functions
### createPair


```solidity
function createPair(
    bytes32 salt
) external returns (address pair);
```

