import moment from 'moment'
import React, { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { RadioButton } from 'primereact/radiobutton'
import { Button } from 'primereact/button'
import { AutoComplete } from 'primereact/autocomplete'
import { classNames } from 'primereact/utils'
import { Image } from 'primereact/image'
import styles from './RegistrationForm.module.scss'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import cities from '../../lib/cities'
import emails from '../../lib/emails'
import { Data, IFormData } from '../../interfaces/DataTypes'

interface RegistrationFormProps {
  defaultValues: Data
  photos: string[]
  localFiles: IFormData[]
  visibleCamera: boolean
  onSubmit: (data: IFormData) => void
  removePhotos: () => void
  submitLocal: () => void
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  defaultValues,
  photos,
  localFiles,
  visibleCamera,
  removePhotos,
  onSubmit,
  submitLocal
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
  const [filteredCities, setFilteredCities] = useState<string[]>([])
  const [filteredMails, setFilteredMails] = useState<string[]>([])

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({ defaultValues })

  const submitHandler = (data: Data): void => {
    const date = moment(new Date()).format('DD.MM.YYYY HH:mm:ss')
    const formData: IFormData = {
      ...data,
      photos,
      category: selectedCategory.name,
      id: Date.now(),
      createdAt: date
    }
    onSubmit(formData)
    reset()
    removePhotos()
  }

  const getFormErrorMessage = (name: 'name' | 'email' | 'company' | 'phone') => {
    return errors[name] && <small className="p-error">{errors[name]?.message}</small>
  }

  const loadCities = (query: string) => {
    const cityData = cities.filter((item) => item.city.toLowerCase().includes(query.toLowerCase()))
    const items = cityData.map((item) => item.city + ', ' + item.region)
    setFilteredCities(items)
  }

  const loadMails = (query: string) => {
    if (query && query[query.length - 1] === '@') {
      const items = emails.map((item) => query + item)
      setFilteredMails(items)
    } else if (query && !query.includes('@')) {
      setFilteredMails([])
    } else {
      const text = query.split('@')
      const items = emails
        .filter((item) => item.includes(text[1]))
        .map((item) => {
          const queryText = query.split('@')
          return queryText[0] + '@' + item
        })
      setFilteredMails(items)
    }
  }

  const searchCity = (event: { query: string }) => {
    setTimeout(async () => {
      await loadCities(event.query)
    }, 500)
  }

  const searchMails = (event: { query: string }) => {
    loadMails(event.query)
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

  if (visibleCamera) {
    return <Outlet />
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
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.name}
                    keyfilter={/[0-9-+()]/i}
                    type="number"
                    {...field}
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
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Неверная почта. Пример example@email.com'
                  }
                }}
                render={({ field, fieldState }) => (
                  <AutoComplete
                    id={field.name}
                    {...field}
                    suggestions={filteredMails}
                    completeMethod={searchMails}
                    placeholder="example@email.com"
                    aria-label="Почта"
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
                    suggestions={filteredCities}
                    completeMethod={searchCity}
                    placeholder="Город, регион"
                    aria-label="Город"
                  />
                )}
              />
              <label htmlFor="city">Город</label>
            </span>
          </div>
          <div className={styles.field}>
            <span className="p-float-label p-input-icon-right">
              <i className="pi pi-comment" />
              <Controller
                name="comment"
                control={control}
                render={({ field }) => (
                  <InputTextarea id={field.name} {...field} rows={1} autoResize />
                )}
              />
              <label htmlFor="comment">Комментарий</label>
            </span>
          </div>

          <Link to={'/camera'} className={'linkButton'}>
            <Button label="Приложить визитку" className="p-button-outlined" />
          </Link>
          <div className={styles.board}>
            {photos.map((item) => (
              <Image key={item} src={item} alt="photo" imageClassName={styles.image} />
            ))}
          </div>
        </div>

        <div className={styles.mt}>
          <Button type="submit" label="Отправить" onSubmit={handleSubmit(submitHandler)} />
          {localFiles.length ? (
            <div className={styles.clear} onClick={submitLocal}>
              Отправить сохраненные данные
            </div>
          ) : null}
          <div className={styles.clear} onClick={confirm}>
            Очистить
          </div>
        </div>
      </form>
    </div>
  )
}
