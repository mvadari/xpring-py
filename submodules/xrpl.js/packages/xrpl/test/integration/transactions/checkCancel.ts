import { assert } from 'chai'
import _ from 'lodash'
import { CheckCreate, CheckCancel } from 'xrpl-local'

import serverUrl from '../serverUrl'
import { setupClient, teardownClient } from '../setup'
import { generateFundedWallet, testTransaction } from '../utils'

// how long before each test case times out
const TIMEOUT = 20000

describe('CheckCancel', function () {
  this.timeout(TIMEOUT)

  beforeEach(_.partial(setupClient, serverUrl))
  afterEach(teardownClient)

  it('base', async function () {
    const wallet2 = await generateFundedWallet(this.client)
    const setupTx: CheckCreate = {
      TransactionType: 'CheckCreate',
      Account: this.wallet.classicAddress,
      Destination: wallet2.classicAddress,
      SendMax: '50',
    }

    await testTransaction(this.client, setupTx, this.wallet)

    // get check ID
    const response1 = await this.client.request({
      command: 'account_objects',
      account: this.wallet.classicAddress,
      type: 'check',
    })
    assert.lengthOf(
      response1.result.account_objects,
      1,
      'Should be exactly one check on the ledger',
    )
    const checkId = response1.result.account_objects[0].index

    // actual test - cancel the check
    const tx: CheckCancel = {
      TransactionType: 'CheckCancel',
      Account: this.wallet.classicAddress,
      CheckID: checkId,
    }

    await testTransaction(this.client, tx, this.wallet)

    // confirm that the check no longer exists
    const accountOffersResponse = await this.client.request({
      command: 'account_objects',
      account: this.wallet.classicAddress,
      type: 'check',
    })
    assert.lengthOf(
      accountOffersResponse.result.account_objects,
      0,
      'Should be no checks on the ledger',
    )
  })
})
