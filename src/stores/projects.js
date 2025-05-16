import { defineStore } from 'pinia' // Import Pinia's defineStore function
import axios from 'axios'

// Define and export a Pinia store named 'projects'
export const useProjectsStore = defineStore('projects', {
  // data storage for the application
  state: () => ({
    projects: [], // store all construction projects
    selectedProject: null, // Currently selected project
    loading: false, // to track if data is being loaded
    error: null, //error messages storage from API calls
  }),

  getters: {
    // returning all projects
    getProjects: (state) => state.projects,

    // return the currently selected project
    getSelectedProject: (state) => state.selectedProject,
  },

  //  methods that can affect state and handle async operations
  actions: {
    // get all projects from the Azure SQL database via my API
    async fetchProjects() {
      try {
        this.loading = true // put a loading state

        // make a GET request to my  backend API
        // this endpoint connects to the azure sql db
        const response = await axios.get('/api/projects')

        // store the projects in the state
        this.projects = response.data

        this.loading = false // loading to false when complete
      } catch (error) {
        console.error('Error fetching projects:', error)
        this.error = error.message
        this.loading = false
      }
    },

    // getting a single project by id from the Azure SQL database
    async fetchProjectById(projectId) {
      try {
        this.loading = true

        // sending a get request for a specific project by the id
        const response = await axios.get(`/api/projects/${projectId}`)

        // store the selected project in state
        this.selectedProject = response.data

        this.loading = false
      } catch (error) {
        console.error('Error fetching project:', error)
        this.error = error.message
        this.loading = false
      }
    },
  },
})
