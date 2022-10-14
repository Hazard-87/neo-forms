export default <IColumn[]>[
  { field: 'company', header: 'Организация', width: '10%' },
  { field: 'name', header: 'Имя', width: '10%' },
  { field: 'category', header: 'Тип организации', width: '10%' },
  { field: 'phone', header: 'Телефон', width: '10%' },
  { field: 'email', header: 'Почта', width: '10%' },
  { field: 'city', header: 'Город', width: '10%' },
  { field: 'info', header: 'Описание', width: '10%' },
  { field: 'photos', header: 'Фото', width: '10%' },
  { field: 'editor', width: '10%' }
]

export interface IColumn {
  field: string
  header?: string
  width: string
}
