import BaseLedgerEntry from './BaseLedgerEntry'

/**
 * The AccountRoot object type describes a single account, its settings, and
 * XRP balance.
 *
 * @category Ledger Entries
 */
export default interface AccountRoot extends BaseLedgerEntry {
  LedgerEntryType: 'AccountRoot'
  /** The identifying (classic) address of this account. */
  Account: string
  /** The account's current XRP balance in drops, represented as a string. */
  Balance: string
  /** A bit-map of boolean flags enabled for this account. */
  Flags: number
  /**
   * The number of objects this account owns in the ledger, which contributes
   * to its owner reserve.
   */
  OwnerCount: number
  /**
   * The identifying hash of the transaction that most recently modified this
   * object.
   */
  PreviousTxnID: string
  /**
   * The index of the ledger that contains the transaction that most recently
   * modified this object.
   */
  PreviousTxnLgrSeq: number
  /** The sequence number of the next valid transaction for this account. */
  Sequence: number
  /**
   * The identifying hash of the transaction most recently sent by this
   * account. This field must be enabled to use the AccountTxnID transaction
   * field. To enable it, send an AccountSet transaction with the.
   * `asfAccountTxnID` flag enabled.
   */
  AccountTxnID?: string
  /**
   * A domain associated with this account. In JSON, this is the hexadecimal
   * for the ASCII representation of the domain.
   */
  Domain?: string
  /** The md5 hash of an email address. */
  EmailHash?: string
  /**
   * A public key that may be used to send encrypted messages to this account
   * in JSON, uses hexadecimal.
   */
  MessageKey?: string
  /**
   * The address of a key pair that can be used to sign transactions for this
   * account instead of the master key. Use a SetRegularKey transaction to
   * change this value.
   */
  RegularKey?: string
  /**
   * How many Tickets this account owns in the ledger. This is updated
   * automatically to ensure that the account stays within the hard limit of 250.
   * Tickets at a time.
   */
  TicketCount?: number
  /**
   * How many significant digits to use for exchange rates of Offers involving
   * currencies issued by this address. Valid values are 3 to 15, inclusive.
   */
  TickSize?: number
  /**
   * A transfer fee to charge other users for sending currency issued by this
   * account to each other.
   */
  TransferRate?: number
}

/**
 * A boolean map of AccountRootFlags for simplified code checking AccountRoot settings.
 * For submitting settings flags to the ledger, use AccountRootFlags instead.
 */
export interface AccountRootFlagsInterface {
  /**
   * The account has used its free SetRegularKey transaction.
   */
  lsfPasswordSpent?: boolean
  /**
   * Requires incoming payments to specify a Destination Tag.
   */
  lsfRequireDestTag?: boolean
  /**
   * This account must individually approve other users for those users to hold this account's issued currencies.
   */
  lsfRequireAuth?: boolean
  /**
   * Client applications should not send XRP to this account. Not enforced by rippled.
   */
  lsfDisallowXRP?: boolean
  /**
   * Disallows use of the master key to sign transactions for this account.
   */
  lsfDisableMaster?: boolean
  /**
   * This address cannot freeze trust lines connected to it. Once enabled, cannot be disabled.
   */
  lsfNoFreeze?: boolean
  /**
   * All assets issued by this address are frozen.
   */
  lsfGlobalFreeze?: boolean
  /**
   * Enable rippling on this addresses's trust lines by default. Required for issuing addresses; discouraged for others.
   */
  lsfDefaultRipple?: boolean
  /**
   * This account can only receive funds from transactions it sends, and from preauthorized accounts.
   * (It has DepositAuth enabled.)
   */
  lsfDepositAuth?: boolean
}

export enum AccountRootFlags {
  /**
   * The account has used its free SetRegularKey transaction.
   */
  lsfPasswordSpent = 0x00010000,
  /**
   * Requires incoming payments to specify a Destination Tag.
   */
  lsfRequireDestTag = 0x00020000,
  /**
   * This account must individually approve other users for those users to hold this account's issued currencies.
   */
  lsfRequireAuth = 0x00040000,
  /**
   * Client applications should not send XRP to this account. Not enforced by rippled.
   */
  lsfDisallowXRP = 0x00080000,
  /**
   * Disallows use of the master key to sign transactions for this account.
   */
  lsfDisableMaster = 0x00100000,
  /**
   * This address cannot freeze trust lines connected to it. Once enabled, cannot be disabled.
   */
  lsfNoFreeze = 0x00200000,
  /**
   * All assets issued by this address are frozen.
   */
  lsfGlobalFreeze = 0x00400000,
  /**
   * Enable rippling on this addresses's trust lines by default. Required for issuing addresses; discouraged for others.
   */
  lsfDefaultRipple = 0x00800000,
  /**
   * This account can only receive funds from transactions it sends, and from preauthorized accounts.
   * (It has DepositAuth enabled.)
   */
  lsfDepositAuth = 0x01000000,
}
