import axios from 'axios'
import { INIT_BLOCKCHAIN } from '../constants/blockchainConstants'

export const initializeBlockchain = (obj) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INIT_BLOCKCHAIN,
      payload: obj,
    })
    // dispatch({
    //   type: UPDATE_CONTRACT,
    //   payload: contract
    // })
  } catch (e) {
    console.log('Failed to push blockchain account!')
  }
}
