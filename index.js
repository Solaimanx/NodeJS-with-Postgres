const express = require('express')
const PORT = 3000
const app = express()



app.use(express.json())

app.listen(PORT, function(){
    console.log(`server is running on port ${PORT}`)
})

