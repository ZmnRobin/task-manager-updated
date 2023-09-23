import React from 'react'
import SideBar from '../components/SideBar'
import TaskList from '../components/TaskList'

export default function Home() {
  return (
    <div class="container relative">
        <SideBar/>
        <TaskList/>
    </div>
  )
}
