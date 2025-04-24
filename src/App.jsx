import { useState, useEffect } from 'react'
import ProjectsSidebar from './components/ProjectsSidebar'
import NewProject from './components/NewProject'
import NoProjectSelected from './components/NoProjectSelected'
import ProjectDetails from './components/ProjectDetails'

function App() {
  const [projectsState, setProjectsState] = useState(() => {
    // Load data from localStorage on initial render
    const savedData = localStorage.getItem('projectManagementData')
    if (savedData) {
      return JSON.parse(savedData)
    } else {
      return {
        selectedProjectId: undefined,
        projects: [],
        tasks: {},
      }
    }
  })

  // Save data to localStorage whenever projectsState changes
  useEffect(() => {
    localStorage.setItem('projectManagementData', JSON.stringify(projectsState))
  }, [projectsState])

  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const taskId = Math.random().toString()
      const newTask = {
        id: taskId,
        text: text,
      }

      const updatedTasks = {
        ...prevState.tasks,
        [prevState.selectedProjectId]: [
          ...(prevState.tasks[prevState.selectedProjectId] || []),
          newTask,
        ],
      }

      return {
        ...prevState,
        tasks: updatedTasks,
      }
    })
  }

  function handleDeleteTask(id) {
    setProjectsState((prevState) => {
      const updatedTasks = {
        ...prevState.tasks,
        [prevState.selectedProjectId]: prevState.tasks[
          prevState.selectedProjectId
        ].filter((task) => task.id !== id),
      }

      return {
        ...prevState,
        tasks: updatedTasks,
      }
    })
  }

  function handleEditTask(id, newText) {
    setProjectsState((prevState) => {
      const updatedTasks = {
        ...prevState.tasks,
        [prevState.selectedProjectId]: prevState.tasks[
          prevState.selectedProjectId
        ].map((task) => (task.id === id ? { ...task, text: newText } : task)),
      }

      return {
        ...prevState,
        tasks: updatedTasks,
      }
    })
  }

  function handleUpdateProject(updatedProject) {
    setProjectsState((prevState) => {
      const updatedProjects = prevState.projects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )

      return {
        ...prevState,
        projects: updatedProjects,
      }
    })
  }

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      }
    })
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      }
    })
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      }
    })
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const projectId = Math.random().toString()
      const newProject = {
        ...projectData,
        id: projectId,
      }

      return {
        ...prevState,
        selectedProjectId: projectId,
        projects: [...prevState.projects, newProject],
      }
    })
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      }
    })
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  )

  let content = <NoProjectSelected onStartAddProject={handleStartAddProject} />

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    )
  } else if (projectsState.selectedProjectId) {
    content = (
      <ProjectDetails
        project={selectedProject}
        onDelete={handleDeleteProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
        onUpdateProject={handleUpdateProject}
        tasks={projectsState.tasks[projectsState.selectedProjectId] || []}
      />
    )
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        onStartAddProject={handleStartAddProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  )
}

export default App
