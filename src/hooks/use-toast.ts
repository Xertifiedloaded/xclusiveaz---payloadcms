// lib/fetchCollections.ts
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

// Individual collection fetchers
export async function fetchUsers() {
  try {
    const response = await axios.get(`${API_URL}/api/users`)
    return response.data.docs
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

export async function fetchMedia() {
  try {
    const response = await axios.get(`${API_URL}/api/media`)
    return response.data.docs
  } catch (error) {
    console.error('Error fetching media:', error)
    throw error
  }
}

export async function fetchProducts() {
  try {
    const response = await axios.get(`${API_URL}/api/products`)
    return response.data.docs
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export async function fetchCategories() {
  try {
    const response = await axios.get(`${API_URL}/api/categories`)
    return response.data.docs
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}

export async function fetchOrders() {
  try {
    const response = await axios.get(`${API_URL}/api/orders`)
    return response.data.docs
  } catch (error) {
    console.error('Error fetching orders:', error)
    throw error
  }
}

export async function fetchCustomers() {
  try {
    const response = await axios.get(`${API_URL}/api/customers`)
    return response.data.docs
  } catch (error) {
    console.error('Error fetching customers:', error)
    throw error
  }
}

export async function fetchHomePage() {
  try {
    const response = await axios.get(`${API_URL}/api/home`)
    return response.data
  } catch (error) {
    console.error('Error fetching home page:', error)
    throw error
  }
}

export async function fetchDiscounts() {
  try {
    const response = await axios.get(`${API_URL}/api/discounts`)
    return response.data.docs
  } catch (error) {
    console.error('Error fetching discounts:', error)
    throw error
  }
}

export async function fetchHeaderCollection() {
  try {
    const response = await axios.get(`${API_URL}/api/header`)
    console.log(response);
    
    return response.data.docs[0]
  } catch (error) {
    console.error('Error fetching header:', error)
    throw error
  }
}

export async function fetchFooterCollection() {
  try {
    const response = await axios.get(`${API_URL}/api/footer`)
    return response.data.docs[0]
  } catch (error) {
    console.error('Error fetching footer:', error)
    throw error
  }
}


export async function fetchAllCollections() {
  try {
    const [
      users,
      media,
      products,
      categories,
      orders,
      customers,
      homePage,
      discounts,
      headerCollection,
      footerCollection
    ] = await Promise.all([
      fetchUsers(),
      fetchMedia(),
      fetchProducts(),
      fetchCategories(),
      fetchOrders(),
      fetchCustomers(),
      fetchHomePage(),
      fetchDiscounts(),
      fetchHeaderCollection(),
      fetchFooterCollection()
    ])

    return {
      users,
      media,
      products,
      categories,
      orders,
      customers,
      homePage,
      discounts,
      headerCollection,
      footerCollection
    }
  } catch (error) {
    console.error('Error fetching collections:', error)
    throw error
  }
}


interface FetchOptions {
  page?: number
  limit?: number
  sort?: string
  where?: Record<string, any>
}

export async function fetchCollectionWithOptions<T>(
  collectionName: string,
  options: FetchOptions = {}
) {
  try {
    const { page = 1, limit = 10, sort = '-createdAt', where = {} } = options
    
    const response = await axios.get(`${API_URL}/api/${collectionName}`, {
      params: {
        page,
        limit,
        sort,
        where: JSON.stringify(where)
      }
    })

    return response.data
  } catch (error) {
    console.error(`Error fetching ${collectionName}:`, error)
    throw error
  }
}