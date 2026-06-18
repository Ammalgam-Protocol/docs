# Uint16Set
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/a0b9995bda8dd0ed6d91e1e89a251ac412f67e6e/contracts/libraries/Uint16Set.sol)

based on https://github.com/rob-Hitchens/SetTypes/blob/master/contracts/UintSet.sol

Key sets with enumeration and delete. Uses mappings for random
and existence checks and dynamic arrays for enumeration. Key uniqueness is enforced.

*Sets are unordered. Delete operations reorder keys. All operations have a
fixed gas cost at any scale, O(1).
author: Rob Hitchens*


## Functions
### insert

insert a key.

*duplicate keys are not permitted.*


```solidity
function insert(Set storage self, uint16 key) internal returns (bool keyAlreadyExists);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Set`|storage pointer to a Set.|
|`key`|`uint16`|value to insert.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`keyAlreadyExists`|`bool`|whether the key already existed in the set|


### remove

remove a key.

*If the key does not exist, this function is a no-op and returns true.*


```solidity
function remove(Set storage self, uint16 key) internal returns (bool isSetEmpty);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Set`|storage pointer to a Set.|
|`key`|`uint16`|value to remove.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`isSetEmpty`|`bool`|whether the key did not exist or the set still has items after removal|


### count

count the keys.


```solidity
function count(
    Set storage self
) internal view returns (uint16);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Set`|storage pointer to a Set.|


### exists

check if a key is in the Set.


```solidity
function exists(Set storage self, uint16 key) internal view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Set`|storage pointer to a Set.|
|`key`|`uint16`|value to check.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|bool true: Set member, false: not a Set member.|


## Structs
### Set

```solidity
struct Set {
    mapping(uint16 => uint16) keyPointers;
    uint16[] keyList;
}
```

