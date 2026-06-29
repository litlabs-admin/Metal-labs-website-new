import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Problem from "@/components/Problem/Problem";
import Solutions from "@/components/Solutions/Solutions";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import ProductAgents from "@/components/ProductAgents/ProductAgents";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Problem />
      <Solutions />
      <HowItWorks />
      <ProductAgents />
    </main>
  );
}
