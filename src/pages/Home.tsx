import React, { useContext, useRef } from 'react'
import { Data, FormData, RegistrationForm } from '../components/RegistrationForm/RegistrationForm'
import styles from '../styles/Home.module.scss'
import { Toast } from 'primereact/toast'
import { Link } from 'react-router-dom'
import { AppButton } from '../components/AppButton/AppButton'
import { Context } from '../index'
import { AppProgressBar } from '../components/AppProgressBar/AppProgressBar'

const Home = () => {
  const { addDoc, collection, db, setDoc, doc } = useContext(Context)
  const toast = useRef(null)
  const [fetching, setFetching] = React.useState<boolean>(false)
  const [photos, setPhotos] = React.useState<string[]>([])
  const [localFiles, setLocalFiles] = React.useState<FormData[]>([])

  const values: Data = {
    company: '',
    name: '',
    category: '',
    phone: '',
    email: '',
    city: ''
  }

  React.useEffect(() => {
    const item = localStorage.getItem('formData')
    if (item) {
      setLocalFiles(JSON.parse(item))
    }
  }, [])

  const submitLocal = async () => {
    setFetching(true)
    const promise = localFiles.map((item: FormData) => {
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

  const handleSubmit = async (data: FormData) => {
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
        const formData = JSON.parse(items).filter((fd: FormData) => fd.id !== data.id)
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

  const addPhoto = (photo: string) => {
    setPhotos([...photos, photo])
  }
  const removePhotos = () => {
    setPhotos([])
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <Toast ref={toast} position="bottom-center" />
        <AppProgressBar fetching={fetching} />

        <RegistrationForm
          defaultValues={values}
          photos={photos}
          localFiles={localFiles}
          onSubmit={handleSubmit}
          submitLocal={submitLocal}
          addPhoto={addPhoto}
          removePhotos={removePhotos}
        />
        <Link to="/result">
          <AppButton label="Заполненные данные" className="p-button-text" />
        </Link>
      </div>
    </div>
  )
}

export default Home
