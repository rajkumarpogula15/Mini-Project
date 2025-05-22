import React from 'react'
import { Mail, Phone, Pin } from 'lucide-react'
const Contact = () => {
  return (
    <>
      <div className='w-screen h-full flex flex-col justify-center items-center'>

        <div className='w-full h-40 flex justify-center items-center text-3xl text-black font-semibold'>
          Contact Us
        </div>
        <div className='w-[95%] h-[45rem] shadow-lg flex flex-row justify-center items-center'>
          <div className='h-[90%] w-1/2 flex flex-col justify-center items-center gap-4'>
            <div className='h-[31%] w-[50%] border rounded-md flex flex-col justify-center items-center text-lg font-semibold gap-4 shadow-md'>
              <Mail className='h-8 w-8 text-black' />
              <h1>abc@gamil.com</h1>
            </div>
            <div className='h-[31%] w-[50%] border rounded-md flex flex-col justify-center items-center text-lg font-semibold gap-4 shadow-md'>
              <Phone className='h-8 w-8 text-amber-900' />
              <h1>9876543210</h1>
            </div>
            <div className='h-[50%] w-[50%] border rounded-md flex flex-col justify-center items-center text-lg font-semibold gap-4 shadow-md'>
              <Pin className='h-8 w-8 text-black' />
              <h1 className='text-center'>1/11 ,asd,dfg <br /> wert</h1>
            </div>
          </div>
          <div className='h-[95%] w-1/2 flex flex-col justify-center items-center'>
            <div className='h-full w-full flex flex-col justify-center items-center text-lg font-semibold'>
              <h1 className='w-[80%] text-left my-6 font-bold text-black'>Get in touch</h1>
              <form className='h-[80%] w-[80%] flex flex-col justify-center items-center gap-8'>
                <input type="text" name="" id="" placeholder='Name' className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-b-2 focus:border-ptext-black rounded-sm' />
                <input type="email" name="" id="" placeholder='Email' className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-b-2 focus:border-ptext-black rounded-sm' />
                <input type="tel" name="" id="" placeholder='Phone' className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-b-2 focus:border-ptext-black rounded-sm' />
                <textarea name="" id="" className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-b-2 focus:border-ptext-black rounded-sm ' cols='8' rows='10' placeholder='Message'/>
                
                   <button
            className="relative cursor-pointer py-4 px-8 text-center font-barlow inline-flex justify-center text-base uppercase text-[#101050] rounded-lg border-solid transition-transform duration-300 ease-in-out group outline-offset-4 focus:outline-2 focus:outline-[#101050] focus:outline-offset-4 overflow-hidden bg-amber-50"
            
          >
            <span className="relative  ">submit</span>

            <span className="absolute left-[-75%] top-0 h-full w-[50%] bg-white/20 rotate-12 z-10 blur-lg group-hover:left-[125%] transition-all duration-1000 ease-in-out"></span>

            <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#101050] absolute h-[20%] rounded-tl-lg border-l-2 border-t-2 top-0 left-0"></span>
            <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#101050] absolute group-hover:h-[90%] h-[60%] rounded-tr-lg border-r-2 border-t-2 top-0 right-0"></span>
            <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#101050] absolute h-[60%] group-hover:h-[90%] rounded-bl-lg border-l-2 border-b-2 left-0 bottom-0"></span>
            <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#101050] absolute h-[20%] rounded-br-lg border-r-2 border-b-2 right-0 bottom-0"></span>
          </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
export default Contact