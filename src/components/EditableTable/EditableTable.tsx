import React, { LegacyRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { Carousel } from 'primereact'
import { Image } from 'primereact/image'
import { IFormData } from '../../interfaces/DataTypes'
import { IColumn } from '../../lib/columns'
import styles from './EditableTable.module.scss'
import { ImageBodyTemplate } from '../ImageBodyTemplate/ImageBodyTemplate'

interface EditableTableProps {
  dt?: LegacyRef<DataTable>
  data: IFormData[]
  columns: IColumn[]
  onChange: (data: IFormData) => void
}

interface RowEvent {
  data: IFormData
  newData: IFormData
  index: number
  field: string
}

export const EditableTable: React.FC<EditableTableProps> = ({ dt, data, columns, onChange }) => {
  const onRowEditComplete = (e: RowEvent) => {
    onChange(e.newData)
  }

  const textEditor = (options: any) => {
    return (
      <>
        {options.field !== 'photos' ? (
          <InputText
            type="text"
            value={options.value}
            onChange={(e) => options.editorCallback(e.target.value)}
          />
        ) : (
          <ImageBodyTemplate data={options.rowData} />
        )}
      </>
    )
  }

  const productTemplate = (product: string) => {
    return <Image src={product} alt="photo" imageClassName={styles.image} preview />
  }

  const imageBodyTemplate = (rowData: IFormData): JSX.Element => {
    const src = rowData.photos.length ? rowData.photos[rowData.photos.length - 1] : ''
    if (src) {
      return (
        <Carousel
          value={rowData.photos}
          numVisible={1}
          numScroll={1}
          itemTemplate={productTemplate}
          verticalViewPortHeight="90px"
        />
      )
    } else {
      return <span>Нет фото</span>
    }
  }

  return (
    <>
      <DataTable
        ref={dt}
        value={data}
        editMode="row"
        dataKey="id"
        onRowEditComplete={onRowEditComplete}
        responsiveLayout="scroll"
        paginator
        rows={10}
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
              body={field === 'photos' ? imageBodyTemplate : null}
            />
          )
        })}
      </DataTable>
    </>
  )
}
