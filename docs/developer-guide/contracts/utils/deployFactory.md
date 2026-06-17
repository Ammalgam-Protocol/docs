# function deployFactory
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/704e13b16c0d3807131b6b753ca6085c1fab3045/contracts/utils/deployHelper.sol)

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

