import Image from "next/image"

export default function Footer() {
  return (
    <footer className="flex items-center justify-end md:justify-center bg-[#003366] text-gray-300 py-10 md:py-0 md:h-[401px]">
      <div className="flex flex-col items-center justify-center container gap-4 px-4 py-2 md:px-6">
          <h2 className="text-4xl md:text-[102.02px] font-bold text-[#F8E71C]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
          FitsCheck
          </h2>
          <div className="text-center text-xl" style={{ fontFamily: "Satoshi Variable" }}>
          <p>© {new Date().getFullYear()} FitsCheck. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
