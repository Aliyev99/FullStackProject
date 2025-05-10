// import { useState } from 'react'
//import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Header from "./Header"
import { Outlet, useLocation } from 'react-router-dom'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import Footer from './Footer'
import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch } from '../store/store'
import LoadingComponent from './LoadingComponent'
import HomePage from '../../features/home/HomePage'
import { green } from '@mui/material/colors'
import { fetchCurrentuUserAsync } from '../../features/account/accauntSlice'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  // const [darkMode, setDarkMode] = useState(false);
  // const paletteType = 'light';
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();


  const initApp = useCallback(async () => {
    try {
      localStorage.getItem('token') && await dispatch(fetchCurrentuUserAsync())
      
    } catch (error) {
      console.log(error)
    }
  }, [dispatch]);

  // const {user} = useAppSelector(state => state.accaunt)
  // console.log(user)
  useEffect(() => {
    
    initApp().then(() => setLoading(false))
  }, [initApp])

  const theme = createTheme({
    palette: {
      primary: {
        light: green[50],
        main: green[900],
      },
      
      mode: 'light',
      background: {
        default: '#F9F9F9'
      }
    }
  })

  // if (loading) return 

  return (
    <div className='mainContainer'>
      <ThemeProvider theme={theme}>
        <ToastContainer position='bottom-right'/>
        <CssBaseline />
        <Header />
        
        {loading ? <LoadingComponent message={'Initializing app...'} />
          : location.pathname === '/' ? <div className='bodyContainer p-0'><HomePage /></div> : <div className='bodyContainer p-0'>
            <Outlet />
          </div>}
      
        {!loading && <Footer />}

      </ThemeProvider>
    </div>
  )
}

export default App
