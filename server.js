const express = require('express')
const sql = require('mssql')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3000

// Serve static files from the dist folder (after Vue build)
app.use(express.static(path.join(__dirname, 'dist')))

// Database configuration
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

    // Transform data to match your existing format
    const projects = result.recordset.map((project) => {
      // Extract lat and lng from Geolocation string
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

// API endpoint to get a single project by ID
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

// Handle Vue Router - return index.html for any requests that don't match above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
