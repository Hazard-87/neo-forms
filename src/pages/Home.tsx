import React, { useRef } from 'react'
import { FormData, RegistrationForm } from '../components/RegistrationForm/RegistrationForm'
import styles from '../styles/Home.module.scss'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { Toast } from 'primereact/toast'
import { ProgressSpinner } from 'primereact/progressspinner'

const Home = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyD_QPzALXmaifGr89uXwnMukml_9x1Ak10',
    authDomain: 'neo-forms.firebaseapp.com',
    projectId: 'neo-forms',
    storageBucket: 'neo-forms.appspot.com',
    messagingSenderId: '629071013494',
    appId: '1:629071013494:web:92af711be2972b62d9a157',
    measurementId: 'G-M3TPRDJEWM'
  }

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)

  const toast = useRef(null)
  const [fetching, setFetching] = React.useState<boolean>(false)
  const [photos, setPhotos] = React.useState<string[]>([])
  const [localFiles, setLocalFiles] = React.useState<FormData[]>([])

  React.useEffect(() => {
    const item = localStorage.getItem('formData')
    if (item) {
      setLocalFiles(JSON.parse(item))
    }
  }, [])

  const submitLocal = async () => {
    setFetching(true)
    const promise = localFiles.map((item: FormData) => {
      return addDoc(collection(db, 'forms'), item)
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
      await addDoc(collection(db, 'forms'), data)
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

  if (fetching) {
    return (
      <div className={styles.center}>
        <ProgressSpinner />
      </div>
    )
  }

  return (
    <div className={styles.content}>
      <Toast ref={toast} position="center" />
      <RegistrationForm
        photos={photos}
        localFiles={localFiles}
        onSubmit={handleSubmit}
        submitLocal={submitLocal}
        addPhoto={addPhoto}
        removePhotos={removePhotos}
      />
    </div>
  )
}

export default Home
