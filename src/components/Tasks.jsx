import { useState, useRef } from 'react'

export default function Tasks({ tasks, onAdd, onDelete, onEdit }) {
  const [enteredTask, setEnteredTask] = useState('')
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [editedTaskText, setEditedTaskText] = useState('')

  function handleChange(event) {
    setEnteredTask(event.target.value)
  }

  function handleAddTask(event) {
    if (event) {
      event.preventDefault()
    }

    if (enteredTask.trim() === '') {
      return
    }
    onAdd(enteredTask)
    setEnteredTask('')
  }

  function startEditing(taskId, taskText) {
    setEditingTaskId(taskId)
    setEditedTaskText(taskText)
  }

  function handleEditChange(event) {
    setEditedTaskText(event.target.value)
  }

  function saveEdit(event, taskId) {
    if (event) {
      event.preventDefault()
    }

    if (editedTaskText.trim() !== '') {
      onEdit(taskId, editedTaskText)
      setEditingTaskId(null)
    }
  }

  function cancelEdit() {
    setEditingTaskId(null)
  }

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <form onSubmit={handleAddTask} className="flex items-center gap-4">
        <input
          type="text"
          className="w-64 px-2 py-1 rounded-sm bg-stone-200"
          onChange={handleChange}
          value={enteredTask}
        />
        <button type="submit" className="text-stone-700 hover:text-stone-950">
          Add Task
        </button>
      </form>
      {tasks.length === 0 && (
        <p className="text-stone-800 my-4">
          This project doesn't have any tasks yet.
        </p>
      )}
      {tasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between my-4">
              {editingTaskId === task.id ? (
                <form
                  onSubmit={(e) => saveEdit(e, task.id)}
                  className="flex-1 flex items-center gap-2"
                >
                  <input
                    type="text"
                    className="flex-1 px-2 py-1 rounded-sm bg-stone-200"
                    value={editedTaskText}
                    onChange={handleEditChange}
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="text-green-600 hover:text-green-800"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="text-stone-500 hover:text-stone-700"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <span className="flex-1">{task.text}</span>
                  <div className="flex gap-2">
                    <button
                      className="text-stone-600 hover:text-stone-950"
                      onClick={() => startEditing(task.id, task.text)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-stone-700 hover:text-red-500"
                      onClick={() => onDelete(task.id)}
                    >
                      Clear
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
