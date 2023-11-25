import { useState, useEffect } from 'react'

import './main.css'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err))
  }, []);

  return (
    <>
      <h1 className='text-3xl underline bg-green-500'>Coucou le front</h1>
    </>
  )
}

export default App
