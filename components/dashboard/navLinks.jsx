import React from 'react'
import { Link as Nav, useResolvedPath, useMatch } from 'react-router-dom'

export default function NavLink({ to, children }) {
  let resolved = useResolvedPath(to)
  let match = useMatch({
    path: resolved.pathname,
    end: true,
  })

  return (
    <Nav to={to} className={match ? `text-lime-500 rounded-lg` : `text-gray-500`}>
      <button className="flex gap-4 items-center font-semibold w-44 h-10 p-3 transition-colors">
        {children}
      </button>
    </Nav>
  )
}
