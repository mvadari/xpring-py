import _ from 'lodash'
import { SignerListSet } from 'xrpl-local'

import serverUrl from '../serverUrl'
import { setupClient, teardownClient } from '../setup'
import { testTransaction } from '../utils'

// how long before each test case times out
const TIMEOUT = 20000

describe('SignerListSet', function () {
  this.timeout(TIMEOUT)

  beforeEach(_.partial(setupClient, serverUrl))
  afterEach(teardownClient)

  it('base', async function () {
    const tx: SignerListSet = {
      TransactionType: 'SignerListSet',
      Account: this.wallet.classicAddress,
      SignerEntries: [
        {
          SignerEntry: {
            Account: 'r5nx8ZkwEbFztnc8Qyi22DE9JYjRzNmvs',
            SignerWeight: 1,
          },
        },
        {
          SignerEntry: {
            Account: 'r3RtUvGw9nMoJ5FuHxuoVJvcENhKtuF9ud',
            SignerWeight: 1,
          },
        },
      ],
      SignerQuorum: 2,
    }
    await testTransaction(this.client, tx, this.wallet)
  })
})
