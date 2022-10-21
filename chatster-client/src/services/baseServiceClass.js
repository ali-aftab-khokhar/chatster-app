import axios from 'axios'
import { toast } from 'react-toastify'
import CONSTANTS from '../constants'
const API = 'http://localhost:5000/api'

class BaseServiceClass {
  putMethod (payload, success, error, url) {
    try {
      axios.put(`${API}/${url}`, payload)
        .then((res) => {
          if (res.status === 200) {
            toast.success(success)
          } else {
            toast.warning(CONSTANTS.SOMETHING_WENT_WRONG)
          }
        })
    } catch {
      toast.error(error)
    }
  }

  deleteMethod (url, error) {
    try {
      axios.delete(`${API}/${url}`)
        .then((res) => {
          if (res.status === 200) {
            toast.success('Deleted')
          } else {
            toast.warning(CONSTANTS.SOMETHING_WENT_WRONG)
          }
        })
    } catch {
      toast.error(error)
    }
  }

  async postMethod (payload, success, error, url = '') {
    try {
      await axios.post(`${API}/${url}`, payload)
        .then((res) => {
          console.log(res.status)
          if (res.status === 200) {
            toast.success(success)
            return res.data[0]._id
          } else {
            toast.warning(CONSTANTS.SOMETHING_WENT_WRONG)
          }
        })
    } catch {
      toast.error(error)
    }
  }

  async specialPostMethod (credentials) {
    try {
      return await (axios.post(`${API}`, credentials))
    } catch {
      toast.error(CONSTANTS.INCORRECT_EMAIL_OR_PASSWORD)
    }
  }

  async logoutMethod () {
    await axios.get('/api/logout')
  }
}

export default BaseServiceClass
