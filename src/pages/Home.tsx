import React from 'react'
import { Data, RegistrationForm } from '../components/RegistrationForm/RegistrationForm'
import styles from '../styles/Home.module.scss'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

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

  const [photos, setPhotos] = React.useState<string[]>([])

  interface Body extends Data {
    photos?: string[]
  }

  const postData = async (data: Body) => {
    try {
      const docRef = await addDoc(collection(db, 'forms'), data)
      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  const handleSubmit = async (data: Data) => {
    const body = {
      ...data,
      photos
    }
    console.log(body)
    await postData(body)
  }

  const addPhoto = (photo: string) => {
    setPhotos([...photos, photo])
  }
  const removePhotos = () => {
    setPhotos([])
  }

  return (
    <div className={styles.content}>
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
