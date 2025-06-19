# PluginRegistry
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/6e61b51e90091137f7e2abb147c11731a6d4681e/contracts/tokens/PluginRegistry.sol)

**Inherits:**
[IPluginRegistry](/contracts/interfaces/tokens/IPluginRegistry.sol/interface.IPluginRegistry.md), Ownable


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

