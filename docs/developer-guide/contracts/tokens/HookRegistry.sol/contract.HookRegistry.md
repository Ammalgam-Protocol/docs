# HookRegistry
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/0e8299e625b00def011cdc149decf27831eef326/contracts/tokens/HookRegistry.sol)

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

