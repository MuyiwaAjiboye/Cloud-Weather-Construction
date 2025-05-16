import express from 'express'
import sql from 'mssql'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import process from 'process'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// serve static files from dist directory
app.use(express.static(join(__dirname, 'dist')))

// db configuration
const dbConfig = {
  user: 'adminuser',
  password: 'dotun@12345',
  server: 'construction-sql-main-db.database.windows.net',
  database: 'constructionSiteDB',
  options: {
    encrypt: true,
  },
}

// API endpoint to get all projects
app.get('/api/projects', async (req, res) => {
  try {
    await sql.connect(dbConfig)
    const result = await sql.query`SELECT * FROM Projects`

    // transform thhe data format
    const projects = result.recordset.map((project) => {
      // extract lat and lng from Geolocation string
      const [lat, lng] = project.Geolocation.split(',').map((coord) => parseFloat(coord.trim()))

      return {
        Project_id: project.Project_id,
        'Project Name': project.Project_Name,
        Description: project.Description,
        Manager: project.Manager,
        Location: project.Location,
        Geolocation: { lat, lng },
      }
    })

    res.json(projects)
  } catch (err) {
    console.error('Database error:', err)
    res.status(500).send('Server error')
  }
})

// API endpoint for single project
app.get('/api/projects/:id', async (req, res) => {
  try {
    const id = req.params.id
    await sql.connect(dbConfig)
    const result = await sql.query`SELECT * FROM Projects WHERE Project_id = ${id}`

    if (result.recordset.length === 0) {
      return res.status(404).send('Project not found')
    }

    const project = result.recordset[0]
    const [lat, lng] = project.Geolocation.split(',').map((coord) => parseFloat(coord.trim()))

    const formattedProject = {
      Project_id: project.Project_id,
      'Project Name': project.Project_Name,
      Description: project.Description,
      Manager: project.Manager,
      Location: project.Location,
      Geolocation: { lat, lng },
    }

    res.json(formattedProject)
  } catch (err) {
    console.error('Database error:', err)
    res.status(500).send('Server error')
  }
})

// handle Vue Router - return index.html for any requests that don't match above
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
