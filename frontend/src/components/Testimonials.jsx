import React from 'react'

export const Testimonials = () => {
    const testimonials = [
  {
    name: "Daman Kumar",
    feedback:
      "Booking my trip through 'As You Like Tour and Travels' was seamless and stress-free! The team was incredibly helpful and ensured everything was perfect.",
    image: "/profile.webp", // Replace with the path to the image
  },
  {
    name: "Narayan Singh",
    feedback:
      "I had an amazing experience booking my hotel and flight. The customer service was top-notch, and I got the best deals for my vacation!",
    image: "/profile.webp", // Replace with the path to the image
  },
  {
    name: "Evan Smith",
    feedback:
      "The travel consultant appointment was a game-changer for my trip planning. They provided personalized advice that made my trip unforgettable!",
    image: "/profile.webp", // Replace with the path to the image
  },
  {
    name: "Mohammad Sheikh",
    feedback:
      "I highly recommend 'As You Like Tour and Travels'! Their attention to detail and excellent service made my journey hassle-free and enjoyable.",
    image: "/profile.webp", // Replace with the path to the image
  },
];
  return (
     <section className="flex flex-col justify-center p-15 bg-gray-50">
      <h2 className="text-4xl font-semibold py-10 px-5">What Our Customers Say</h2>
      <div className="grid gap-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 p-10">
        {testimonials.map(({ name, feedback, image }, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-2xl flex flex-col transition-all duration-200 ease-in-out transform hover:scale-105 hover:bg-blue-50 hover:shadow-4xl hover:ring-4 hover:ring-blue-100 cursor-pointer items-center justify-center p-15 gap-5"
          >
            <img
              src={image}
              alt={name} 
              className="w-20 h-20 rounded-full mb-4 object-cover"
            />
            <h3 className="text-2xl font-bold">{name}</h3>
            <p className=" mt-2"  style={ {fontFamily: 'Poppins, sans-serif'}}>{feedback}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
