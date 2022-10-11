import React from 'react'
import { Button } from 'primereact/button'

interface AppButtonProps {
  label: string
  onClick: () => void
}

export const AppButton: React.FC<AppButtonProps> = ({ label, onClick }) => {
  return (
    <>
      <Button label={label} onClick={onClick} />
    </>
  )
}
