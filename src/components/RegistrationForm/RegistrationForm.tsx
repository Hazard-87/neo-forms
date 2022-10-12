import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { InputText } from 'primereact/inputtext'
import { RadioButton } from 'primereact/radiobutton'
import { InputMask } from 'primereact/inputmask'
import { Button } from 'primereact/button'
import { AutoComplete } from 'primereact/autocomplete'
import { classNames } from 'primereact/utils'
import { Image } from 'primereact/image'
import styles from './RegistrationForm.module.scss'
import { api } from '../../service'
import { AppCameraComponent } from '../AppCameraComponent/AppCameraComponent'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'

export interface IData extends Data {
  id: number
}

export interface FormData extends Data {
  id: number
  photos: string[]
}

export interface Data {
  company: string
  name: string
  category: string
  phone: string
  email: string
  city: string | null
}

interface RegistrationFormProps {
  photos: string[]
  addPhoto: (photo: string) => void
  onSubmit: (data: FormData) => void
  removePhotos: () => void
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  photos,
  addPhoto,
  removePhotos,
  onSubmit
}) => {
  const categories = [
    { name: 'Салон', key: 'A' },
    { name: 'Дизайнер интерьера', key: 'M' },
    {
      name: 'Выездной дизайнер',
      key: 'P'
    }
  ]

  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const [visible, setVisible] = React.useState(false)
  const [cities, setCities] = useState<string[]>([])
  const values: Data = {
    company: '',
    name: '',
    category: '',
    phone: '',
    email: '',
    city: null
  }

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({ defaultValues: values })

  const submitHandler = (data: Data): void => {
    const formData: FormData = { ...data, photos, category: selectedCategory.name, id: Date.now() }
    const item = localStorage.getItem('formData')
    const itemData = item ? JSON.parse(item) : []
    itemData.push(formData)
    localStorage.setItem('formData', JSON.stringify(itemData))

    onSubmit(formData)
    reset()
    removePhotos()
  }

  const getFormErrorMessage = (name: 'name' | 'email' | 'company' | 'phone') => {
    return errors[name] && <small className="p-error">{errors[name]?.message}</small>
  }

  const loadCities = async (query: string) => {
    try {
      const res = await api.getCities({ query, count: 20 })
      const cityData = res.data.filter(
        (item: any) => item.data.city && item.data.city.toLowerCase().includes(query.toLowerCase())
      )

      const filteredCities: string[] = []
      cityData.map((item: any) => {
        const text = item.data.city + ', ' + item.data.region_with_type
        if (!filteredCities.includes(text)) {
          filteredCities.push(text)
        }
      })
      setCities(filteredCities)
    } catch (e) {
      console.log(e)
    }
  }

  const searchCity = (event: { query: string }) => {
    setTimeout(async () => {
      await loadCities(event.query)
    }, 500)
  }

  const onClear = () => {
    reset()
    removePhotos()
    setTimeout(() => {
      reset()
    }, 100)
  }

  const confirm = () => {
    confirmDialog({
      message: 'Вы действительно хотите очистить данные?',
      header: 'Удаление данных формы',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      acceptLabel: 'Да',
      rejectLabel: 'Нет',
      accept: onClear
    })
  }

  if (visible) {
    return <AppCameraComponent addPhoto={addPhoto} onClose={() => setVisible(false)} />
  }

  return (
    <div className={styles.card}>
      <ConfirmDialog />
      <form onSubmit={handleSubmit(submitHandler)} className={classNames('p-fluid', styles.forms)}>
        <div>
          <div className={styles.field}>
            <span className="p-float-label p-input-icon-right">
              <i className="pi pi-building" />
              <Controller
                name="company"
                control={control}
                rules={{ required: 'Поле обязательное' }}
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    autoFocus
                    className={classNames({ 'p-invalid': fieldState.invalid })}
                  />
                )}
              />
              <label htmlFor="company" className={classNames({ 'p-error': errors.name })}>
                Организация
              </label>
            </span>
            {getFormErrorMessage('company')}
          </div>
          <div className={styles.field}>
            <span className="p-float-label p-input-icon-right">
              <i className="pi pi-user" />
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Поле обязательное' }}
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    className={classNames({ 'p-invalid': fieldState.invalid })}
                  />
                )}
              />
              <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>
                Имя
              </label>
            </span>
            {getFormErrorMessage('name')}
          </div>
          <div className={styles.field}>
            <div className={styles.label}>Тип организации:</div>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <>
                  {categories.map((category) => {
                    return (
                      <div key={category.key} className={styles.radio}>
                        <RadioButton
                          inputId={category.key}
                          name={field.name}
                          value={category}
                          onChange={(e) => setSelectedCategory(e.value)}
                          checked={selectedCategory.key === category.key}
                        />
                        <label htmlFor={category.key} className={styles.radioLabel}>
                          {category.name}
                        </label>
                      </div>
                    )
                  })}
                </>
              )}
            />
          </div>
          <div className={styles.field}>
            <span className="p-float-label p-input-icon-right">
              <i className="pi pi-phone" />
              <Controller
                name="phone"
                control={control}
                rules={{ required: 'Поле обязательное' }}
                render={({ field, fieldState }) => (
                  <InputMask
                    id={field.name}
                    {...field}
                    mask="+7 (999) 999-99-99"
                    placeholder="+7 (999) 999-99-99"
                    className={classNames({ 'p-invalid': fieldState.invalid })}
                  />
                )}
              />
              <label htmlFor="phone" className={classNames({ 'p-error': errors.name })}>
                Телефон
              </label>
            </span>
            {getFormErrorMessage('phone')}
          </div>
          <div className={styles.field}>
            <span className="p-float-label p-input-icon-right">
              <i className="pi pi-envelope" />
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Поле обязательное',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Неверная почта. Пример example@email.com'
                  }
                }}
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.name}
                    placeholder="example@email.com"
                    {...field}
                    className={classNames({ 'p-invalid': fieldState.invalid })}
                  />
                )}
              />
              <label htmlFor="email" className={classNames({ 'p-error': !!errors.email })}>
                Почта
              </label>
            </span>
            {getFormErrorMessage('email')}
          </div>
          <div className={styles.field}>
            <span className="p-float-label">
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <AutoComplete
                    id={field.name}
                    {...field}
                    suggestions={cities}
                    completeMethod={searchCity}
                    aria-label="Город"
                  />
                )}
              />
              <label htmlFor="city">Город</label>
            </span>
          </div>

          <Button
            label="Приложить визитку"
            className="p-button-outlined"
            onClick={() => setVisible(true)}
          />
          <div className={styles.board}>
            {photos.map((item) => (
              <Image key={item} src={item} alt="photo" imageClassName={styles.image} />
            ))}
          </div>
        </div>

        <div className={styles.mt}>
          <Button type="submit" label="Отправить" onSubmit={handleSubmit(submitHandler)} />
          <div className={styles.clear} onClick={confirm}>
            Очистить
          </div>
        </div>
      </form>
    </div>
  )
}
