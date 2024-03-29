import Room from './pages/Room'
import './App.css'
import { AuthProvider } from './utils/AuthContext'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import LoginPage from "./pages/LoginPage"
import PrivateRoutes from './components/PrivateRoutes'
import RegisterPage from './pages/RegisterPage'
function App() {
  return (
    <>
      <Router>
        <AuthProvider> 
          <Routes>
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/register' element={<RegisterPage/>} />

            <Route element={<PrivateRoutes/>}>
            <Route path='/' element={<Room/>} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App;
