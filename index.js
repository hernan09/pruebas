const express = require('express')
const path = require('path')
const producto = require('./squema/squema')

let app = express()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.set('port', process.env.PORT || 4000)

app.listen(app.get('port'), (err) => {
    if (err) console.log(`${err}`)

    console.log('http://localhost:4000')
})
app.post('/new', (req, res) => {
    producto1 = new producto()
    producto1.name = req.body.name,
        producto1.price = req.body.price

    producto1.save((err, productoGuardado) => {
        if (err) res.status(500).send(`${err}`)

        res.redirect('/new')
    })

})

app.get('/new', (req, res) => {
    producto.find({}, (err, producto) => {
        if (err) res.status(500).send(`${err}`)

        res.render('index', { data: producto })
    })


})