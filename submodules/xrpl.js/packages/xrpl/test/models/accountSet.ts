import { assert } from 'chai'
import { validate, ValidationError } from 'xrpl-local'
import { validateAccountSet } from 'xrpl-local/models/transactions/accountSet'

/**
 * AccountSet Transaction Verification Testing.
 *
 * Providing runtime verification testing for each specific transaction type.
 */
describe('AccountSet', function () {
  let account

  beforeEach(function () {
    account = {
      TransactionType: 'AccountSet',
      Account: 'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn',
      Fee: '12',
      Sequence: 5,
      Domain: '6578616D706C652E636F6D',
      SetFlag: 5,
      MessageKey:
        '03AB40A0490F9B7ED8DF29D246BF2D6269820A0EE7742ACDD457BEA7C7D0931EDB',
    } as any
  })

  it(`verifies valid AccountSet`, function () {
    assert.doesNotThrow(() => validateAccountSet(account))
    assert.doesNotThrow(() => validate(account))
  })

  it(`throws w/ invalid SetFlag (out of range)`, function () {
    account.SetFlag = 12

    assert.throws(
      () => validateAccountSet(account),
      ValidationError,
      'AccountSet: invalid SetFlag',
    )
    assert.throws(
      () => validate(account),
      ValidationError,
      'AccountSet: invalid SetFlag',
    )
  })

  it(`throws w/ invalid SetFlag (incorrect type)`, function () {
    account.SetFlag = 'abc'

    assert.throws(
      () => validateAccountSet(account),
      ValidationError,
      'AccountSet: invalid SetFlag',
    )
    assert.throws(
      () => validate(account),
      ValidationError,
      'AccountSet: invalid SetFlag',
    )
  })

  it(`throws w/ invalid ClearFlag`, function () {
    account.ClearFlag = 12

    assert.throws(
      () => validateAccountSet(account),
      ValidationError,
      'AccountSet: invalid ClearFlag',
    )
    assert.throws(
      () => validate(account),
      ValidationError,
      'AccountSet: invalid ClearFlag',
    )
  })

  it(`throws w/ invalid Domain`, function () {
    account.Domain = 6578616

    assert.throws(
      () => validateAccountSet(account),
      ValidationError,
      'AccountSet: invalid Domain',
    )
    assert.throws(
      () => validate(account),
      ValidationError,
      'AccountSet: invalid Domain',
    )
  })

  it(`throws w/ invalid EmailHash`, function () {
    account.EmailHash = 6578656789876543

    assert.throws(
      () => validateAccountSet(account),
      ValidationError,
      'AccountSet: invalid EmailHash',
    )
    assert.throws(
      () => validate(account),
      ValidationError,
      'AccountSet: invalid EmailHash',
    )
  })

  it(`throws w/ invalid MessageKey`, function () {
    account.MessageKey = 6578656789876543

    assert.throws(
      () => validateAccountSet(account),
      ValidationError,
      'AccountSet: invalid MessageKey',
    )
    assert.throws(
      () => validate(account),
      ValidationError,
      'AccountSet: invalid MessageKey',
    )
  })

  it(`throws w/ invalid TransferRate`, function () {
    account.TransferRate = '1000000001'

    assert.throws(
      () => validateAccountSet(account),
      ValidationError,
      'AccountSet: invalid TransferRate',
    )
    assert.throws(
      () => validate(account),
      ValidationError,
      'AccountSet: invalid TransferRate',
    )
  })

  it(`throws w/ invalid TickSize`, function () {
    account.TickSize = 20

    assert.throws(
      () => validateAccountSet(account),
      ValidationError,
      'AccountSet: invalid TickSize',
    )
    assert.throws(
      () => validate(account),
      ValidationError,
      'AccountSet: invalid TickSize',
    )
  })
})
