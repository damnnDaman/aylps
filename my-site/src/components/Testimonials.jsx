import React from 'react'

export const Testimonials = () => {
    const testimonials = [
  {
    name: "John Doe",
    feedback:
      "Booking my trip through 'As You Like Tour and Travels' was seamless and stress-free! The team was incredibly helpful and ensured everything was perfect.",
    image: "/john.jpg", // Replace with the path to the image
  },
  {
    name: "Jane Smith",
    feedback:
      "I had an amazing experience booking my hotel and flight. The customer service was top-notch, and I got the best deals for my vacation!",
    image: "/jane.jpg", // Replace with the path to the image
  },
  {
    name: "Michael Brown",
    feedback:
      "The travel consultant appointment was a game-changer for my trip planning. They provided personalized advice that made my trip unforgettable!",
    image: "/michael.jpg", // Replace with the path to the image
  },
  {
    name: "Emily Davis",
    feedback:
      "I highly recommend 'As You Like Tour and Travels'! Their attention to detail and excellent service made my journey hassle-free and enjoyable.",
    image: "/emily.jpg", // Replace with the path to the image
  },
];
  return (
     <section className="bg-gray-100 py-10 font-Poppins">
      <h2 className="text-3xl font-Poppins text-center mb-6">What Our Customers Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {testimonials.map(({ name, feedback, image }, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
          >
            <img
              src={image}
              alt={name}
              className="w-16 h-16 rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="text-gray-600 mt-2">{feedback}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
