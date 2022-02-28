import { Client, Payment, PaymentFlags, TrustSet } from '../../dist/npm'

const client = new Client('wss://s.altnet.rippletest.net:51233')

// This snippet walks us through partial payment.
async function partialPayment(): Promise<void> {
  await client.connect()

  // creating wallets as prerequisite
  const { wallet: wallet1 } = await client.fundWallet()
  const { wallet: wallet2 } = await client.fundWallet()

  // create a trustline to issue an IOU `FOO` and set limit on it.
  const trust_set_tx: TrustSet = {
    TransactionType: 'TrustSet',
    Account: wallet2.classicAddress,
    LimitAmount: {
      currency: 'FOO',
      issuer: wallet1.classicAddress,
      // Value for the new IOU - 10000000000 - is arbitarily chosen.
      value: '10000000000',
    },
  }

  await client.submitAndWait(trust_set_tx, {
    wallet: wallet2,
  })

  console.log('Balances after trustline is created')
  console.log(await client.getBalances(wallet1.classicAddress))
  console.log(await client.getBalances(wallet2.classicAddress))

  // Initially, the issuer(wallet1) sends an amount to the other account(wallet2)
  const issue_quantity = '3840'
  const payment: Payment = {
    TransactionType: 'Payment',
    Account: wallet1.classicAddress,
    Amount: {
      currency: 'FOO',
      value: issue_quantity,
      issuer: wallet1.classicAddress,
    },
    Destination: wallet2.classicAddress,
  }

  // submit payment
  const initialPayment = await client.submitAndWait(payment, {
    wallet: wallet1,
  })
  console.log(initialPayment)

  console.log('Balances after issuer(wallet1) sends IOU("FOO") to wallet2')
  console.log(await client.getBalances(wallet1.classicAddress))
  console.log(await client.getBalances(wallet2.classicAddress))

  /*
   * Send money less than the amount specified on 2 conditions:
   * 1. Sender has less money than the aamount specified in the payment Tx.
   * 2. Sender has the tfPartialPayment flag activated.
   *
   * Other ways to specify flags are by using Hex code and decimal code.
   * eg. For partial payment(tfPartialPayment)
   * decimal ->131072, hex -> 0x00020000
   */
  const partialPaymentTx: Payment = {
    TransactionType: 'Payment',
    Account: wallet2.classicAddress,
    Amount: {
      currency: 'FOO',
      value: '4000',
      issuer: wallet1.classicAddress,
    },
    Destination: wallet1.classicAddress,
    Flags: PaymentFlags.tfPartialPayment,
  }

  // submit payment
  const submitResponse = await client.submitAndWait(partialPaymentTx, {
    wallet: wallet2,
  })
  console.log(submitResponse)

  console.log(
    "Balances after Partial Payment, when wallet2 tried to send 4000 FOO's",
  )
  console.log(await client.getBalances(wallet1.classicAddress))
  console.log(await client.getBalances(wallet2.classicAddress))

  await client.disconnect()
}
void partialPayment()
