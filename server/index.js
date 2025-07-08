const express = require('express')
const cors = require('cors')

const app = express()
const port = 7000

app.use(cors())
app.use(express.json())

let users = [
  { id: 1, email: "george.bluth@reqres.in", first_name: "George", last_name: "Bluth" },
  { id: 2, email: "janet.weaver@reqres.in", first_name: "Janet", last_name: "Weaver" },
  { id: 3, email: "george.bluth@reqres.in", first_name: "hi", last_name: "hello" },
  { id: 4, email: "janet.weaver@reqres.in", first_name: "w", last_name: "dsdgd" },
  { id: 5, email: "george.bluth@reqres.in", first_name: "er", last_name: "sdf" },
  { id: 6, email: "janet.weaver@reqres.in", first_name: "tere", last_name: "serew" },
]

app.get('/api/users', (req, res) => {
  res.json(users)
})

app.post('/api/users', (req, res) => {
  const newUser = { id: Date.now(), ...req.body }
  users.push(newUser)
  res.status(201).json(newUser)
})

app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const index = users.findIndex(u => u.id === id)
  if (index === -1) return res.status(404).send()
  users[index] = { id, ...req.body }
  res.json(users[index])
})

app.delete('/api/users/:id', (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id))
  res.status(204).send()
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
