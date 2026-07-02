# HookRegistry
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/539fb3333b1a5bdb57027ffabb33730a0eae663d/contracts/tokens/HookRegistry.sol)

**Inherits:**
[IHookRegistry](/docs/developer-guide/contracts/interfaces/tokens/IHookRegistry.md), Ownable


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

