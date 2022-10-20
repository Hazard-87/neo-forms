export interface IFormData {
  id: number
  createdAt: string
  company: string
  name: string
  category: string
  phone: string
  email: string
  city: string
  comment: string
  info?: string
  photos: string[]
}

export interface Data {
  company: string
  name: string
  category: string
  phone: string
  email: string
  city: string
  comment: string
}

export interface SaveData {
  company: string
  name: string
  category: string
  phone: string
  email: string
  city: string
}
