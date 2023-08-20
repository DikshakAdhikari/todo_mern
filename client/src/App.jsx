import './App.css'
import  {BrowserRouter  as Router, Routes, Route, useNavigate} from 'react-router-dom'
import { Login } from './components/Login'
import { Signup } from './components/Signup'
import { TodoList } from './components/TodoList'
import { RecoilRoot } from 'recoil';
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import axios from 'axios'
import { authState } from './store/atom/authState'


function App() {

  return (
    <div>
  <RecoilRoot>
      <Router>
        <Init />
        <Routes>
          <Route path='/signup' element= {<Signup />}  />
          <Route path='/login' element= {<Login />}  />
          <Route path='/todos' element= {<TodoList />}  />
        </Routes>
      </Router>
      </RecoilRoot>
  
    </div>
  )
}

const Init = ()=> {
  const navigate= useNavigate(); //best
  const setRecoilUsername= useSetRecoilState(authState)
  useEffect(()=> {
    //const token = localStorage.getItem("token");
    const fun = async()=> {
      try{
        const res= await axios.get('http://localhost:3000/user/me',{headers: {"Authorization":`Bearer ${localStorage.getItem('token')}`}});
     // console.log(res.data);

      if(res.data){
        setRecoilUsername({
          token:res.token,
          username:res.data
        })   
        navigate('/todos');
      }else{
        navigate('/login')
      }
      } catch(err){
        navigate('/login')
      }
      
      
    }
    fun();
  },[])
}

export default App
