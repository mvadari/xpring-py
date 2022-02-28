import { assert } from 'chai'
import { hasNextPage } from 'xrpl-local'

import rippled from '../fixtures/rippled'
import { setupClient, teardownClient } from '../setupClient'
import { assertRejects } from '../testUtils'

const rippledResponse = function (request: Request): Record<string, unknown> {
  if ('marker' in request) {
    return rippled.ledger_data.last_page
  }
  return rippled.ledger_data.first_page
}

describe('client.requestNextPage', function () {
  beforeEach(setupClient)
  afterEach(teardownClient)
  it('requests the next page', async function () {
    this.mockRippled.addResponse('ledger_data', rippledResponse)
    const response = await this.client.request({ command: 'ledger_data' })
    const responseNextPage = await this.client.requestNextPage(
      { command: 'ledger_data' },
      response,
    )
    assert.equal(
      responseNextPage.result.state[0].index,
      '000B714B790C3C79FEE00D17C4DEB436B375466F29679447BA64F265FD63D731',
    )
  })

  it('rejects when there are no more pages', async function () {
    this.mockRippled.addResponse('ledger_data', rippledResponse)
    const response = await this.client.request({ command: 'ledger_data' })
    const responseNextPage = await this.client.requestNextPage(
      { command: 'ledger_data' },
      response,
    )
    assert(!hasNextPage(responseNextPage))
    await assertRejects(
      this.client.requestNextPage({ command: 'ledger_data' }, responseNextPage),
      Error,
      'response does not have a next page',
    )
  })
})
