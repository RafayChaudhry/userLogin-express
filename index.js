const http = require('http')
const app = require('./app')




const server =http.createServer(app);
const {API_PORT} = process.env

const port = process.env.PORT || API_PORT
// earlier i used to do
// const port = process.env.PORT || 3000


server.listen(port,()=>{
    console.log('server listening on port : ' + port);
})





