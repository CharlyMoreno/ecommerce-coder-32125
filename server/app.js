const express = require('express')
const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/',(req, res) => {
    res.status(200).json({"mensaje":"Hola Mundo"})
})

module.exports = {app}
