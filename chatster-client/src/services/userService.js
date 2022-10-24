import CONSTANTS from '../constants'
import BaseServiceClass from './baseServiceClass'
import { toast } from 'react-toastify'

class UserService extends BaseServiceClass {
  registerNewUser (payload) {
    this.postMethod(payload, CONSTANTS.USER_ADDED, CONSTANTS.SIGNUP_FAILED, 'register')
  }

  async loginUser (payload) {
    const userDetails = await this.specialPostMethod(payload)
    if (userDetails.status === 200) {
      toast.success(CONSTANTS.LOGGED_IN)
      return userDetails.data
    }
  }

  async logout () {
    this.logoutMethod()
  }
}

export default UserService
