import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { useGetTasksQuery } from '../features/apiSlice';
import SingleTask from './SingleTask'
import Skeleton from 'react-loading-skeleton';

export default function TaskList() {
  const {data:tasks,isLoading}=useGetTasksQuery();
  const {searchedBy,filterBy}=useSelector(state=>state.filter)

  const searchedTask=(task)=>{
    searchedBy.toLowerCase()
    if (searchedBy.length>0) {
      return task.taskName.toLowerCase().includes(searchedBy)
    }
    return true
  }

  const filterdTask=(item)=>{
    const firstArray = filterBy;
    return firstArray.includes(item.project.projectName);
  }

  return (
    <div class="lg:pl-[16rem] 2xl:pl-[23rem]">
    <main class="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
      <div class="justify-between mb-10 space-y-2 md:flex md:space-y-0">
        <Link to="/addNewTask" class="lws-addnew group">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6 group-hover:text-indigo-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span class="group-hover:text-indigo-500">Add New</span>
        </Link>
      </div>
       <div class="lws-task-list">
          {isLoading && <Skeleton count={10}/>}
          {tasks?.filter(filterdTask).filter(searchedTask).map(task=><SingleTask task={task} key={task.id}/>)}
        </div>
      </main>
    </div>
  )
}
