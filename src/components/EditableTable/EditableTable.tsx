import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { IFormData } from '../../interfaces/IFormData'
import { Paginator } from 'primereact/paginator'

interface EditableTableProps {
  data: IFormData[]
  onChange: (data: IFormData) => void
}

interface RowEvent {
  data: IFormData
  newData: IFormData
  index: number
  field: string
}

export const EditableTable: React.FC<EditableTableProps> = ({ data, onChange }) => {
  const [page, setPage] = useState(3)
  const [rows, setRows] = useState(10)

  const onRowEditComplete = (e: RowEvent) => {
    onChange(e.newData)
  }

  const textEditor = (options: any) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    )
  }

  const columns = [
    { field: 'company', header: 'Организация', width: '10%' },
    { field: 'name', header: 'Имя', width: '10%' },
    { field: 'category', header: 'Тип организации', width: '10%' },
    { field: 'phone', header: 'Телефон', width: '10%' },
    { field: 'email', header: 'Почта', width: '10%' },
    { field: 'city', header: 'Город', width: '10%' },
    { field: 'info', header: 'Описание', width: '10%' },
    { field: 'editor', width: '10%' }
  ]

  const pageChange = (e: any) => {
    setPage(e.page)
    setRows(e.rows)
  }

  return (
    <>
      <DataTable
        value={data}
        editMode="row"
        dataKey="id"
        onRowEditComplete={onRowEditComplete}
        responsiveLayout="scroll"
        paginator
        rows={rows}
      >
        {columns.map(({ field, header, width }) => {
          return (
            <Column
              key={field}
              field={field}
              header={header}
              style={{ width }}
              editor={(options) => textEditor(options)}
              rowEditor={field === 'editor'}
              headerStyle={field === 'editor' ? { minWidth: '8rem' } : {}}
              bodyStyle={field === 'editor' ? { textAlign: 'center' } : {}}
            />
          )
        })}
      </DataTable>
    </>
  )
}
