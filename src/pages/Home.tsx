import React from 'react'
import { AppCameraComponent } from '../components/AppCameraComponent/AppCameraComponent'
import { Data, RegistrationForm } from '../components/RegistrationForm/RegistrationForm'
import styles from '../styles/Home.module.scss'

const Home = () => {
  const [visible, setVisible] = React.useState(false)
  const [photos, setPhotos] = React.useState<string[]>([])

  const handleSave = () => {
    setVisible(false)
  }
  const onCancel = () => {
    setPhotos([])
    setVisible(false)
  }

  const handleSubmit = (data: Data) => {
    console.log(photos)
    console.log(data)
  }

  const addPhoto = (photo: string) => {
    setPhotos([...photos, photo])
  }

  if (visible) {
    return <AppCameraComponent addPhoto={addPhoto} onSave={handleSave} onCancel={onCancel} />
  }

  return (
    <div className={styles.content}>
      <RegistrationForm
        photos={photos}
        openCamera={() => setVisible(true)}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default Home
