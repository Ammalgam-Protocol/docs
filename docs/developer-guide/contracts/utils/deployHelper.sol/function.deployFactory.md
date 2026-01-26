# function deployFactory
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/a53036dd4623a656dddbba6a08d5e0f56669e6c5/contracts/utils/deployHelper.sol)

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

