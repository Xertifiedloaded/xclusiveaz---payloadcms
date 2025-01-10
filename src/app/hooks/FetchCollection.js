export async function getHeader() {
  try {
    const response = await fetch(`/api/header`, {
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch header')
    }

    const data = await response.json()
    return data.docs[0] 
  } catch (error) {
    console.error('Error fetching header:', error)
    return null
  }
}