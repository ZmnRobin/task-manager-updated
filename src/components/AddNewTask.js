import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAddTasksMutation, useGetProjectsQuery, useGetTeamQuery } from '../features/apiSlice';

export default function AddNewTask() {
  const navigate=useNavigate()
  const {data:projects}=useGetProjectsQuery();
  const {data:team}=useGetTeamQuery()
  const [addTasks,{isLoading}]=useAddTasksMutation()

  const [taskName , setTaskName] = useState('')
  const [assign , setAssign] = useState({})
  const [projectName , setProjectName] = useState({})
  const [deadline , setDeadline] = useState('')

  const handleTeam=(name)=>{
    const member=team?.filter(t=>t.name===name);
    setAssign(member[0])
  }

  const handleProject=(pName)=>{
    const filterProject=projects?.filter(p=>p.projectName===pName)
    setProjectName(filterProject[0])
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    addTasks({
      "taskName": taskName,
      "teamMember": assign,
      "project": projectName,
      "deadline": deadline,
      "status": "pending"
    })
    navigate('/')
  }

  return (
    <div class="container relative">
      <main class="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <h1 class="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
          Create Task for Your Team
        </h1>

        <div class="justify-center mb-10 space-y-2 md:flex md:space-y-0">
          <form class="space-y-6" onSubmit={handleSubmit}>
            <div class="fieldContainer">
              <label for="lws-taskName">Task Name</label>
              <input
                type="text"
                name="taskName"
                id="lws-taskName"
                required
                placeholder="Implement RTK Query"
                onChange={e=>setTaskName(e.target.value)}
              />
            </div>

            <div class="fieldContainer">
              <label>Assign To</label>
              <select name="teamMember" id="lws-teamMember" required onChange={e=>handleTeam(e.target.value)}>
                <option value="" hidden selected>Select Job</option>
                {team?.map(t=> <option value={t.name} key={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div class="fieldContainer">
              <label for="lws-projectName">Project Name</label>
              <select id="lws-projectName" name="projectName" required onChange={e=>handleProject(e.target.value)}>
                <option value="" hidden selected>Select Project</option>
                {projects?.map(p=> <option value={p.projectName} key={p.id}>{p.projectName}</option>)}
              </select>
            </div>

            <div class="fieldContainer">
              <label for="lws-deadline">Deadline</label>
              <input type="date" name="deadline" id="lws-deadline" required  onChange={e=>setDeadline(e.target.value)}/>
            </div>
            
            <div class="text-right">
              <button type="submit" class="lws-submit">Save</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
