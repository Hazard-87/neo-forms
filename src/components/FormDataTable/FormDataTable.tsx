import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppSpinner } from '../AppSpinner/AppSpinner'
import { EditableTable } from '../EditableTable/EditableTable'
import { IFormData } from '../../interfaces/IFormData'
import columns from '../../lib/columns'
import { Context } from '../../index'
import styles from './FormDataTable.module.scss'
import { AppButton } from '../AppButton/AppButton'

export const FormDataTable: React.FC = () => {
  const dt = useRef<any>(undefined)
  const { getDocs, query, collection, db, updateDoc, doc } = useContext(Context)
  const [data, setData] = useState<IFormData[]>([])
  const [fetching, setFetching] = React.useState<boolean>(false)

  const getData = async () => {
    try {
      setFetching(true)
      const q = query(collection(db, 'forms'))
      const querySnapshot = await getDocs(q)
      const items: IFormData[] = []
      // eslint-disable-next-line @typescript-eslint/no-shadow
      querySnapshot.forEach((doc: { data(): IFormData }) => {
        items.push(doc.data())
      })
      setData(items)
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handleSubmit = async (newData: IFormData): Promise<void> => {
    try {
      setFetching(true)
      await updateDoc(doc(db, 'forms', newData.id.toString()), newData)
      const items = data.map((item) => {
        if (item.id === newData.id) {
          return newData
        } else {
          return item
        }
      })
      setData(items)
    } catch (e) {
      console.log(e)
    } finally {
      setFetching(false)
    }
  }

  const exportCSV = (selectionOnly: boolean) => {
    if (dt.current) {
      dt.current.exportCSV({ selectionOnly })
    }
  }

  return (
    <>
      <AppSpinner fetching={fetching} />
      <div className={styles.header}>
        <AppButton icon="pi pi-file" label="Экспорт CSV" onClick={() => exportCSV(false)} />
        <Link to="/">
          <AppButton label="Форма для заполнения" className="p-button-text" />
        </Link>
      </div>
      <EditableTable dt={dt} data={data} onChange={handleSubmit} columns={columns} />
    </>
  )
}
