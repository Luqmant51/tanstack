// routes/users.js
const express = require('express')
const router = express.Router()
const { users } = require('../data/users')

let userList = users // local reference to allow mutation

router.get('/', (req, res) => {
  res.json(userList)
})

router.post('/', (req, res) => {
  const newUser = { id: Date.now(), ...req.body }
  userList.push(newUser)
  res.status(201).json(newUser)
})

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const index = userList.findIndex(u => u.id === id)
  if (index === -1) return res.status(404).send()
  userList[index] = { id, ...req.body }
  res.json(userList[index])
})

router.delete('/:id', (req, res) => {
  userList = userList.filter(u => u.id !== parseInt(req.params.id))
  res.status(204).send()
})

module.exports = router
