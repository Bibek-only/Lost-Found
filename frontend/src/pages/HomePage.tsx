import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import { getAuthStatus } from '../store/reducers/api/asynthunk/authAsyncThunk';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';


const HomePage = () => {
    
  return (
    <div>
        <NavBar></NavBar>
      Hello its is the home page
    </div>
  )
}

export default HomePage
