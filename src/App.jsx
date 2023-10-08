import DocumentEditor from "./DocumentEditor"
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'
import "./App.css"

function App() {
  
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' exact element={<Navigate to={`/document/${crypto.randomUUID()}`}/>}/>
      <Route path='/document/:id' element={<DocumentEditor />}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
