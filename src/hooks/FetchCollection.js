export async function fetchHeader() {
  try {
    const response = await fetch(`/api/header`);

    if (!response.ok) {
      throw new Error(`Failed to fetch header: ${response.statusText}`);
    }

    const data = await response.json();

    if (data?.header) {
      return data.header;
    } else {
      console.error("No header data found");
      return null;
    }

  } catch (error) {
    console.error("Error fetching header:", error);
    return null;
  }
}



export async function fetchFooter() {
  try {
    const response = await fetch(`/api/footer`);

    if (!response.ok) {
      throw new Error(`Failed to fetch footer: ${response.statusText}`);
    }

    const data = await response.json();
    return data.docs[0];  
  } catch (error) {
    console.error('Error fetching footer:', error);
    return null;
  }
}

