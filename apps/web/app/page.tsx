import { Header } from "./components/header"
import { Hero } from "./components/home/hero"
import { TrustedBy } from "./components/home/trusted-by"
import { Features } from "./components/home/features"
// import { HowItWorks } from "./components/home/how-it-works"
import { Testimonials } from "./components/home/testimonials"
import { Cta } from "./components/home/cta"
import { Footer } from "./components/footer"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <Header />
      <Hero />
      <TrustedBy />
      <Features />
      {/* <HowItWorks /> */}
      <Testimonials />
      <Cta />
      <Footer />
    </div>    
  )
}

