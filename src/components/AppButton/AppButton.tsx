import React from 'react'
import { Button } from 'primereact/button'

interface AppButtonProps {
  label: string
  className?: string
  onClick?: () => void
}

export const AppButton: React.FC<AppButtonProps> = ({ label, className, onClick }) => {
  return (
    <>
      <Button label={label} onClick={onClick} className={className} />
    </>
  )
}
