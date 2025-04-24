import { useRef } from 'react'

export default function NewProject({ onAdd, onCancel }) {
  const title = useRef()
  const description = useRef()
  const dueDate = useRef()

  function handleSubmit(event) {
    event.preventDefault()

    const enteredTitle = title.current.value
    const enteredDescription = description.current.value
    const enteredDueDate = dueDate.current.value

    // validation could be added here

    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    })
  }

  return (
    <div className="w-[35rem] mt-16">
      <div>
        <form className="mt-4" onSubmit={handleSubmit}>
          <menu className="flex items-center justify-end gap-4 my-4">
            <li>
              <button
                type="button"
                className="text-stone-800 hover:text-stone-950"
                onClick={onCancel}
              >
                Cancel
              </button>
            </li>
            <li>
              <button
                type="submit"
                className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
              >
                Save
              </button>
            </li>
          </menu>
          <div className="flex flex-col gap-1 my-4">
            <label className="text-sm font-bold uppercase text-stone-500">
              TITLE
            </label>
            <input
              ref={title}
              type="text"
              className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
            />
          </div>

          <div className="flex flex-col gap-1 my-4">
            <label className="text-sm font-bold uppercase text-stone-500">
              DESCRIPTION
            </label>
            <textarea
              ref={description}
              className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
            />
          </div>

          <div className="flex flex-col gap-1 my-4">
            <label className="text-sm font-bold uppercase text-stone-500">
              DUE DATE
            </label>
            <input
              ref={dueDate}
              type="date"
              className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
            />
          </div>
        </form>
      </div>
    </div>
  )
}
