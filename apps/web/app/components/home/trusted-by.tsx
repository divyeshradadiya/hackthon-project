export function TrustedBy() {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-lg font-medium text-neutral-gray">Trusted by educators and parents worldwide</h2>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          { [
            { name: "Oakridge Academy", logo: "OA" },
            { name: "Bright Future Schools", logo: "BFS" },
            { name: "Learning Tree Institute", logo: "LTI" },
            { name: "Global Education Partners", logo: "GEP" },
            { name: "Smart Kids Foundation", logo: "SKF" },
          ].map((partner, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary font-bold">
                {partner.logo}
              </div>
              <span className="font-medium text-dark-gray">{partner.name}</span>
            </div>
          )) }
        </div>
      </div>
    </section>
  )
}
