import React from 'react'
import { InputText } from 'primereact/inputtext'

interface AppInputProps {
  value: string
  onChange: (e: string) => void
}

export const AppInput: React.FC<AppInputProps> = ({ value, onChange }) => {
  return (
    <>
      <InputText
        className={'p-inputtext-sm'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  )
}
