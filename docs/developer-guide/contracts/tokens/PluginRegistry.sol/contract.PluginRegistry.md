# PluginRegistry
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/0225322e5b1d4d1ce3ec3ffc220dfd4d8afaf521/contracts/tokens/PluginRegistry.sol)

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

