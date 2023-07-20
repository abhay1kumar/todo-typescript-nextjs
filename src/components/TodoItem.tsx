import React, { useEffect, useState } from 'react'


interface Todo {
  id: string;
  message: string;
  time: string;
  isDone: boolean;
}

interface TodosProps {
  todos: Todo[];
  handleToggleTodo: (id: string) => void;
}

interface TimerProps {
  initialTime: number;
}

const Timer = ({ initialTime }: TimerProps) => {
  const [remainingTime, setRemainingTime] = useState<number>(initialTime * 60);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(prevTime => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return <span>{remainingTime > 0 ? formatTime(remainingTime) : '00:00'}</span>;
};

const TodoItem = ({ todos, handleToggleTodo }: TodosProps) => {
  return (
    <>
      {todos && todos.map((val, index) => {
        const statusClass = val.isDone ? 'bg-green-600' : 'bg-yellow-500';
        const stringValue: string = val.time;
        const numberValue: number = parseInt(stringValue);
        return <div className=' mt-2 flex gap-2 p-1 border border-grey-400 max-w-md justify-between' key={index}>
          <textarea readOnly value={val.message} className='p-1 font-medium ' />
          {
            !val.isDone && <Timer initialTime={numberValue} />
          }
          <button onClick={() => handleToggleTodo(val.id)}><span className={`p-2 rounded ${statusClass}`}> {val.isDone ? "Completed" : "Pending"}</span></button>
        </div>
      })}
    </>
  )
}

export default TodoItem