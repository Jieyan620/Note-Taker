const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, notes) => {
    if (err) { console.log(err) }
    res.json(JSON.parse(notes))
  })
})

app.get('/notes/:item', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) { console.log(err) }
    const note = JSON.parse(data)
    res.json(note.filter(text => note.title === req.params.item)[0])
  })
})

app.post('/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) { console.log(err) }
    const note = JSON.parse(data)
    note.push(req.body)
    fs.writeFile('./db/db.json', JSON.stringify(note), err => {
      if (err) { console.log(err) }
      res.sendStatus(200)
    })
  })
})

app.listen(3000)
