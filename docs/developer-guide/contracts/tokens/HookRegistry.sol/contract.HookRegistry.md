# HookRegistry
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/78757f8a0ce2219e96389fd2347e05df5d8691e4/contracts/tokens/HookRegistry.sol)

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

