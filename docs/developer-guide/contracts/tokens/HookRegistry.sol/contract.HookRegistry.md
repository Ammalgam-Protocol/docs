# HookRegistry
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/bab12491a59b8a6007058139c71cddb33c6f5ccb/contracts/tokens/HookRegistry.sol)

**Inherits:**
[IHookRegistry](/docs/developer-guide/contracts/interfaces/tokens/IHookRegistry.sol/interface.IHookRegistry.md), Ownable


## State Variables
### allowedHooks

```solidity
mapping(address => bool) allowedHooks;
```


## Functions
### constructor


```solidity
constructor() Ownable(msg.sender);
```

### updateHook


```solidity
function updateHook(address hook, bool allowed) public onlyOwner;
```

### isHookAllowed


```solidity
function isHookAllowed(
    address hook
) public view returns (bool);
```

