import { useState } from 'react'
import Tasks from './Tasks.jsx'

export default function ProjectDetails({
  project,
  onDelete,
  onAddTask,
  onDeleteTask,
  onEditTask,
  onUpdateProject,
  tasks,
}) {
  const [isEditing, setIsEditing] = useState({
    title: false,
    description: false,
    dueDate: false,
  })
  const [editedProject, setEditedProject] = useState({
    title: project.title,
    description: project.description,
    dueDate: project.dueDate,
  })

  const formattedDate = new Date(project.dueDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  function handleEditChange(field, value) {
    setEditedProject((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  function startEditing(field) {
    setIsEditing((prev) => ({
      ...prev,
      [field]: true,
    }))
    setEditedProject((prev) => ({
      ...prev,
      [field]: project[field],
    }))
  }

  function cancelEditing(field) {
    setIsEditing((prev) => ({
      ...prev,
      [field]: false,
    }))
    setEditedProject((prev) => ({
      ...prev,
      [field]: project[field],
    }))
  }

  function saveField(field, event) {
    if (event) {
      event.preventDefault()
    }

    if (editedProject[field].trim() !== '' || field === 'dueDate') {
      onUpdateProject({
        ...project,
        [field]: editedProject[field],
      })

      setIsEditing((prev) => ({
        ...prev,
        [field]: false,
      }))
    }
  }

  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          {isEditing.title ? (
            <form onSubmit={(e) => saveField('title', e)} className="flex-1">
              <input
                type="text"
                className="text-3xl font-bold w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600 mb-2"
                value={editedProject.title}
                onChange={(e) => handleEditChange('title', e.target.value)}
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="text-green-600 hover:text-green-800"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="text-stone-500 hover:text-stone-700"
                  onClick={() => cancelEditing('title')}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <h1
              className="text-3xl font-bold text-stone-600 mb-2 cursor-pointer hover:bg-stone-100 p-1 rounded"
              onClick={() => startEditing('title')}
            >
              {project.title}
            </h1>
          )}
          <div className="flex gap-2">
            <button
              className="text-stone-600 hover:text-stone-950"
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        </div>

        {isEditing.dueDate ? (
          <form onSubmit={(e) => saveField('dueDate', e)} className="mb-4">
            <input
              type="date"
              className="p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
              value={editedProject.dueDate}
              onChange={(e) => handleEditChange('dueDate', e.target.value)}
              autoFocus
            />
            <div className="flex gap-2 mt-1">
              <button
                type="submit"
                className="text-green-600 hover:text-green-800"
              >
                Save
              </button>
              <button
                type="button"
                className="text-stone-500 hover:text-stone-700"
                onClick={() => cancelEditing('dueDate')}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <p
            className="mb-4 text-stone-400 cursor-pointer hover:bg-stone-100 p-1 rounded inline-block"
            onClick={() => startEditing('dueDate')}
          >
            {formattedDate}
          </p>
        )}

        {isEditing.description ? (
          <form onSubmit={(e) => saveField('description', e)}>
            <textarea
              className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
              value={editedProject.description}
              onChange={(e) => handleEditChange('description', e.target.value)}
              autoFocus
              rows={5}
            />
            <div className="flex gap-2 mt-1">
              <button
                type="submit"
                className="text-green-600 hover:text-green-800"
              >
                Save
              </button>
              <button
                type="button"
                className="text-stone-500 hover:text-stone-700"
                onClick={() => cancelEditing('description')}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <p
            className="text-stone-600 whitespace-pre-wrap cursor-pointer hover:bg-stone-100 p-1 rounded"
            onClick={() => startEditing('description')}
          >
            {project.description}
          </p>
        )}
      </header>
      <Tasks
        onAdd={onAddTask}
        onDelete={onDeleteTask}
        onEdit={onEditTask}
        tasks={tasks}
      />
    </div>
  )
}
