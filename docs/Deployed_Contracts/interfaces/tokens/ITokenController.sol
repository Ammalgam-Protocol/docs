// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.28;

import {IERC20} from '@openzeppelin/contracts/interfaces/IERC20.sol';

import {IAmmalgamERC20} from 'contracts/interfaces/tokens/IAmmalgamERC20.sol';

uint256 constant DEPOSIT_L = 0;
uint256 constant DEPOSIT_X = 1;
uint256 constant DEPOSIT_Y = 2;
uint256 constant BORROW_L = 3;
uint256 constant BORROW_X = 4;
uint256 constant BORROW_Y = 5;
uint256 constant FIRST_DEBT_TOKEN = 3;

bool constant ROUNDING_UP = true;

/**
 * @title ITokenController Interface
 * @notice The interface of a ERC20 facade for multiple token types with functionality similar to ERC1155.
 * @dev The TokenController provides support to the AmmalgamPair contract for token management.
 */
interface ITokenController {
    /**
     * @dev Emitted when reserves are synchronized
     * @param reserveXAssets The updated reserve for token X
     * @param reserveYAssets The updated reserve for token Y
     */
    event Sync(uint256 reserveXAssets, uint256 reserveYAssets);

    /**
     * @notice Get the underlying tokens for the AmmalgamERC20Controller.
     * @return The addresses of the underlying tokens.
     */
    function underlyingTokens() external view returns (IERC20, IERC20);

    /**
     * @notice Fetches the current reserves of asset X and asset Y, as well as the block of the last operation.
     * @return reserveXAssets The current reserve of asset X.
     * @return reserveYAssets The current reserve of asset Y.
     * @return blockLast The block number of the last operation.
     */
    function getReserves() external view returns (uint112 reserveXAssets, uint112 reserveYAssets, uint256 blockLast);

    /**
     * @notice returns the tick range used to represent the price range
     * @return minTick the minimum tick representing the lowest estimated price
     * @return maxTick the maximum tick representing the highest estimated price
     */
    function getTickRange() external view returns (int16 minTick, int16 maxTick);

    /**
     * @notice Return the IAmmalgamERC20 token corresponding to the token type
     * @param tokenType The type of token for which the scaler is being computed.
     *                  Can be one of BORROW_X, DEPOSIT_X, BORROW_Y, DEPOSIT_Y, BORROW_L, or DEPOSIT_L.
     * @return The IAmmalgamERC20 token
     */
    function tokens(
        uint256 tokenType
    ) external view returns (IAmmalgamERC20);

    /**
     * @notice Computes the current total Assets.
     * @dev If the last lending state update is outdated (i.e., not matching the current block timestamp),
     *      the function recalculates the assets based on the duration since the last update, the lending state,
     *      and reserve balances. If the timestamp is current, the previous scaler (without recalculation) is returned.
     * @return totalAssets An array of six `uint128` values representing the total assets for each of the 6 amalgam token types.
     *  These values may be adjusted based on the time elapsed since the last update. If the timestamp is up-to-date, the
     *  previously calculated total assets are returned without recalculation.
     */
    function totalAssets() external view returns (uint128[6] memory);
}
