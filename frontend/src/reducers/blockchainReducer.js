import { ADD_BLOCKCHAIN_ACCOUNT } from '../constants/blockchainConstants'

export const blockchainReducer = (state = { address: null }, action) => {
  switch (action.type) {
    case ADD_BLOCKCHAIN_ACCOUNT:
      return {
        ...state,
        address: action.payload,
      }
    default:
      return { ...state }
  }
}
