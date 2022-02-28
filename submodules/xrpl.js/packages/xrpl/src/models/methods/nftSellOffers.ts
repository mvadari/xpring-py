import { NFTOffer } from '../common'

import { BaseRequest, BaseResponse } from './baseMethod'

/**
 * The `nft_sell_offers` method retrieves all of sell offers for the specified
 * NFToken.
 *
 * @category Requests
 */
export interface NFTSellOffersRequest extends BaseRequest {
  command: 'nft_sell_offers'
  /**
   * The unique identifier of an NFToken. The request returns sell offers for this NFToken.
   */
  tokenid: string
}

/**
 * Response expected from an {@link NFTSellOffersRequest}.
 *
 * @category Responses
 */
export interface NFTSellOffersResponse extends BaseResponse {
  result: {
    /**
     * A list of sell offers for the specified NFToken.
     */
    offers: NFTOffer[]
    /**
     * The token ID of the NFToken to which these offers pertain.
     */
    tokenid: string
  }
}
