export type LedgerIndex = number | ('validated' | 'closed' | 'current')

export type AccountObjectType =
  | 'check'
  | 'escrow'
  | 'offer'
  | 'payment_channel'
  | 'signer_list'
  | 'state'

interface XRP {
  currency: 'XRP'
}

interface IssuedCurrency {
  currency: string
  issuer: string
}

export type Currency = IssuedCurrency | XRP

export interface IssuedCurrencyAmount extends IssuedCurrency {
  value: string
}

export type Amount = IssuedCurrencyAmount | string

export interface Signer {
  Signer: {
    Account: string
    TxnSignature: string
    SigningPubKey: string
  }
}

export interface Memo {
  Memo: {
    MemoData?: string
    MemoType?: string
    MemoFormat?: string
  }
}

export type StreamType =
  | 'consensus'
  | 'ledger'
  | 'manifests'
  | 'peer_status'
  | 'transactions'
  | 'transactions_proposed'
  | 'server'
  | 'validations'

interface PathStep {
  account?: string
  currency?: string
  issuer?: string
}

export type Path = PathStep[]

export interface SignerEntry {
  SignerEntry: {
    Account: string
    SignerWeight: number
  }
}

/**
 * One offer that might be returned from either an {@link NFTBuyOffersRequest}
 * or an {@link NFTSellOffersRequest}.
 *
 * @category Responses
 */
export interface NFTOffer {
  amount: Amount
  flags: number
  index: string
  owner: string
  destination?: string
  expiration?: number
}
