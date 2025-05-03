import React from 'react';

const Stats = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-6 gap-8">
      {/* Image Section */}
      <img
        src="/images/beard.png"
        alt="Stats Illustration"
        className="w-full max-w-sm h-auto rounded-lg shadow-md"
      />

      {/* Stats Box */}
      <div className="bg-blue-100 border-4 border-blue-600 p-6 rounded-xl max-w-lg w-full shadow-xl">
        <h1 className="text-4xl font-bold text-blue-800 mb-4 text-center">Statistics</h1>
        <p className="text-gray-800 text-lg mb-6 text-center">
          Over <span className="font-semibold text-blue-900">150+ event organizers</span> have successfully conducted their events using our platform. From college fests to corporate summits — we've got it all covered!
        </p>

        <div className="flex justify-center">
       
<button
  class="relative cursor-pointer py-4 px-8 text-center font-barlow inline-flex justify-center text-base uppercase text-[#101050] rounded-lg border-solid transition-transform duration-300 ease-in-out group outline-offset-4  focus:outline-2 focus:outline-[#101050] focus:outline-offset-4 overflow-hidden bg-blue-300"
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
    </div>
  );
};

export default Stats;
