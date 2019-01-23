const express = require('express')
const path = require('path')
const BodyParser = require('body-parser')
const producto = require('./squema/squema')
const morgan = require('morgan')
const mongose = require('mongoose')
const multer = require('multer')
    //multer config subida imagenes
const storage = multer.diskStorage({
    destination: path.join(__dirname, '/public/uploads'),
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})




let app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
    //le paso el storage creado antes para asignar una extencion a la imagen
app.use(multer({ storage }).single('foto'));

app.use(express.static(path.join(__dirname, 'public')))

app.use(BodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.set('port', process.env.PORT || 5000)


mongose.connect('mongodb://localhost:27017/producto', {
    useNewUrlParser: true
}, (err) => {
    if (err) console.log(`${err}`)

    console.log('se a conectado a la base de datos')
    app.listen(app.get('port'), (err) => {
        if (err) console.log(`${err}`)

        console.log(`http://localhost:${app.get('port')}/product`)
    })
})


app.post('/new', (req, res) => {
    let producto1 = new producto()
    producto1.nombre = req.body.nombre
    producto1.price = req.body.price
    producto1.foto = '/uploads' + req.file.originalname

    console.log(req.file)



    producto1.save((err, productoGuardado) => {
        if (err) res.status(500).send(`${err}`)

        res.redirect('/product')
    })




})





app.get('/product', (req, res) => {

    producto.find({}, (err, productosencontrado) => {
        res.render('index', { data: productosencontrado })
    })
})

app.get('/delete/:id', (req, res) => {
    let id = req.params.id

    producto.findByIdAndDelete(id, (err, producto) => {
        if (err) res.status(500).send(`${err}`)

        res.redirect('/product')
    })



})
app.get('/edit/:id', (req, res) => {
    let id = req.params.id
    producto.findById(id, (err, productoencontrado) => {
        if (err) res.status(500).send(`${err}`)

        res.render('show', { data: productoencontrado })

    })

})

app.post('/update/:id', (req, res) => {
    let id = req.params.id
    let cuerpo = req.body

    producto.findByIdAndUpdate(id, cuerpo, (err, productoup) => {
        if (err) res.status(500).send(`${err}`)

        res.redirect('/product')
    })

})