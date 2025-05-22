import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Phone, Pin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');

    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      setStatus('Message sent successfully! ✅');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      console.error(err.message);
      setStatus('Failed to send message ❌');
    }
  };

  return (
    <div className='w-screen h-full flex flex-col justify-center items-center'>
      <div className='w-full h-40 flex justify-center items-center text-3xl text-purple-500 font-semibold'>
        Contact Us
      </div>

      <div className='w-[95%] h-[45rem] shadow-lg flex flex-col md:flex-row justify-center items-center'>
        {/* Contact Info */}
        <div className='h-[90%] w-full md:w-1/2 flex flex-col justify-center items-center gap-4'>
          <div className='h-[31%] w-[70%] border rounded-md flex flex-col justify-center items-center text-lg font-semibold gap-4 shadow-md'>
            <Mail className='h-8 w-8 text-purple-600' />
            <h1>abc@gmail.com</h1>
          </div>
          <div className='h-[31%] w-[70%] border rounded-md flex flex-col justify-center items-center text-lg font-semibold gap-4 shadow-md'>
            <Phone className='h-8 w-8 text-purple-600' />
            <h1>9876543210</h1>
          </div>
          <div className='h-[50%] w-[70%] border rounded-md flex flex-col justify-center items-center text-lg font-semibold gap-4 shadow-md'>
            <Pin className='h-8 w-8 text-purple-600' />
            <h1 className='text-center'>1/11, asd, dfg<br />wert</h1>
          </div>
        </div>

        {/* Contact Form */}
        <div className='h-[95%] w-full md:w-1/2 flex flex-col justify-center items-center'>
          <div className='h-full w-full flex flex-col justify-center items-center text-lg font-semibold'>
            <h1 className='w-[80%] text-left my-6 font-bold text-purple-500'>Get in touch</h1>

            <form
              className='h-[80%] w-[80%] flex flex-col justify-center items-center gap-6'
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-purple-400 rounded-sm'
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-purple-400 rounded-sm'
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-purple-400 rounded-sm'
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-purple-400 rounded-sm'
              />
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                required
                className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-purple-400 rounded-sm'
              />

              <button
                type="submit"
                className='w-1/2 bg-purple-600 text-white font-semibold py-3 px-6 rounded hover:bg-purple-700 transition duration-200'
              >
                Send
              </button>

              {status && (
                <p className="text-sm mt-2 text-center text-gray-600">{status}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
