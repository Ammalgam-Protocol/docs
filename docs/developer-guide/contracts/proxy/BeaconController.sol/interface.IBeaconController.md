# IBeaconController
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/e7d678e55cb2292e97adbe9762d6006ba7739179/contracts/proxy/BeaconController.sol)


## Functions
### upgradeTo

a wrapper around UpgradeableBeacon to delegate to its upgradeTo function.


```solidity
function upgradeTo(
    address implementation
) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`implementation`|`address`|the new implementation address to set in the beacon.|


### upgradeToAllowed

allows upgrades to a set of pre-approved implementations only with different
privileges than upgradeTo.


```solidity
function upgradeToAllowed(
    address implementation
) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`implementation`|`address`|the new implementation address to set in the beacon.|


### allowedList

gets the list of allowed implementations for emergency upgrades.


```solidity
function allowedList() external view returns (address[] memory);
```

### addToAllowedList

adds an implementation to the allowed list.


```solidity
function addToAllowedList(
    address implementation
) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`implementation`|`address`|the implementation address to add.|


### removeFromAllowedList

removes an implementation from the allowed list.


```solidity
function removeFromAllowedList(
    address implementation
) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`implementation`|`address`|the implementation address to remove.|


