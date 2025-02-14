import { useState } from 'react'
import Header from "./components/Header";
import TodoList from "./components/TodoList";
//import Footer from "./components/Footer";

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow flex justify-center">
        <TodoList />
      </main>
     
    </div>
  )
}

export default App
