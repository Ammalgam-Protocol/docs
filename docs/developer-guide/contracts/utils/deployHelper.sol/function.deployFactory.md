# function deployFactory
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/db1bd664139b76231c80c884ad98cd40352ccebf/contracts/utils/deployHelper.sol)

### deployFactory(address)

```solidity
function deployFactory(
    address deployer
) returns (AmmalgamFactory, TimelockController);
```

### deployFactory(address, TimelockController, IAmmalgamPair, ISaturationAndGeometricTWAPState)

```solidity
function deployFactory(
    address deployer,
    TimelockController timelock,
    IAmmalgamPair pairImplementation,
    ISaturationAndGeometricTWAPState satProxy
) returns (AmmalgamFactory, TimelockController);
```

