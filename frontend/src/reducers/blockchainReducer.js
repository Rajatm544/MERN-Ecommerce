import { INIT_BLOCKCHAIN } from '../constants/blockchainConstants'

export const blockchainReducer = (
  state = { address: null, contract: null, balance: 0 },
  action,
) => {
  switch (action.type) {
    case INIT_BLOCKCHAIN:
      return {
        ...state,
        address: action?.payload?.address,
        contract: action?.payload?.contract,
        // balance: action?.payload?.balance,
      }
    default:
      return { ...state }
  }
}
