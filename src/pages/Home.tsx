import React, { useRef } from 'react'
import { FormData, RegistrationForm } from '../components/RegistrationForm/RegistrationForm'
import styles from '../styles/Home.module.scss'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { Toast } from 'primereact/toast'

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
  const [photos, setPhotos] = React.useState<string[]>([])

  const handleSubmit = async (data: FormData) => {
    try {
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
        const formData = JSON.parse(items).filter((item: FormData) => item.id !== data.id)
        localStorage.setItem('formData', JSON.stringify(formData))
      }
    } catch (e) {
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
    }
  }

  const addPhoto = (photo: string) => {
    setPhotos([...photos, photo])
  }
  const removePhotos = () => {
    setPhotos([])
  }

  return (
    <div className={styles.content}>
      <Toast ref={toast} position="center" />
      <RegistrationForm
        photos={photos}
        onSubmit={handleSubmit}
        addPhoto={addPhoto}
        removePhotos={removePhotos}
      />
    </div>
  )
}

export default Home
