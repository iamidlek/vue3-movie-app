// node.js
const axios = require('axios')
const OMDB_API_KEY = process.env.OMDB_API_KEY
// exports.handler = async function (event, context) {
// }
exports.handler = async function (event) {
  const payload = JSON.parse(event.body)
  const { title, type, year, page, id } = payload  
  // 단일, 여러
  const url = id 
  ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
  : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  try {
    const { data } = await axios.get(url)
    if (data.Error) {
      return {
        statusCode: 400,
        body: data.Error
      }
    }
    return {
      statusCode: 200,
      // 문자 데이터 화 하는게 필요
      body: JSON.stringify(data)
    }
  } catch (error) {
    return {
      statusCode: error.response.status,
      body: error.message
    }
  }
}
