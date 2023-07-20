"use client"
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import TodoItem from './TodoItem';

type Todo = {
  id: string,
  message: string,
  isDone: boolean
}


const Todo = () => {
  const id = uuidv4()
  const [todos, setTodos] = useState<Todo[]>([])
  const [text, setText] = useState('')

  const onChangeHandler = (value: string) => {
    setText(value)
  }

  const addTodo = () => {
    setTodos(
      [
        ...todos,
        {
          id: id,
          message: text,
          isDone: false
        }
      ]
    )
    setText("")
  }


  const handleToggleTodo = (id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };


  return (
    <div>
      <div className='p-4 flex gap-2'>
        <input value={text} onChange={(e) => onChangeHandler(e.target.value)} className='border border-gray-400 rounded p-2' type='text' placeholder='type here...' />
        <button disabled={text.length < 1 ? true : false} className="border p-1 rounded text-white bg-blue-300 border-gray-400" onClick={() => addTodo()}>Add Todo</button>
      </div>

      <TodoItem todos={todos} handleToggleTodo={handleToggleTodo}/>
    </div>
  )
}

export default Todo