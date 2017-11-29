// ApiClient for new API
import apisauce from 'apisauce'
import Config from 'react-native-config'
import { select } from 'redux-saga/effects'
import apiEndpoints from '../Config/TextEditorEndpoints'
import type { ApiClient } from '../types/api'

const userJwtSelector = state => "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhY2NvdW50X2lkIjoxMjYwLCJleHAiOjE1MTQ1Mjk1ODd9.O0neS_Irg-kBimwoCnXRAYq0DC7_9sKRZ0lZ2ywYCW36dZuf6UM7_fwNpHSaQvWvGG7gvmHvxz5WB1mDmQwkovq97-2ZzZ9YWyz2MFV3_7xASqy7h-BnnngnlYA-9TADM_IEIOG6EIUoOqbAaalF0URnXqqTVWAWf-pPq6JhliM"

const compose = require('ramda/src/compose')
const map = require('ramda/src/map')

const create = (baseURL = "https://postman-echo.com"): ApiClient => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  })

  if (__DEV__ && console.tron) {
    api.addMonitor(console.tron.apisauce)
  }

  const uploadImage = function * (image) {
    const params = {
      testing: 'testing'
    }

    const data = new FormData()
    Object.keys(params).forEach(key => {
      if (params[key]) {
        data.append(key, params[key])
      }
    })

    return yield api.post(apiEndpoints.uploadImage, data)
  }

  return {
    uploadImage,
  }
}

export default {
  create
}
