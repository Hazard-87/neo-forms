import React from 'react'
import { RadioButton } from 'primereact/radiobutton'

type ValueType = string | number | boolean

interface AppRadioButtonProps {
  value: ValueType
  name: string
  checked: boolean
  onChange: (e: ValueType) => void
}

export const AppRadioButton: React.FC<AppRadioButtonProps> = ({
  value,
  name,
  checked,
  onChange
}) => {
  return (
    <>
      <RadioButton
        value={value}
        name={name}
        onChange={(e) => onChange(e.value)}
        checked={checked}
      />
    </>
  )
}
