# PairBeaconProxy
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/fb75a130dc9f305802a2ff86ff4032ac81e97806/contracts/proxy/PairBeaconProxy.sol)

**Inherits:**
BeaconProxy

Proxy contract for Ammalgam Pairs that uses a beacon for implementation management and
self initialization and reinitialization.

*Inherits from OpenZeppelin's BeaconProxy and overrides the _fallback function to ensure
the implementation is up-to-date with the beacon before delegating calls. If the
implementation changes on the beacon, this proxy knows by storing the implementation at the
time of construction. When a change is made, this proxy will call initialize during the
_fallback call to ensure the new implementation is properly initialized. This reduces the
need to manually upgrade each pair when the beacon changes the implementation.*


## Functions
### constructor

*Initializes the proxy with the beacon address from the factory and calls initialize
on the implementation.*


```solidity
constructor()
    payable
    BeaconProxy(
        address(IAmmalgamFactory(msg.sender).pairBeacon()),
        abi.encodeWithSelector(IPairInitializable.initialize.selector)
    );
```

### _fallback

*Overrides the _fallback function to check if the implementation from the beacon
has changed. If it has, it upgrades the implementation and calls initialize on the new
implementation to ensure proper setup.*


```solidity
function _fallback() internal override;
```

### _initialize


```solidity
function _initialize(
    address beaconImplementation
) external;
```

### _staticCall

Adapted version of OZ Proxy._delegate()


```solidity
function _staticCall(
    address implementation
) internal virtual;
```

### _setImplementation

*Adapted from ERC1967Utils. The original function is private, and we need
to set the implementation on first deployment without invoking initialize()
again, since initialization was already performed in the BeaconProxy constructor.*


```solidity
function _setImplementation(
    address newImplementation
) private;
```

### receive


```solidity
receive() external payable;
```

## Errors
### EthTransferNotAllowed

```solidity
error EthTransferNotAllowed();
```

### AccessDenied

```solidity
error AccessDenied();
```

