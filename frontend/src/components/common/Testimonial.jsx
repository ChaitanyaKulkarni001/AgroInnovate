// src/components/Testimonial.jsx
import React from 'react';

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Freelance Designer",
    feedback: "This platform helped me connect with amazing clients and grow my freelance career!",
    image: "https://randomuser.me/api/portraits/women/75.jpg"
  },
  {
    name: "Ravi Kumar",
    role: "Full Stack Developer",
    feedback: "The UI is smooth, and getting gigs has never been this easy. Highly recommended!",
    image: "https://randomuser.me/api/portraits/men/46.jpg"
  },
  {
    name: "Ayesha Khan",
    role: "Content Writer",
    feedback: "Payment is secure and the clients are professional. I love this platform!",
    image: "https://randomuser.me/api/portraits/women/65.jpg"
  }
];

const Testimonial = () => {
  return (
    <div className="bg-white py-12 px-6 rounded-md shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center mb-8 text-green-700">What Our Users Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((item, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition">
            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-full mx-auto mb-4" />
            <h3 className="text-center font-semibold text-lg">{item.name}</h3>
            <p className="text-center text-sm text-gray-500 mb-2">{item.role}</p>
            <p className="text-center text-gray-700 text-sm italic">"{item.feedback}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
