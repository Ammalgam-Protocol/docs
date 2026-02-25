# function deployFactory
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/813486beee52ccd2d7f0a918e1a9e5153de55f0f/contracts/utils/deployHelper.sol)

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

