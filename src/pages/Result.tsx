import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../index'
import { IFormData } from '../interfaces/IFormData'
import styles from '../styles/Result.module.scss'
import { AppButton } from '../components/AppButton/AppButton'
import { Link } from 'react-router-dom'
import { ProgressSpinner } from 'primereact/progressspinner'
import { EditableTable } from '../components/EditableTable/EditableTable'

const Result = () => {
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

  return (
    <div className={styles.content}>
      {fetching ? (
        <div className={styles.center}>
          <ProgressSpinner />
        </div>
      ) : null}

      <EditableTable data={data} onChange={handleSubmit} />

      <Link to="/">
        <AppButton label="Форма для заполнения" className="p-button-text" />
      </Link>
    </div>
  )
}

export default Result
