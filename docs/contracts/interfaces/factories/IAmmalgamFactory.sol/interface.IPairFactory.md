# IPairFactory
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/922bb12a291a5f6729dd85abc24fc6fec504a108/contracts/interfaces/factories/IAmmalgamFactory.sol)

An interface to minimize code around the AmmalgamPair creation due to
its large size.


## Functions
### createPair


```solidity
function createPair(bytes32 salt) external returns (address pair);
```

