export default <IColumn[]>[
  { field: 'createdAt', header: 'Дата', width: '9%' },
  { field: 'company', header: 'Организация', width: '9%' },
  { field: 'name', header: 'Имя', width: '9%' },
  { field: 'category', header: 'Тип организации', width: '9%' },
  { field: 'phone', header: 'Телефон', width: '9%' },
  { field: 'email', header: 'Почта', width: '9%' },
  { field: 'city', header: 'Город', width: '9%' },
  { field: 'comment', header: 'Комментарий', width: '9%' },
  { field: 'info', header: 'Описание', width: '9%' },
  { field: 'photos', header: 'Фото', width: '9%' },
  { field: 'editor', width: '10%' }
]

export interface IColumn {
  field: string
  header?: string
  width: string
}
