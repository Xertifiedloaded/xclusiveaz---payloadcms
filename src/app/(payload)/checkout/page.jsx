'use client';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useCombinedData } from '@/hooks/FetchCollection';
import PersonalDetails from './PersonalDetails';
import Measurements from './Measurements';
import DeliveryLocation from './DeliveryLocation';
import OrderSummary from './CartSummary'; 
import useWhatsapp from '../../../hooks/UseWhatsApp';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart, updateLocation } = useCart();
  const { locations, loading, error } = useCombinedData();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    hips: 0,
    waist: 0,
    chest: 0,
    location: '',
  });

  const [selectedMeasurements, setSelectedMeasurements] = useState([]);
  const [addValue, setAddValue] = useState(0);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      cart: cart,
      cartTotal: cartTotal,
    }));
  }, [cart, cartTotal]);

  const { whatsappLoading, whatsappError, sendWhatsappMessage } = useWhatsapp(
    formData,
    cart,
    cartTotal,
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleMeasurementSelection = (measurement) => {
    setSelectedMeasurements((prev) =>
      prev.includes(measurement) ? prev.filter((m) => m !== measurement) : [...prev, measurement],
    );
  };

  const applyMeasurementChange = () => {
    setFormData((prev) => {
      const updatedData = { ...prev };
      selectedMeasurements.forEach((measurement) => {
        updatedData[measurement] = parseFloat(updatedData[measurement] || 0) + addValue;
      });
      return updatedData;
    });
    setAddValue(0);
  };

  const handleLocationChange = (value) => {
    const selectedLocation = locations.find((loc) => loc.name === value);
    if (selectedLocation) {
      setFormData({ ...formData, location: value });
      updateLocation({ name: value, price: selectedLocation.price });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    console.log('Cart Items:', cart);
  };

  const handleWhatsapp = (e) => {
    e.preventDefault();
    sendWhatsappMessage();
  };

  const paystackProps = {
    email: formData.email,
    amount: cartTotal * 100, 
    publicKey: process.env.PAYSTACK_SECRET_KEY,
    onSuccess: (response) => {
      console.log('Payment successful:', response);
      alert('Thanks for your purchase! Come back soon!');
      clearCart();
    },
    onClose: () => {
      alert("Payment canceled. Don't leave yet!");
    },
  };

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      {whatsappError && <p className="text-red-500">{whatsappError}</p>}
      <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PersonalDetails formData={formData} handleInputChange={handleInputChange} />
          <Measurements
            formData={formData}
            setFormData={setFormData}
            selectedMeasurements={selectedMeasurements}
            toggleMeasurementSelection={toggleMeasurementSelection}
            addValue={addValue}
            setAddValue={setAddValue}
            applyMeasurementChange={applyMeasurementChange}
          />
          <DeliveryLocation
            locations={locations}
            loading={loading}
            error={error}
            formData={formData}
            handleLocationChange={handleLocationChange}
          />
        </div>
        {cart.length > 0 && (
          <div className="lg:col-span-1">
            <OrderSummary
              cart={cart}
              whatsappLoading={whatsappLoading}
              cartTotal={cartTotal}
              clearCart={clearCart}
              handleWhatsapp={handleWhatsapp}
              handleSubmit={handleSubmit}
              paystackProps={paystackProps}
            />
          </div>
        )}
      </div>
    </div>
  );
}

