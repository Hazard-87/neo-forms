import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppSpinner } from '../AppSpinner/AppSpinner'
import { EditableTable } from '../EditableTable/EditableTable'
import { IFormData, SaveData } from '../../interfaces/DataTypes'
import columns from '../../lib/columns'
import { Context } from '../../index'
import styles from './FormDataTable.module.scss'
import { AppButton } from '../AppButton/AppButton'
import { saveAs } from 'file-saver'

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
      const itemsData = items.map((item) => item)
      console.log(itemsData)
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

  type KeysType = 'company' | 'name' | 'category' | 'phone' | 'email' | 'city'

  const handleSave = () => {
    const newData: SaveData[] = data.map((item) => {
      return {
        company: item.company,
        name: item.name,
        category: item.category,
        phone: item.phone,
        email: item.email,
        city: item.city
      }
    })
    const dataItem = newData[0]

    const keys: string[] = Object.keys(dataItem)
    const cols = columns.filter((item) => !['photos', 'editor'].includes(item.field))
    let result = ''

    cols.forEach((item, idx) => {
      const s = idx === cols.length - 1 ? '\n' : ';'
      result += item.header + s
    })

    newData.forEach(function (obj) {
      keys.forEach(function (k, idx) {
        const key = k as KeysType
        if (idx) {
          result += '\t'
        }
        result += obj[key]
      })
      result += '\n'
    })

    const blob = new Blob([result], { type: 'text/csv;charset=utf-8' })
    saveAs(blob, `save.csv`)
  }

  return (
    <>
      <AppSpinner fetching={fetching} />
      <div className={styles.header}>
        <AppButton icon="pi pi-file" label="Экспорт CSV" onClick={handleSave} />
        <Link to="/">
          <AppButton label="Форма для заполнения" className="p-button-text" />
        </Link>
      </div>
      <EditableTable dt={dt} data={data} onChange={handleSubmit} columns={columns} />
    </>
  )
}
