# IHookRegistry
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/4ed3f1084ef4b5c994f2270ef9139e3c029cb627/contracts/interfaces/tokens/IHookRegistry.sol)


## Functions
### updateHook

This function is restricted to the owner of the contract.

*Updates the allowed status of a hook.*

*Emits no events.*


```solidity
function updateHook(address hook, bool allowed) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The address of the hook to be updated.|
|`allowed`|`bool`|A boolean value indicating whether the hook should be allowed (true) or disallowed (false).|


### isHookAllowed

*Checks if a hook is allowed.*

*This function is a view function and does not alter state.*


```solidity
function isHookAllowed(
    address hook
) external view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The address of the hook to check.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|A boolean value indicating whether the hook is allowed (true) or disallowed (false).|


