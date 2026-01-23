# IBeaconCallback
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/2ced318822dafebfff7d67fabcd7025224bffea6/contracts/interfaces/factories/IAmmalgamFactory.sol)


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


