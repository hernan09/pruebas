const express = require('express')


let app = express()

app.set('port', process.env.PORT || 4000)

app.listen(app.get('port'), (err) => {
    if (err) console.log(`${err}`)

    console.log('http://localhost:4000')
})


app.get('/new', (req, res) => {
    res.status(200).send('hola mundo')


})