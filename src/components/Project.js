import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setFilterBy } from '../features/filterSlice';

export default function Project({project}) {
  const dispatch=useDispatch()
  const {projectName,colorClass}=project||{};
  const [checked,setChecked]=useState(true)

  const handleChecked=()=>{
      dispatch(setFilterBy(projectName))
  }

  return (
    <div class="checkbox-container">
        <input type="checkbox" class={colorClass} checked={checked} onChange={(e)=>{
          setChecked(!checked);
          handleChecked()
        }}/>
        <p class="label">{projectName}</p>
    </div>
  )
}
