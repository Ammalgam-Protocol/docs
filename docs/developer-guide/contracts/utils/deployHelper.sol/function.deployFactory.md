# function deployFactory
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/31f1fe876c540cfaa9a5decb545c6fce5714e157/contracts/utils/deployHelper.sol)

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

