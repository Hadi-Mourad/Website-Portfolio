import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Leadership from "@/components/Leadership";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Beyond from "@/components/Beyond";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { ViewModeProvider } from "@/components/ViewMode";

export default function Home() {
  return (
    <ViewModeProvider>
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Leadership />
        <Projects />
        <Skills />
        <Beyond />
        <Contact />
      </main>
      <Footer />
    </ViewModeProvider>
  );
}
