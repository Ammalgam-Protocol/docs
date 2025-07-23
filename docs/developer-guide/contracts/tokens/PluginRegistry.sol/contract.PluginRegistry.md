# PluginRegistry
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/a28e502b1e8800dac8120731b7ed6f1fd472b8a7/contracts/tokens/PluginRegistry.sol)

**Inherits:**
[IPluginRegistry](/docs/developer-guide/contracts/interfaces/tokens/IPluginRegistry.sol/interface.IPluginRegistry.md), Ownable


## State Variables
### allowedPlugins

```solidity
mapping(address => bool) allowedPlugins;
```


## Functions
### constructor


```solidity
constructor() Ownable(msg.sender);
```

### updatePlugin


```solidity
function updatePlugin(address plugin, bool allowed) public onlyOwner;
```

### isPluginAllowed


```solidity
function isPluginAllowed(
    address plugin
) public view onlyOwner returns (bool);
```

