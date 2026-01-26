# IBeaconCallback
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/308b70cbaad52276d27a3a7c1a1e210d635ddff3/contracts/interfaces/factories/IAmmalgamFactory.sol)


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


