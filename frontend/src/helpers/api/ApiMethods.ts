export class ApiMethods {
  private baseUrl: string = import.meta.env.VITE_BACKEND_URL

  async getData(endpoint: string) {
    const url = `${this.baseUrl}${endpoint}`
    const response = await fetch(url)
    return response.json()
  }

  async postData(endpoint: string, data: any) {
    const url = `${this.baseUrl}${endpoint}`
    const formData = new FormData()
    for (const key in data) {
      if (Array.isArray(data[key]) && data[key][0] instanceof File) {
        data[key].forEach((file: File) => {
          formData.append(`${key}`, file)
        })
      } else {
        formData.append(key, data[key])
      }
    }

    const headers = new Headers()
    headers.append('Authorization', `Bearer ${localStorage.getItem('authToken')}`)
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers
    })
    return response.json()
  }

  async putData(endpoint: string, data: any) {
    const url = `${this.baseUrl}${endpoint}`
    const formData = new FormData()
    for (const key in data) {
      if (Array.isArray(data[key]) && data[key][0] instanceof File) {
        data[key].forEach((file: File) => {
          formData.append(`${key}`, file)
        })
      } else {
        formData.append(key, data[key])
      }
    }

    const headers = new Headers()
    headers.append('Authorization', `Bearer ${localStorage.getItem('authToken')}`)
    const response = await fetch(url, {
      method: 'PUT',
      body: formData,
      headers
    })
    return response.json()
  }

  async deleteData(endpoint: string) {
    const url = `${this.baseUrl}${endpoint}`

    const headers = new Headers()
    headers.append('Authorization', `Bearer ${localStorage.getItem('authToken')}`)
    await fetch(url, {
      method: 'DELETE',
      headers
    })
  }
}
