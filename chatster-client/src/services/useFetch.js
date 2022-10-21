import axios from 'axios'
import { useState, useEffect } from 'react'
import CONSTANTS from '../constants'
// import API from "../api_config";

const useFetch = (url) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`/api/${url}`)
        .then((response) => {
          setData(response.data)
        })
        .catch(() => console.log(CONSTANTS.API_Error), [])
    }
    fetchData()
  }, [url, data])

  const refetchData = () => {
    setData([])
  }

  return [data, refetchData]
}

export default useFetch
