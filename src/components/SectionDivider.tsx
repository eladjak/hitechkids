import Image from "next/image"

// Decorative on-brand circuit-board divider (Gemini-generated). Purely visual.
export default function SectionDivider() {
  return (
    <div className="bg-[#0d0620] overflow-hidden">
      <div className="relative max-w-7xl mx-auto h-16 md:h-24 opacity-70">
        <Image
          src="/images/illustrations/divider-circuit.jpg"
          alt="איור לוח מעגלים חשמליים עם רובוטים קטנים — קישוט בין סקציות"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0620] via-transparent to-[#0a0118]" />
      </div>
    </div>
  )
}
