# HookRegistry
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/177484d49d90b45a40c5e8affa7fab5af8d23a1a/contracts/tokens/HookRegistry.sol)

**Inherits:**
[IHookRegistry](/home/runner/work/core-v1/core-v1/core-v1/docs/src/contracts/interfaces/tokens/IHookRegistry.sol/interface.IHookRegistry.md), Ownable


## State Variables
### allowedHooks

```solidity
mapping(address => bool) allowedHooks
```


## Functions
### constructor


```solidity
constructor() Ownable(msg.sender);
```

### updateHook


```solidity
function updateHook(
    address hook,
    bool allowed
) public onlyOwner;
```

### isHookAllowed


```solidity
function isHookAllowed(
    address hook
) public view returns (bool);
```

