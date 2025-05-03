import './CTA.css';

function CTA() {
  return (
    <section className="cta">
      <div className="cta-text">
        <div className="cta-inner">
          <h2 className="cta-heading">Ready to Plan Your Event?</h2>
          <p className="cta-description">
            Get started and make your event unforgettable!
          </p>

         
                
<button
  class="relative cursor-pointer py-4 px-8 text-center font-barlow inline-flex justify-center text-base uppercase text-[#101050] rounded-lg border-solid transition-transform duration-300 ease-in-out group outline-offset-4  focus:outline-2 focus:outline-[#101050] focus:outline-offset-4 overflow-hidden bg-amber-100"
>
  <span class="relative z-20">Contact us</span>

  <span
    class="absolute left-[-75%] top-0 h-full w-[50%] bg-white/20 rotate-12 z-10 blur-lg group-hover:left-[125%] transition-all duration-1000 ease-in-out"
  ></span>

  <span
    class="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#101050] absolute h-[20%] rounded-tl-lg border-l-2 border-t-2 top-0 left-0"
  ></span>
  <span
    class="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#101050] absolute group-hover:h-[90%] h-[60%] rounded-tr-lg border-r-2 border-t-2 top-0 right-0"
  ></span>
  <span
    class="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#101050] absolute h-[60%] group-hover:h-[90%] rounded-bl-lg border-l-2 border-b-2 left-0 bottom-0"
  ></span>
  <span
    class="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#101050] absolute h-[20%] rounded-br-lg border-r-2 border-b-2 right-0 bottom-0"
  ></span>
</button>

        </div>
      </div>

      <div className="cta-image">
        <img
          src="images/patner.png"
          alt="Partner"
          className="cta-img"
        />
      </div>
    </section>
  );
}

export default CTA;
