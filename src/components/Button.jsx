import { Icon } from '@iconify/react'
import React from 'react'

export const Button = ({ bgColor, textColor, icon, text, onClick }) => {
  return (
    <button className={`flex items-center justify-center gap-2 text-xs border font-sen tracking-tight hover:opacity-90 rounded-md w-auto text-${textColor} px-7 bg-${bgColor}`} onClick={() => onClick()}>
      {icon && (<Icon icon={icon} className={`text-${textColor} text-lg`} />)}
      {text?text:''}
    </button>
  )
}
