# IBeaconCallback
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/27b7e0cf8dd31e42b89a491c679d5a6c1b6818c1/contracts/interfaces/factories/IAmmalgamFactory.sol)


## Functions
### pairBeacon

Returns the public immutable address of the pair beacon contract. Used as a callback
in the creation of a new pair to ensure we can maintain the create2 deterministic address
that also require no args in the constructor.


```solidity
function pairBeacon() external view returns (IBeacon beacon);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`beacon`|`IBeacon`|The address of the pair beacon.|


