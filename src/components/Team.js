import React from 'react'

export default function Team({team}) {
  const {name,avatar}=team||{};
  return (
    <div class="checkbox-container">
        <img src={avatar} alt='sumit' class="team-avater" />
        <p class="label">{name}</p>
    </div>
  )
}
