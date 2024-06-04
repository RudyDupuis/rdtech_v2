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
    const response = await fetch(url, {
      method: 'POST',
      body: formData
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
    const response = await fetch(url, {
      method: 'PUT',
      body: formData
    })
    return response.json()
  }

  async deleteData(endpoint: string) {
    const url = `${this.baseUrl}${endpoint}`
    await fetch(url, {
      method: 'DELETE'
    })
  }
}