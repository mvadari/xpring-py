import { assert } from 'chai'
import _ from 'lodash'
import { decode } from 'ripple-binary-codec/dist'
import {
  AccountSet,
  Client,
  SignerListSet,
  SubmitMultisignedRequest,
  Transaction,
  SubmitMultisignedResponse,
  hashes,
} from 'xrpl-local'
import { convertStringToHex } from 'xrpl-local/utils'
import { multisign } from 'xrpl-local/Wallet/signer'

import serverUrl from '../serverUrl'
import { setupClient, teardownClient } from '../setup'
import {
  generateFundedWallet,
  ledgerAccept,
  testTransaction,
  verifySubmittedTransaction,
} from '../utils'

// how long before each test case times out
const TIMEOUT = 20000
const { hashSignedTx } = hashes

describe('submit_multisigned', function () {
  this.timeout(TIMEOUT)

  beforeEach(_.partial(setupClient, serverUrl))
  afterEach(teardownClient)

  it('submit_multisigned transaction', async function () {
    const client: Client = this.client
    const signerWallet1 = await generateFundedWallet(this.client)
    const signerWallet2 = await generateFundedWallet(this.client)

    // set up the multisigners for the account
    const signerListSet: SignerListSet = {
      TransactionType: 'SignerListSet',
      Account: this.wallet.classicAddress,
      SignerEntries: [
        {
          SignerEntry: {
            Account: signerWallet1.classicAddress,
            SignerWeight: 1,
          },
        },
        {
          SignerEntry: {
            Account: signerWallet2.classicAddress,
            SignerWeight: 1,
          },
        },
      ],
      SignerQuorum: 2,
    }
    await testTransaction(this.client, signerListSet, this.wallet)

    // try to multisign
    const accountSet: AccountSet = {
      TransactionType: 'AccountSet',
      Account: this.wallet.classicAddress,
      Domain: convertStringToHex('example.com'),
    }
    const accountSetTx = await client.autofill(accountSet, 2)
    const signed1 = signerWallet1.sign(accountSetTx, true)
    const signed2 = signerWallet2.sign(accountSetTx, true)
    const multisigned = multisign([signed1.tx_blob, signed2.tx_blob])
    const multisignedRequest: SubmitMultisignedRequest = {
      command: 'submit_multisigned',
      tx_json: decode(multisigned) as unknown as Transaction,
    }
    const submitResponse = await client.request(multisignedRequest)
    await ledgerAccept(client)
    assert.strictEqual(submitResponse.result.engine_result, 'tesSUCCESS')
    await verifySubmittedTransaction(this.client, multisigned)

    const expectedResponse: SubmitMultisignedResponse = {
      id: submitResponse.id,
      type: 'response',
      result: {
        engine_result: 'tesSUCCESS',
        engine_result_code: 0,
        engine_result_message:
          'The transaction was applied. Only final in a validated ledger.',
        tx_blob: multisigned,
        tx_json: {
          ...(decode(multisigned) as unknown as Transaction),
          hash: hashSignedTx(multisigned),
        },
      },
    }

    assert.deepEqual(submitResponse, expectedResponse)
  })
})
