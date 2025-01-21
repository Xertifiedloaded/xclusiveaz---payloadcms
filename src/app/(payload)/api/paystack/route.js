
export  async function POST(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    try {
      const { formData, cart, cartTotal } = req.body;
      const reference = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const metadata = {
        customer_name: formData.name,
        customer_phone: formData.phone,
        delivery_address: formData.address,
        measurements: {
          hips: formData.hips,
          waist: formData.waist,
          chest: formData.chest,
        },
        delivery_location: formData.location,
        cart_items: cart.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        cart_total: cartTotal
      };
  
      const response = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          amount: Math.round(cartTotal * 100),
          reference,
          callback_url: `${process.env.PUBLIC_URL}/payment/verify`,
          metadata: metadata,
        }),
      });
  
      const data = await response.json();
  
      if (!data.status) {
        throw new Error(data.message);
      }
  
      return res.status(200).json({
        success: true,
        authorizationUrl: data.data.authorization_url,
      });
    } catch (error) {
      console.error('Payment initialization error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to initialize payment',
      });
    }
  }