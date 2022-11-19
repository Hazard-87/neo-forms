import React, { useContext, useRef } from 'react'
import { RegistrationForm } from '../components/RegistrationForm/RegistrationForm'
import styles from '../styles/Home.module.scss'
import { Toast } from 'primereact/toast'
import { Link } from 'react-router-dom'
import { AppButton } from '../components/AppButton/AppButton'
import { Context } from '../App'
import { AppProgressBar } from '../components/AppProgressBar/AppProgressBar'
import { Data, IFormData } from '../interfaces/DataTypes'

const Home = () => {
  const { db, setDoc, doc, photos, setPhotos } = useContext(Context)
  const toast = useRef(null)
  const [fetching, setFetching] = React.useState<boolean>(false)
  // const [photos, setPhotos] = React.useState<string[]>([])
  const [localFiles, setLocalFiles] = React.useState<IFormData[]>([])

  const values: Data = {
    company: '',
    name: '',
    category: '',
    phone: '',
    email: '',
    city: '',
    comment: ''
  }

  React.useEffect(() => {
    const item = localStorage.getItem('formData')
    if (item) {
      setLocalFiles(JSON.parse(item))
    }
  }, [])

  const submitLocal = async () => {
    setFetching(true)
    const promise = localFiles.map((item: IFormData) => {
      return setDoc(doc(db, 'forms', item.id.toString()), item)
    })
    Promise.all(promise)
      .then(() => {
        localStorage.setItem('formData', JSON.stringify([]))
        setLocalFiles([])
        if (toast.current) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          toast.current.show({
            severity: 'success',
            summary: 'Успешно',
            detail: 'Данные успешно отправлены'
          })
        }
      })
      .catch(() => {
        if (toast.current) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          toast.current.show({
            severity: 'error',
            summary: 'Ошибка',
            detail:
              'Произошла ошибка. Данные сохранены и будут отправлены при подключении к интернету'
          })
        }
      })
      .finally(() => {
        setFetching(false)
      })
  }

  const handleSubmit = async (data: IFormData) => {
    const item = localStorage.getItem('formData')
    const itemData = item ? JSON.parse(item) : []
    itemData.push(data)
    localStorage.setItem('formData', JSON.stringify(itemData))

    try {
      setFetching(true)
      await setDoc(doc(db, 'forms', data.id.toString()), data)
      if (toast.current) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        toast.current.show({
          severity: 'success',
          summary: 'Успешно',
          detail: 'Данные успешно отправлены'
        })
      }
      const items = localStorage.getItem('formData')
      if (items) {
        const formData = JSON.parse(items).filter((fd: IFormData) => fd.id !== data.id)
        localStorage.setItem('formData', JSON.stringify(formData))
      }
    } catch (e) {
      setLocalFiles(itemData)
      if (toast.current) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        toast.current.show({
          severity: 'error',
          summary: 'Ошибка',
          detail:
            'Произошла ошибка. Данные сохранены и будут отправлены при подключении к интернету'
        })
      }
    } finally {
      setFetching(false)
    }
  }

  const removePhotos = () => {
    setPhotos([])
  }

  return (
    <div className={styles.content}>
      <Toast ref={toast} position="bottom-center" />
      <AppProgressBar fetching={fetching} />

      <RegistrationForm
        defaultValues={values}
        photos={photos}
        localFiles={localFiles}
        onSubmit={handleSubmit}
        submitLocal={submitLocal}
        removePhotos={removePhotos}
      />
      <Link to="/result" className={styles.link}>
        <AppButton label="Заполненные данные" className="p-button-text" />
      </Link>
    </div>
  )
}

export default Home
