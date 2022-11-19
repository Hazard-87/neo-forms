import React, { useContext } from 'react'
import { AppCameraComponent } from '../components/AppCameraComponent/AppCameraComponent'
import { Context } from '../App'

const Camera: React.FC = () => {
  const { photos, setPhotos } = useContext(Context)

  const addPhoto = (photo: string) => {
    setPhotos([...photos, photo])
  }

  return <AppCameraComponent addPhoto={addPhoto} />
}

export default Camera
