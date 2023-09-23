import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useEditTasksMutation, useGetProjectsQuery, useGetTasksQuery, useGetTeamQuery } from '../features/apiSlice';

export default function EditTask() {
    const {id}=useParams()
    const navigate=useNavigate()
    const {data:projects}=useGetProjectsQuery();
    const {data:team}=useGetTeamQuery()
    const {data:tasks}=useGetTasksQuery()
    const [editTasks]=useEditTasksMutation()

    const [taskName , setTaskName] = useState('')
    const [assign , setAssign] = useState('')
    const [projectName , setProjectName] = useState('')
    const [deadline , setDeadline] = useState('')
    

    useEffect(() => {
        let editAbleTask=tasks?.filter((task)=>task.id.toString()===id.toString());
        if (editAbleTask) {
           setTaskName(editAbleTask[0]?.taskName)
           setAssign(editAbleTask[0]?.teamMember.name)
           setProjectName(editAbleTask[0]?.project.projectName)
           setDeadline(editAbleTask[0]?.deadline)
        }

    }, [id, tasks])

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
      const data={
        "taskName": taskName,
        "teamMember": assign,
        "project": projectName,
        "deadline": deadline,
      }
      editTasks({id,data})
      navigate('/')
    }

  return (
  <div class="container relative">
        <main class="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
          <h1 class="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
            Edit Task 
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
                  value={taskName}
                  onChange={e=>setTaskName(e.target.value)}
                />
              </div>

              <div class="fieldContainer">
                <label>Assign To</label>
                <select name="teamMember" id="lws-teamMember" required onChange={e=>handleTeam(e.target.value)}>
                  <option value={assign} hidden selected>Select Job</option>
                  {team?.map(t=> <option value={t.name} key={t.id}>{t.name}</option>)}
                </select>
              </div>
              <div class="fieldContainer">
                <label for="lws-projectName">Project Name</label>
                <select id="lws-projectName" name="projectName" required onChange={e=>handleProject(e.target.value)}>
                  <option value={projectName} hidden selected>Select Project</option>
                  {projects?.map(p=> <option value={p.projectName} key={p.id}>{p.projectName}</option>)}
                </select>
              </div>

              <div class="fieldContainer">
                <label for="lws-deadline">Deadline</label>
                <input type="date" name="deadline" id="lws-deadline" value={deadline} required  onChange={e=>setDeadline(e.target.value)}/>
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
