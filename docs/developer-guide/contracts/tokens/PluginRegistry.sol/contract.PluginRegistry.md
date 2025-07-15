# PluginRegistry
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/a26749d2952fb563364ca2f24c7ddd488be0359f/contracts/tokens/PluginRegistry.sol)

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

