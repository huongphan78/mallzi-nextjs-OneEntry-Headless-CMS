"use client"
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { CartDetailsType } from '@/lib/interface'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { postFormData } from '@/app/action'

interface FormProps {
  formFields: string[]
  cartDetails: CartDetailsType[]
  total: number
}

const CheckOutPage: React.FC<FormProps> = ({ formFields, cartDetails, total }) => {
  const [isLoading, setLoading] = useState(false)
  const [contactDetails, setContactDetails] = useState({
    Name: "",
    Email: "",
    Subject: "",
    Message: ""
  })
  const router = useRouter()

  const submitOrder = async (e: any) => {
    setLoading(true)
    e.preventDefault()
    const data = {
      name: contactDetails.Name,
      email: contactDetails.Email,
      subject: contactDetails.Subject,
      message: contactDetails.Message,
      cart: cartDetails,
      total: total
    }
    try {
      await postFormData(data)
      router.push(`success?email=${data.email}`)
    } catch (e) {
      console.error("Error submit:", e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="flex flex-col max-w-5xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-3xl font-bold text-center mb-2">Contact Us</h2>
      <p className="text-center text-gray-600 mb-8">
        Have a question, or want an update on your order? <br />
        Write to us at <span className="font-semibold">support247@mallzii.store</span>. 
        We’re always happy to help! <br />
        Our office hours are Mon – Sat: 9AM–5PM EST.
      </p>

      <form className="flex flex-col gap-10" onSubmit={submitOrder}>
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Name</label>
          <Input
            type="text"
            placeholder="Your Name"
            onChange={(e) => setContactDetails(prev => ({ ...prev, Name: e.target.value }))}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Email</label>
          <Input
            type="email"
            placeholder="Your Email"
            onChange={(e) => setContactDetails(prev => ({ ...prev, Email: e.target.value }))}
          />
        </div>

        {/* Subject */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Subject</label>
          <Input
            type="text"
            placeholder="Subject"
            onChange={(e) => setContactDetails(prev => ({ ...prev, Subject: e.target.value }))}
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Message</label>
          <textarea
            className="border rounded-md p-3 text-lg resize-none"
            rows={5}
            placeholder="Write your message..."
            onChange={(e) => setContactDetails(prev => ({ ...prev, Message: e.target.value }))}
          />
        </div>

        {/* Products */}
        <div>
          <h3 className="font-semibold text-xl mb-4">Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cartDetails.map((product) => {
              const subtotal = (product.price || 0) * product.quantity
              return (
                <div key={product.id} className="flex gap-4 p-4 border rounded-md shadow-sm">
                  <img
                    className="w-24 h-24 object-cover rounded-md"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="flex flex-col justify-between">
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-gray-600">Price: ${product.price}</p>
                    <p className="text-gray-600">Quantity: {product.quantity}</p>
                    <p className="font-medium text-blue-700">Subtotal: ${subtotal}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Total */}
        <div className="text-2xl flex justify-between font-bold mt-4 border-t pt-4">
          <span>Total:</span>
          <span>${total}</span>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isLoading}
          className="text-xl py-4 mt-6 w-full md:w-1/3 self-center"
        >
          {isLoading ? "Processing..." : "Submit Order"}
        </Button>
      </form>
    </section>
  )
}

export default CheckOutPage
