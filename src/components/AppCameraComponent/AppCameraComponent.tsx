import React, { useState, useRef, useEffect } from 'react'
import { Camera, CameraType } from 'react-camera-pro'
import styled from 'styled-components'
import { Button as Pbutton } from 'primereact/button'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;
`

const Control = styled.div`
  position: fixed;
  display: flex;
  right: 0;
  width: 20%;
  min-width: 130px;
  min-height: 130px;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px;
  box-sizing: border-box;
  flex-direction: column-reverse;
  @media (max-aspect-ratio: 1/1) {
    flex-direction: row;
    bottom: 0;
    width: 100%;
    height: 20%;
  }
  @media (max-width: 400px) {
    padding: 10px;
  }
`

const Button = styled.button`
  outline: none;
  color: white;
  opacity: 1;
  background: transparent;
  background-color: transparent;
  background-position-x: 0%;
  background-position-y: 0%;
  background-repeat: repeat;
  background-image: none;
  padding: 0;
  text-shadow: 0px 0px 4px black;
  background-position: center center;
  background-repeat: no-repeat;
  pointer-events: auto;
  cursor: pointer;
  z-index: 2;
  filter: invert(100%);
  border: none;

  &:hover {
    opacity: 0.7;
  }
`

const TakePhotoButton = styled(Button)`
  background: url('https://img.icons8.com/ios/50/000000/compact-camera.png');
  background-position: center;
  background-size: 50px;
  background-repeat: no-repeat;
  width: 80px;
  height: 80px;
  border: solid 4px black;
  border-radius: 50%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`

const ChangeFacingCameraButton = styled(Button)`
  background: url(https://img.icons8.com/ios/50/000000/switch-camera.png);
  background-position: center;
  background-size: 40px;
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
  padding: 40px;

  &:disabled {
    opacity: 0;
    cursor: default;
    padding: 60px;
  }

  @media (max-width: 400px) {
    padding: 40px 5px;
    &:disabled {
      padding: 40px 25px;
    }
  }
`

const ImagePreview = styled.div<{ image: string | null }>`
  width: 120px;
  height: 120px;
  ${({ image }) => (image ? `background-image:  url(${image});` : '')}
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  @media (max-width: 400px) {
    width: 50px;
    height: 120px;
  }
`

const FullScreenImagePreview = styled.div<{ image: string | null }>`
  width: 100%;
  height: 100%;
  z-index: 100;
  position: absolute;
  background-color: black;
  ${({ image }) => (image ? `background-image:  url(${image});` : '')}
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`

interface AppCameraComponentProps {
  addPhoto: (photo: string) => void
}

export const AppCameraComponent: React.FC<AppCameraComponentProps> = ({ addPhoto }) => {
  const [numberOfCameras, setNumberOfCameras] = useState(0)
  const [image, setImage] = useState<string | null>(null)
  const [showImage, setShowImage] = useState<boolean>(false)
  const camera = useRef<CameraType>(null)
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])
  const [activeDeviceId, setActiveDeviceId] = useState<string | undefined>(undefined)

  const switchCamera = (): void => {
    if (camera.current) {
      camera.current.switchCamera()
    }
  }

  useEffect(() => {
    ;(async () => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const devices = await navigator.mediaDevices.enumerateDevices()
      const videoDevices = devices.filter((i) => i.kind == 'videoinput')
      setDevices(videoDevices)
    })()
  }, [])

  const takePhoto = (photo: string): void => {
    addPhoto(photo)
    setImage(photo)
  }

  const onChangeCamera = (): void => {
    const device = devices.find((item) => item.deviceId !== activeDeviceId)
    if (device) {
      setActiveDeviceId(device.deviceId)
    }
  }

  useEffect(() => {
    if (numberOfCameras > 1) {
      const device = devices[devices.length - 1]
      if (device) {
        setActiveDeviceId(device.deviceId)
        switchCamera()
      }
    }
  }, [numberOfCameras])

  return (
    <Wrapper>
      {showImage ? (
        <FullScreenImagePreview
          image={image}
          onClick={() => {
            setShowImage(!showImage)
          }}
        />
      ) : (
        <Camera
          ref={camera}
          aspectRatio="cover"
          numberOfCamerasCallback={(i) => setNumberOfCameras(i)}
          videoSourceDeviceId={activeDeviceId}
          errorMessages={{
            noCameraAccessible:
              '?????? ?????????????? ?? ????????????. ???????????????????? ???????????? ?????? ???????????????????? ???????????? ??????????????.',
            permissionDenied:
              '?? ?????????????? ????????????????. ????????????????????, ???????????????? ?? ?????????? ???????????????????? ???? ?????????????????????????? ????????????.',
            switchCamera:
              '???????????????????? ?????????????????????? ???????????? ???? ????????????, ???????????? ?????? ???????????????? ???????????? ???????? ??????????????????????????????.',
            canvas: 'Canvas ???? ????????????????????????????.'
          }}
        />
      )}
      <Control>
        <ChangeFacingCameraButton disabled={numberOfCameras <= 1} onClick={onChangeCamera} />
        <ImagePreview
          image={image}
          onClick={() => {
            setShowImage(!showImage)
          }}
        />
        <TakePhotoButton
          onClick={() => {
            if (camera.current) {
              const photo = camera.current.takePhoto()
              takePhoto(photo)
            }
          }}
        />
        <Link to={'/'} className={'linkButton'}>
          <Pbutton
            icon="pi pi-times"
            className="p-button-rounded p-button-danger p-button-outlined"
            aria-label="??????????????"
          />
        </Link>
      </Control>
    </Wrapper>
  )
}
