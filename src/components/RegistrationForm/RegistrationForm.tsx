import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { InputText } from 'primereact/inputtext'
import { InputMask } from 'primereact/inputmask'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { classNames } from 'primereact/utils'
import { Image } from 'primereact/image'
import { CountryService } from '../../service/CountryService'
import styles from './RegistrationForm.module.scss'

export interface Data {
  company: string
  name: string
  phone: string
  email: string
  country: string | null
}

interface RegistrationFormProps {
  photos: string[]
  openCamera: () => void
  onSubmit: (data: Data) => void
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  photos,
  openCamera,
  onSubmit
}) => {
  const [countries, setCountries] = useState([])
  const countryservice = new CountryService()
  const defaultValues: Data = {
    company: '',
    name: '',
    phone: '',
    email: '',
    country: null
  }

  useEffect(() => {
    countryservice.getCountries().then((data) => setCountries(data))
  }, [])

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({ defaultValues })

  const submitHandler = (data: Data) => {
    onSubmit(data)
    reset()
  }

  const getFormErrorMessage = (name: 'name' | 'email' | 'company' | 'phone') => {
    return errors[name] && <small className="p-error">{errors[name]?.message}</small>
  }

  return (
    <div className={styles.card}>
      <form onSubmit={handleSubmit(submitHandler)} className={classNames('p-fluid', styles.forms)}>
        <div>
          <div className={styles.field}>
            <span className="p-float-label">
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
            {getFormErrorMessage('name')}
          </div>
          <div className={styles.field}>
            <span className="p-float-label">
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
            <span className="p-float-label">
              <Controller
                name="phone"
                control={control}
                rules={{ required: 'Поле обязательное' }}
                render={({ field, fieldState }) => (
                  <InputMask
                    id={field.name}
                    {...field}
                    mask="+7 (999) 999-9999"
                    placeholder="+7 (999) 999-9999"
                    className={classNames({ 'p-invalid': fieldState.invalid })}
                  />
                )}
              />
              <label htmlFor="phone" className={classNames({ 'p-error': errors.name })}>
                Телефон
              </label>
            </span>
            {getFormErrorMessage('name')}
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
                name="country"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    id={field.name}
                    value={field.value}
                    onChange={(e) => field.onChange(e.value)}
                    options={countries}
                    optionLabel="name"
                  />
                )}
              />
              <label htmlFor="country">Город</label>
            </span>
          </div>

          <Button
            type="submit"
            label="Приложить визитку"
            className="p-button-outlined"
            onClick={openCamera}
          />
          <div className={styles.board}>
            {photos.map((item) => (
              <Image key={item} src={item} alt="photo" imageClassName={styles.image} />
            ))}
          </div>
        </div>

        <div>
          <Button type="submit" label="Отправить" />
          <div className={styles.mt}>
            <Button type="submit" label="Очистить" className="p-button-text" />
          </div>
        </div>
      </form>
    </div>
  )
}
