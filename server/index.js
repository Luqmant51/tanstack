const express = require('express')
const cors = require('cors')
const userRoutes = require('./routes/users.js')
const portalsRouter = require('./routes/portals')

const app = express()
const port = 7000

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}))

app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/portals', portalsRouter)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
