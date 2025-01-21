
export const sendWhatsappMessage = (formData, cart, cartTotal) => {
    const phoneNumber = `08151354931`
    const message = `
      *Checkout Details:*

      Name: ${formData.name}
      Email: ${formData.email}
      Phone: ${formData.phone}
      Address: ${formData.address}
      Location: ${formData.location}
  
      *Measurements:*
      Hips: ${formData.hips}
      Waist: ${formData.waist}
      Chest: ${formData.chest}
  
      *Cart Items:*
      ${cart
        .map((item, index) => {
          return `${index + 1}. ${item.name} - Quantity: ${item.quantity} - Price: ${item.price}`;
        })
        .join('\n')}
  
      *Total Cart Amount:*
      $${cartTotal}
    `;
    
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message.trim())}`;
  };
  