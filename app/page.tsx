import React from 'react'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import WaitlistForm from '@/components/waitlistForm'
import JoinersCarousel from '@/components/joiners-carousel'
import WhatToExpectSection from '@/components/what-expect'
import FAQSection from '@/components/faq'
import Footer from '@/components/footer'

const PhoneImages = ({ isLarge }: { isLarge: boolean }) => {
  const width = isLarge ? 200 : 100;
  const height = isLarge ? 400 : 200;
  return (
    <div className={isLarge ? "hidden lg:block" : "hidden md:block lg:hidden"}>
      <div className="absolute left-0 top-[70%] -translate-y-1/2">
        <Image src="/phone1.webp" alt="Phone 1" width={width} height={height} className="object-contain" />
      </div>
      <div className="absolute right-0 top-[70%] -translate-y-1/2">
        <Image src="/phone2.webp" alt="Phone 2" width={width} height={height} className="object-contain" />
      </div>
    </div>
  );
};

export default function Waitlist() {
  return (
    <>
      <Navbar />
      <section className="h-screen bg-[url('/new_hero.png')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="relative w-[187px] h-[37px] md:w-[190px] md:h-[45px] ">
            <Image src="/FitsCheck.svg" alt="FitsCheck" fill className="object-contain" priority />
          </div>
        </div>
        {/* Scroll Indicator with Bouncing Mouse */}
        <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-[52px] border-4 border-white rounded-full flex items-start justify-center p-2 animate-bounce" style={{
              animationDuration: "2s",
            }}>
              <div
                className="w-1 h-2 bg-white rounded-full animate-bounce"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="waitlist" className="lg:min-h-screen flex flex-col items-center bg-waitlist text-black pt-20 lg:pt-[118px] pb-0">
        <div className="relative w-full md:min-h-[400px]">
          <PhoneImages isLarge={true} />
          <PhoneImages isLarge={false} />
          <div className="md:hidden absolute right-0 top-[30%] translate-y-full">
            <Image src="/phone2.webp" alt="Phone 2" width={100} height={200} className="object-contain" />
          </div>
          <div className="md:hidden absolute left-0 top-[40%] translate-y-full">
            <Image src="/phone1.webp" alt="Phone 1" width={100} height={200} className="object-contain" />
          </div>

          <WaitlistForm />
        </div>
      </section>
      <section className="pt-0 pb-10 lg:pb-[118px]">
        <JoinersCarousel/>
      </section>
      <WhatToExpectSection/>

      <section id="faq">
        <FAQSection/>
      </section>
      <Footer/>

    </>
  )
}
