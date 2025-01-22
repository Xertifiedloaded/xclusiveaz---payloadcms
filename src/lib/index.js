export const sendWhatsappMessage = (formData, cart, cartTotal) => {
  const phoneNumber = '2348151354931'

  const formatCurrency = (amount) => `  ₦${Number(amount).toFixed(2)}`

  const formatCartItems = (items) => {
    return items
      .map((item, index) => {
        const subtotal = formatCurrency(item.price * item.quantity)
        return `${index + 1}. ${item.name}
      • Quantity: ${item.quantity}
      • Unit Price: ${formatCurrency(item.price)}
      • Subtotal:   ₦${subtotal}`
      })
      .join('\n\n')
  }

  const message = `
🛍️ *New Order Details*
━━━━━━━━━━━━━━━━

👤 *Customer Information*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

📍 *Delivery Details*
Address: ${formData.address}
Location: ${formData.location}

📏 *Custom Measurements*
- Hips: ${formData.hips}cm
- Waist: ${formData.waist}cm
- Chest: ${formData.chest}cm

🛒 *Order Summary*
━━━━━━━━━━━━
${formatCartItems(cart)}

💰 *Order Total: ${formatCurrency(cartTotal)}*
━━━━━━━━━━━━

Thank you for your order! We'll process it right away.
`

  return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message.trim())}`
}
