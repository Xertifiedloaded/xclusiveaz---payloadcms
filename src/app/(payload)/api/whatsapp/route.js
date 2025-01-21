
import { sendWhatsappMessage } from "../../../../lib";

export async function POST(req) {
  const { formData, cart, cartTotal } = await req.json(); 
  
  if (!formData || !cart || cart.length === 0) {
    return new Response(
      JSON.stringify({ message: 'No items in the cart.' }),
      { status: 400 }
    );
  }

  try {
    const waLink = sendWhatsappMessage(formData, cart, cartTotal);
    return new Response(
      JSON.stringify({ waLink }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Error generating WhatsApp link' }),
      { status: 500 }
    );
  }
}
