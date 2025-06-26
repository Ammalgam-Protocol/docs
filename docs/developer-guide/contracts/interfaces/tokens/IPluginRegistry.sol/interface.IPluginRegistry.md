# IPluginRegistry
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/6e61b51e90091137f7e2abb147c11731a6d4681e/contracts/interfaces/tokens/IPluginRegistry.sol)


## Functions
### updatePlugin

This function is restricted to the owner of the contract.

*Updates the allowed status of a plugin.*

*Emits no events.*


```solidity
function updatePlugin(address plugin, bool allowed) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`plugin`|`address`|The address of the plugin to be updated.|
|`allowed`|`bool`|A boolean value indicating whether the plugin should be allowed (true) or disallowed (false).|


### isPluginAllowed

*Checks if a plugin is allowed.*

*This function is a view function and does not alter state.*


```solidity
function isPluginAllowed(
    address plugin
) external view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`plugin`|`address`|The address of the plugin to check.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|A boolean value indicating whether the plugin is allowed (true) or disallowed (false).|


