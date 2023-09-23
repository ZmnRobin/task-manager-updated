import React from 'react'
import { useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import { setSearchedBy } from '../features/filterSlice'
import logo from '../images/logo.svg'

export default function Navbar() {
  const dispatch=useDispatch()

  const handleSearch=(v)=>{
    dispatch(setSearchedBy(v))
  }
  
  return (
    <nav class="container relative py-3">
        <div class="flex items-center justify-between">
        <Link to="/">
             <h1 style={{fontSize:'38px',fontWeight:'bolder'}}>Task Manager</h1>
            {/* <img src={logo} alt='logo'/> */}
        </Link>
        <div class="flex-1 max-w-xs search-field group">
            <i
            class="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"
            ></i>
            <input onChange={e=>handleSearch(e.target.value)}
            type="text"
            placeholder="Search Job"
            class="search-input"
            id="lws-searchJob"
            />
        </div>
        </div>
    </nav>
  )
}
