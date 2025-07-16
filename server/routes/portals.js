// server/routes/portals.js
const express = require('express')
const router = express.Router()
const { createTestPortals } = require('../data/portals')

// GET all portals
router.get('/', (req, res) => {
  const portalList = createTestPortals()
  if (!portalList || portalList.length === 0) {
    return res.status(200).json([]);
  }
  res.json(portalList)
})

// POST new portal
router.post('/', (req, res) => {
  const newPortal = { id: Date.now(), ...req.body }
  portalList.push(newPortal)
  res.status(201).json(newPortal)
})

// PUT update portal
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const index = portalList.findIndex(p => p.id === id)
  if (index === -1) return res.status(404).send()
  portalList[index] = { id, ...req.body }
  res.json(portalList[index])
})

// DELETE portal
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const index = portalList.findIndex(p => p.id === id)
  if (index === -1) return res.status(404).send()
  portalList.splice(index, 1)
  res.status(204).send()
})

module.exports = router
