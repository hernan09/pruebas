const express = require('express')
const path = require('path')

let app = express()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.set('port', process.env.PORT || 4000)

app.listen(app.get('port'), (err) => {
    if (err) console.log(`${err}`)

    console.log('http://localhost:4000/new')
})


app.get('/new', (req, res) => {
    res.render('index')


})