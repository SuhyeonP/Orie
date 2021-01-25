const axios=require('axios')

const API_EndPoint="https://jsonplaceholder.typicode.com"

module.exports={
    findOne(id){
        return axios.get(`${API_EndPoint}/users/${id}`)
            .then((response)=>response.data)
    }
}
