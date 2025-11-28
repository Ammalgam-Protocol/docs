# PluginRegistry
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/777758268663000ff55bdeeb52b3c5eebb91dd7f/contracts/tokens/PluginRegistry.sol)

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

