// import React from 'react';

// import Header from "./Header";
// import { Testimonials } from './Testimonials';

// const services = [
//   {
//         title: 'Book a Hotel Room',
//       icon: '🏨',
//     description:
//       'Find and book accommodations tailored to your preferences, from budget stays to luxury resorts.',
//     image: '/hotel.jpg', // place your image in public/images/
//     link: '/book-hotel',
//   },
//   {
//       title: 'Book a Flight',
//       icon: '✈️',
//     description:
//       'Search and book flights to your desired destinations with competitive prices and flexible options.',
//     image: '/flight.webp',
//     link: '/book-flight',
//   },
//   {
//       title: 'Travel Consultant Appointment',
//         icon: '🗺️',
//     description:
//       'Schedule a one-on-one consultation with our expert travel advisors for personalized trip planning.',
//     image: '/AYLT.jpg',
//     link: '/consultation',
//   },
// ];

// // export default function Services() {
// //   return (
// //     <section className="max-w px-4 sm:px-6 lg:px-8 py-5">
// //       <h2 className="text-3xl font-bold text-gray-900 p-6 text-center">
// //         Our Services
// //       </h2>
// //       <div className="gap-15 flex justify-space-around items-center p-5 flex-wrap md:flex-wrap lg:flex-nowrap flex-col-3">

// //         {services.map(({ title, description, image, link }) => (
// //         <div
// //   key={title}
// //   className="bg-red opacity-90 border-2  rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105"
// // >
// //             <img
// //               src={image}
// //               alt={title}
// //               className="h-48 w-full object-cover"
// //             />
// //             <div className="p-6 flex flex-col flex-grow">
// //               <h3 className="text-xl font-semibold mb-4">{title}</h3>
// //               <p className="text-gray-600 flex-grow">{description}</p>
// //               <a
// //                 href={link}
// //                 className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
// //               >
// //                 Learn More
// //               </a>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </section>
// //   );
// // }


// // import React from 'react';

// // const services = [
// //   {
// //     title: 'Book a Hotel Room',
// //     description:
// //       'Find and book accommodations tailored to your preferences, from budget stays to luxury resorts.',
// //     image: '/images/hotel.jpg',
// //     link: '/book-hotel',
// //   },
// //   {
// //     title: 'Flight & Trip Packages',
// //     description:
// //       'Book round-trip flights and complete travel packages, including hotel stays, at great prices.',
// //     image: '/images/trip.jpg',
// //     link: '/book-trip',
// //   },
// //   {
// //     title: 'Travel Consultant Appointment',
// //     description:
// //       'Schedule a one-on-one consultation with our expert travel advisors for personalized trip planning.',
// //     image: '/AYLT.jpg',
// //     link: '/consultation',
// //   },
// // ];

// export default function Services() {
//     const text1 = "Our Services"
//     return (
//     <div className="bg-gray-50">
//             <Header text={text1} />

//     <section id="services" className=" flex flex-col items-center justify-center p-15 bg-gray-50">

//       <div className="grid gap-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//         {services.map(({ title,icon , description, image, link }) => (
//           <div
//             key={title + icon}
//             className="bg-white rounded-lg overflow-hidden shadow-2xl flex flex-col transition-all duration-200 ease-in-out transform hover:scale-105 hover:bg-blue-50 hover:shadow-4xl hover:ring-4 hover:ring-blue-100 cursor-pointer"
//           >
//             <img
//               src={image}
//               alt={title}
//               className="h-48 w-full object-cover"
//             />
//             <div className="p-6 flex flex-col flex-grow">
//               <h3 className="text-xl font-bold font-Sans-Serif">
//                 {title } {icon}
//               </h3>
//               <p className="text-lg text-gray-600 flex-grow font-Poppins">
//                 {description}
//               </p>
//               <a
//                 href={link}

//               >
//                 <span className="mt-6 color-blue inline-block font-semibold hover:underline bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition-colors duration-200 text-center">Learn More</span>
//               </a>
//             </div>
//           </div>
//         ))}
//       </div>
//             </section>


//             <Testimonials />
//             {/* Add your Testimonials component here */}

//     </div>
//   );
// }




import React from 'react';
import { Link } from 'react-router-dom';     // ← import Link
import Header from './Header';
import { Testimonials } from './Testimonials';



const services = [
  {
    title: 'Book a Hotel Room',
    icon: '🏨',
    description:
      'Find and book accommodations tailored to your preferences, from budget stays to luxury resorts.',
    image: '/hotel.jpg',
    link: '/book-hotel',
  },
  {
    title: 'Book a Flight',
    icon: '✈️',
    description:
      'Search and book flights to your desired destinations with competitive prices and flexible options.',
    image: '/flight.webp',
    link: '/book-flight',
  },
  {
    title: 'Travel Consultant Appointment',
    icon: '🗺️',
    description:
      'Schedule a one-on-one consultation with our expert travel advisors for personalized trip planning.',
    image: '/AYLT.jpg',
    link: '/consultation',
  },
];

export default function Services() {
  const text1 = 'Our Services';

  return (
    <div className="bg-gray-50">
      <Header text={text1} />

      <section
        id="services"
        className="flex flex-col items-center justify-center p-15 bg-gray-50"
      >
        <div className="grid gap-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ title, icon, description, image, link }) => (
            <Link
              key={title + icon}
              to={link}                                   // ← Link to the correct route
              className="block bg-white rounded-lg overflow-hidden shadow-2xl 
                         transform transition-all duration-200 ease-in-out 
                         hover:scale-105 hover:bg-blue-50 hover:shadow-4xl 
                         hover:ring-4 hover:ring-blue-100 cursor-pointer"
            >
              <img
                src={image}
                alt={title}
                className="h-48 w-full object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold font-Sans-Serif">
                  {title} {icon}
                </h3>
                <p className="text-lg text-gray-600 flex-grow font-Poppins">
                  {description}
                </p>
                <span className="mt-6 inline-block font-semibold bg-blue-600 
                                  text-white px-5 py-2 rounded hover:bg-blue-700 
                                  transition-colors duration-200 text-center">
                  Learn More
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Testimonials />
    </div>
  );
}

