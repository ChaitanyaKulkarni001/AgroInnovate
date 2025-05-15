import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react'; // Import icons

const Support = () => {
  return (
    <div className="bg-gradient-to-b from-yellow-50 via-green-50 to-green-100 text-gray-800 p-6">
      {/* Header */}
      <section className="text-center py-12">
        <h1 className="text-5xl font-extrabold text-green-900 mb-4">Get in Touch with AgroKart</h1>
        <p className="text-lg max-w-3xl mx-auto text-green-800">We're here to help! Reach out to us for any inquiries, support, or feedback.</p>
      </section>

      {/* Contact Information */}
      <section className="py-10 bg-white rounded-xl shadow-md mb-10 max-w-6xl mx-auto p-6 border border-green-200">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Phone */}
          <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <Phone className="w-8 h-8 text-green-700" />
            <div>
              <h3 className="text-xl font-semibold text-green-800">Phone</h3>
              <p className="text-gray-700">+91 12345 67890</p>
              <p className="text-gray-700">+91 98765 43210</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <Mail className="w-8 h-8 text-green-700" />
            <div>
              <h3 className="text-xl font-semibold text-green-800">Email</h3>
              <p className="text-gray-700">support@agrokart.com</p>
              <p className="text-gray-700">info@agrokart.com</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <MapPin className="w-8 h-8 text-green-700" />
            <div>
              <h3 className="text-xl font-semibold text-green-800">Address</h3>
              <p className="text-gray-700">
                AgroKart Headquarters,
                <br />
                123 Farmer Street,
                <br />
                Maharashtra, India
              </p>
            </div>
          </div>

            {/* Working Hours */}
            <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <Clock className="w-8 h-8 text-green-700" />
                <div>
                    <h3 className="text-xl font-semibold text-green-800">Working Hours</h3>
                    <p className="text-gray-700">Mon - Fri: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-700">Sat: 10:00 AM - 4:00 PM</p>
                    <p className="text-gray-700">Sun: Closed</p>
                </div>
            </div>
        </div>
      </section>

      {/* Contact Form (Optional) */}
      <section className="py-10 bg-green-50 rounded-xl shadow-md mb-10 max-w-6xl mx-auto p-6 border border-green-200">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Send us a Message</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              rows="4"
              placeholder="Your Message"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-green-800 text-white font-semibold rounded-lg hover:bg-green-900 transition"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Call to Action */}
      <section className="text-center py-10">
        <h2 className="text-4xl font-bold text-green-900 mb-4">Let's Connect!</h2>
        <p className="text-lg mb-6 text-green-800">We value your feedback and are eager to assist you.</p>
      </section>
    </div>
  );
};

export default Support;
