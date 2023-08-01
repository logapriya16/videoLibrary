import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./components.css"
export default function Sidebar() {
    const navigate = useNavigate()
  return (
    <div className='sidebar_container'>
      <p onClick={()=>navigate('/')} className='sidenav-items' >Home</p>
      <p onClick={()=>navigate('/explore')} className='sidenav-items'>Explore</p>
      <p onClick={()=>navigate('/playlist')} className='sidenav-items'>Playlist</p>
      <p onClick={()=>navigate('/watchlater')} className='sidenav-items'>Watch Later</p>
    </div>
  )
}
