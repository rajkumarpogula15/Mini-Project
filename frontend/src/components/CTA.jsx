import { useNavigate } from 'react-router-dom';

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section
      className="flex flex-wrap justify-between items-center px-8 py-12 gap-8 bg-[#f5f9ff] rounded-[12px]"
    >
     

      {/* Text on the right */}
      <div className="flex-1 min-w-[280px]">
        <div className="ml-[4.5rem]">
          <h2 className="text-[2rem] font-semibold mb-4 text-[#222]">
            Ready to Plan Your Event?
          </h2>
          <p className="text-[1.1rem] text-[#555] mb-6">
            Get started and make your event unforgettable!
          </p>

                   <button
            className="relative cursor-pointer py-4 px-8 text-center font-barlow inline-flex justify-center text-base uppercase text-[#101050] rounded-lg border-solid transition-transform duration-300 ease-in-out group outline-offset-4 focus:outline-2 focus:outline-[#101050] focus:outline-offset-4 overflow-hidden bg-amber-100"
            onClick={() => navigate('/contact')}
          >
            <span className="relative z-20">Contact us</span>

            <span className="absolute left-[-75%] top-0 h-full w-[50%] bg-white/20 rotate-12 z-10 blur-lg group-hover:left-[125%] transition-all duration-1000 ease-in-out"></span>

            <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#101050] absolute h-[20%] rounded-tl-lg border-l-2 border-t-2 top-0 left-0"></span>
            <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#101050] absolute group-hover:h-[90%] h-[60%] rounded-tr-lg border-r-2 border-t-2 top-0 right-0"></span>
            <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#101050] absolute h-[60%] group-hover:h-[90%] rounded-bl-lg border-l-2 border-b-2 left-0 bottom-0"></span>
            <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#101050] absolute h-[20%] rounded-br-lg border-r-2 border-b-2 right-0 bottom-0"></span>
          </button>
        </div>
      </div>


       {/* Image on the left */}
      <div className="flex-1 min-w-[580px] flex justify-center">
        <img
          src="images/patner.png"
          alt="Partner"
          className="w-1/2 max-w-[500px] h-auto rounded-[10px] shadow-md mr-[3.5rem]"
        />
      </div>
    </section>
  );
};

export default CTA;
