import React from 'react'
import { useGetProjectsQuery, useGetTeamQuery } from '../features/apiSlice'
import Project from './Project'
import Team from './Team'
import Skeleton from 'react-loading-skeleton'

export default function SideBar() {
  const {data:projects}=useGetProjectsQuery();
  const {data:team,isLoading}=useGetTeamQuery()
  return (
    <div class="sidebar">
    <div>
      <h3 class="text-xl font-bold">Projects</h3>
      <div class="mt-3 space-y-4">
        {isLoading && <Skeleton count={7}/>}
        {projects?.map(p=> <Project project={p} key={p.id}/>)}
      </div>
    </div>
    <div class="mt-8">
      <h3 class="text-xl font-bold">Team Members</h3>
      <div class="mt-3 space-y-4">
        {isLoading && <Skeleton count={8}/>}
        {team?.map(t=><Team team={t} key={t.id}/>)}
      </div>
    </div>
  </div>
  )
}
