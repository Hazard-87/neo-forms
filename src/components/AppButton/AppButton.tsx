import React from 'react'
import { Button } from 'primereact/button'

interface AppButtonProps {
  label: string
  icon?: string
  className?: string
  onClick?: () => void
}

export const AppButton: React.FC<AppButtonProps> = ({ icon, label, className, onClick }) => {
  return (
    <>
      <Button icon={icon} label={label} onClick={onClick} className={className} />
    </>
  )
}
