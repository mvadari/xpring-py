import responses from '../fixtures/responses'
import rippled from '../fixtures/rippled'
import rippledAccountLines from '../fixtures/rippled/accountLines'
import { setupClient, teardownClient } from '../setupClient'
import { assertResultMatch, addressTests } from '../testUtils'

/**
 * Every test suite exports their tests in the default object.
 * - Check out the "TestSuite" type for documentation on the interface.
 * - Check out "test/client/index.ts" for more information about the test runner.
 */
describe('client.getBalances', function () {
  beforeEach(setupClient)
  afterEach(teardownClient)

  addressTests.forEach(function (testcase) {
    describe(testcase.type, function () {
      it('getBalances - base', async function () {
        this.mockRippled.addResponse(
          'account_info',
          rippled.account_info.normal,
        )
        this.mockRippled.addResponse(
          'account_lines',
          rippledAccountLines.normal,
        )
        this.mockRippled.addResponse('ledger', rippled.ledger.normal)
        const result = await this.client.getBalances(testcase.address)
        assertResultMatch(result, responses.getBalances, 'getBalances')
      })

      it('getBalances - limit', async function () {
        const request = {
          account: testcase.address,
          options: {
            limit: 10,
          },
        }
        this.mockRippled.addResponse(
          'account_info',
          rippled.account_info.normal,
        )
        this.mockRippled.addResponse(
          'account_lines',
          rippledAccountLines.normal,
        )
        this.mockRippled.addResponse('ledger', rippled.ledger.normal)
        const expectedResponse = responses.getBalances.slice(
          0,
          request.options.limit,
        )
        const result = await this.client.getBalances(
          request.account,
          request.options,
        )
        assertResultMatch(result, expectedResponse, 'getBalances')
      })

      it('getBalances - peer', async function () {
        const options = {
          peer: 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B',
        }
        this.mockRippled.addResponse(
          'account_info',
          rippled.account_info.normal,
        )
        this.mockRippled.addResponse(
          'account_lines',
          rippledAccountLines.normal,
        )
        this.mockRippled.addResponse('ledger', rippled.ledger.normal)

        const expectedResponse = responses.getBalances.filter(
          (item) => item.issuer === options.peer,
        )
        const result = await this.client.getBalances(testcase.address, options)
        assertResultMatch(result, expectedResponse, 'getBalances')
      })

      it('getBalances - limit & peer', async function () {
        const options = {
          peer: 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B',
          limit: 10,
        }
        this.mockRippled.addResponse(
          'account_info',
          rippled.account_info.normal,
        )
        this.mockRippled.addResponse(
          'account_lines',
          rippledAccountLines.normal,
        )
        this.mockRippled.addResponse('ledger', rippled.ledger.normal)

        const expectedResponse = responses.getBalances
          .filter((item) => item.issuer === options.peer)
          .slice(0, options.limit)
        const result = await this.client.getBalances(testcase.address, options)
        assertResultMatch(result, expectedResponse, 'getBalances')
      })
    })
  })
})
