// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface IPluginRegistry {
    /**
     * @dev Updates the allowed status of a plugin.
     * @notice This function is restricted to the owner of the contract.
     * @param plugin The address of the plugin to be updated.
     * @param allowed A boolean value indicating whether the plugin should be allowed (true) or disallowed (false).
     * @dev Emits no events.
     */
    function updatePlugin(address plugin, bool allowed) external;

    /**
     * @dev Checks if a plugin is allowed.
     * @param plugin The address of the plugin to check.
     * @return A boolean value indicating whether the plugin is allowed (true) or disallowed (false).
     * @dev This function is a view function and does not alter state.
     */
    function isPluginAllowed(
        address plugin
    ) external view returns (bool);
}
