const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

app.set("view engine", "ejs");
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")))

app.get('/', (req, res) => {
    fs.readdir(`./files`, function(err, files){
        // console.log(files)
        res.render('index', {files:files})
    })
})
app.get('/files/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, 'utf8', function(err, data){
        if(err){
            console.log(err)
        } else {
            res.render('show', {filename: req.params.filename, data: data})
        }
    })
})

app.get('/edit/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, 'utf8', function(err, data){
        if(err){
            console.log(err)
        } else {
            res.render('edit', {filename: req.params.filename, data: data})
        }
    })
})

app.post('/edit', (req, res) => {
    console.log(req.body)
    fs.rename(`./files/${req.body.prevTitle}`, `./files/${req.body.newTitle}`, function(err){
        if(err){
            console.log(err)
        } else {
            res.redirect('/')
        }
    })
})


app.post('/create', (req, res) => {
//    console.log(req.body)
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err){
        if(err){
            console.log(err)
        } else {
            res.redirect('/')
        }
})

})


app.listen(3000, () => {
    console.log('Server is running on port 3000')
})