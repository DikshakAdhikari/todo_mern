import './App.css'
import  {BrowserRouter  as Router, Routes, Route} from 'react-router-dom'
import { Login } from './components/Login'
import { Signup } from './components/Signup'
import { TodoList } from './components/TodoList'


function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/signup' element= {<Signup />}  />
          <Route path='/login' element= {<Login />}  />
          <Route path='/todos' element= {<TodoList />}  />
        </Routes>
      </Router>
  
    </div>
  )
}

export default App
