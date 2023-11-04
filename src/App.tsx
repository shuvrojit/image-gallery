
import { useState } from "react"
import Card from "./components/Card"

function App() {
  const [items, setItems] = useState(0)

  return (
    <>
      <h1>Image Gallery</h1>
      <p>{items} items selected</p>

      <Card items={items} setItems={setItems} />
    </>
  )
}

export default App
