import { Amount, LedgerIndex, Path } from '../common'

import { BaseRequest, BaseResponse } from './baseMethod'

interface SourceCurrencyAmount {
  currency: string
  issuer?: string
}

/**
 * The `ripple_path_find` method is a simplified version of the path_find method
 * that provides a single response with a payment path you can use right away.
 * Expects a response in the form of a {@link RipplePathFindResponse}.
 *
 * @category Requests
 */
export interface RipplePathFindRequest extends BaseRequest {
  command: 'ripple_path_find'
  /** Unique address of the account that would send funds in a transaction. */
  source_account: string
  /** Unique address of the account that would receive funds in a transaction. */
  destination_account: string
  /**
   * Currency Amount that the destination account would receive in a
   * transaction.
   */
  destination_amount: Amount
  /**
   * Currency Amount that would be spent in the transaction. Cannot be used
   * with `source_currencies`.
   */
  send_max?: Amount
  /**
   * Array of currencies that the source account might want to spend. Each
   * entry in the array should be a JSON object with a mandatory currency field
   * and optional issuer field, like how currency amounts are specified.
   */
  source_currencies?: SourceCurrencyAmount
  /** A 20-byte hex string for the ledger version to use. */
  ledger_hash?: string
  /**
   * The ledger index of the ledger to use, or a shortcut string to choose a
   * ledger automatically.
   */
  ledger_index?: LedgerIndex
}

interface PathOption {
  /** Array of arrays of objects defining payment paths. */
  paths_computed: Path[]
  /**
   * Currency amount that the source would have to send along this path for the
   * destination to receive the desired amount.
   */
  source_amount: Amount
}

/**
 * Response expected from a {@link RipplePathFindRequest}.
 *
 * @category Responses
 */
export interface RipplePathFindResponse extends BaseResponse {
  result: {
    /**
     * Array of objects with possible paths to take, as described below. If
     * empty, then there are no paths connecting the source and destination
     * accounts.
     */
    alternatives: PathOption[]
    /** Unique address of the account that would receive a payment transaction. */
    destination_account: string
    /**
     * Array of strings representing the currencies that the destination
     * accepts, as 3-letter codes like "USD" or as 40-character hex like
     * "015841551A748AD2C1F76FF6ECB0CCCD00000000".
     */
    destination_currencies: string[]
    destination_amount: Amount
    full_reply?: boolean
    id?: number | string
    ledger_current_index?: number
    source_account: string
    validated: boolean
  }
}
