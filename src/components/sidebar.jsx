import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Sidebar() {
    const navigate = useNavigate()
  return (
    <div className='sidebar_container'>
      <p onClick={()=>navigate('/')}>Home</p>
      <p onClick={()=>navigate('/explore')}>Explore</p>
      <p onClick={()=>navigate('/playlist')}>Playlist</p>
      <p onClick={()=>navigate('/watchlater')}>Watch Later</p>
    </div>
  )
}
