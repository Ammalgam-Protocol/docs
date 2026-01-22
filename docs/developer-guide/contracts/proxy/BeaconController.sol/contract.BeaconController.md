# BeaconController
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/1f18f84b8f40a3c2c9eee06e5c517dd82d1cb19c/contracts/proxy/BeaconController.sol)

**Inherits:**
[IBeaconController](/docs/developer-guide/contracts/proxy/BeaconController.sol/interface.IBeaconController.md), AccessControl


## State Variables
### ADMIN_ROLE

```solidity
bytes32 public constant ADMIN_ROLE = AccessControl.DEFAULT_ADMIN_ROLE;
```


### MULTISIG_ROLE

```solidity
bytes32 public constant MULTISIG_ROLE = keccak256('MULTISIG_ROLE');
```


### ADMIN_OR_MULTISIG_ROLE

```solidity
bytes32 public constant ADMIN_OR_MULTISIG_ROLE = keccak256('ADMIN_OR_MULTISIG_ROLE');
```


### upgradeableBeacon

```solidity
UpgradeableBeacon public immutable upgradeableBeacon;
```


### _allowedIndex

```solidity
mapping(address => uint256) private _allowedIndex;
```


### _allowedList

```solidity
address[] private _allowedList;
```


## Functions
### constructor


```solidity
constructor(address timelock, address multisig, address initialImpl, address[] memory initialAllowed);
```

### upgradeTo


```solidity
function upgradeTo(
    address implementation
) external onlyRole(ADMIN_ROLE);
```

### upgradeToAllowed


```solidity
function upgradeToAllowed(
    address impl
) external onlyRole(MULTISIG_ROLE);
```

### allowedList


```solidity
function allowedList() external view returns (address[] memory);
```

### isAllowed


```solidity
function isAllowed(
    address impl
) public view returns (bool);
```

### addToAllowedList


```solidity
function addToAllowedList(
    address implementation
) external onlyRole(ADMIN_ROLE);
```

### removeFromAllowedList


```solidity
function removeFromAllowedList(
    address implementation
) external onlyRole(ADMIN_OR_MULTISIG_ROLE);
```

### _addToAllowedList


```solidity
function _addToAllowedList(
    address impl
) private;
```

### _removeFromAllowedList


```solidity
function _removeFromAllowedList(
    address impl
) private;
```

## Events
### AllowedAdded

```solidity
event AllowedAdded(address indexed implementation, address indexed by);
```

### AllowedRemoved

```solidity
event AllowedRemoved(address indexed implementation, address indexed by);
```

## Errors
### ZERO_ADDRESS

```solidity
error ZERO_ADDRESS();
```

### NOT_ALLOWED

```solidity
error NOT_ALLOWED();
```

### ALREADY_ALLOWED

```solidity
error ALREADY_ALLOWED();
```

