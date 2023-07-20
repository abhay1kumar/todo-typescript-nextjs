import React from 'react'


interface Todo {
  id: string;
  message: string;
  isDone: boolean;
}

interface TodosProps {
  todos: Todo[];
  handleToggleTodo: (id: string) => void;
}

const TodoItem = ({ todos, handleToggleTodo }: TodosProps) => {
  return (
    <>
      {todos && todos.map((val, index) => {
        const statusClass = val.isDone ? 'bg-green-600' : 'bg-yellow-500';
        return <div className=' mt-2 flex gap-2 p-1 border border-grey-400 max-w-md justify-between' key={index}>
          <textarea readOnly value={val.message} className='p-1 font-medium ' />
          <button onClick={() => handleToggleTodo(val.id)}><span className={`p-2 rounded ${statusClass}`}> {val.isDone ? "Completed" : "Pending"}</span></button>
        </div>
      })}
    </>
  )
}

export default TodoItem