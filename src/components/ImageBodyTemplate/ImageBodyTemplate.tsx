import React from 'react'
import { Carousel } from 'primereact'
import { Image } from 'primereact/image'
import styles from '../EditableTable/EditableTable.module.scss'
import { IFormData } from '../../interfaces/DataTypes'

interface ImageBodyTemplateProps {
  data: IFormData
}

export const ImageBodyTemplate: React.FC<ImageBodyTemplateProps> = ({ data }) => {
  const src = data.photos.length ? data.photos[data.photos.length - 1] : ''

  const productTemplate = (product: string) => {
    return <Image src={product} alt="photo" imageClassName={styles.image} preview />
  }

  if (src) {
    return (
      <Carousel
        value={data.photos}
        numVisible={1}
        numScroll={1}
        itemTemplate={productTemplate}
        verticalViewPortHeight="90px"
      />
    )
  } else {
    return <span>Нет фото</span>
  }
}
