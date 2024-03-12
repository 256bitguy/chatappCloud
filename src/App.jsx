import Room from './pages/Room'
import './App.css'
import { AuthProvider } from './utils/AuthContext'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import LoginPage from "./pages/LoginPage"
import PrivateRoutes from './components/PrivateRoutes'

function App() {
  return (
    <>
      <Router>
        <AuthProvider> 
          <Routes>
            <Route path='/login' element={<LoginPage/>} />
            <Route element={<PrivateRoutes/>}>
            <Route path='/room' element={<Room/>} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App;
