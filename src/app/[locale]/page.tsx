import About from "../../components/about";
import Contact from "../../components/contact/index";
// import getDictionary from "../../lib/dictionaries";
import BestSelars from "./_components/BestSelars";
import Hero from "./_components/Hero";

export default async function Home() {
  return (
    <>
      <Hero />
      <BestSelars />
      <About />
      <Contact />
    </>
  );
}
