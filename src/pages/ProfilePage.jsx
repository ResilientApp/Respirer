import React from 'react'
import Profile from '../components/Profile'
import { AuthProvider } from '../context/AuthContext'
import IndexNavbar from '../components/Navbars/IndexNavbar'
const ProfilePage= () => {
  return (
    <AuthProvider>
      <IndexNavbar/>
      <Profile/>
    </AuthProvider>  
  )
}
export default ProfilePage; 