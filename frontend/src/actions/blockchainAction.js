import axios from 'axios'
import { ADD_BLOCKCHAIN_ACCOUNT, UPDATE_CONTRACT } from '../constants/blockchainConstants'

export const initializeBlockchain = (id) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({
      type: ADD_BLOCKCHAIN_ACCOUNT,
      payload: id,
    })
    // dispatch({
    //   type: UPDATE_CONTRACT,
    //   payload: contract
    // })
  } catch (e) {
    console.log('Failed to push blockchain account!')
  }
}
