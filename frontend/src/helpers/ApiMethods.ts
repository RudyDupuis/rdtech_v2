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
      formData.append(key, data[key])
    }
    const response = await fetch(url, {
      method: 'POST',
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
