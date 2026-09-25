import { Suspense, useState, useCallback } from "react";
import { Router as WouterRouter, Switch, Route } from "wouter";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Techniques from "@/components/Techniques";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import LoadingScreen from "@/components/LoadingScreen";
import Cursor from "@/components/Cursor";
import NoiseOverlay from "@/components/NoiseOverlay";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";

function Portfolio() {
  const [loaded, setLoaded] = useState(false);
  const onDone = useCallback(() => setLoaded(true), []);

  return (
    <div className="portfolio-root relative min-h-screen" style={{ background: "#050508" }}>
      <Cursor />
      <NoiseOverlay />
      <ScrollProgress />
      <BackToTop />
      {!loaded && <LoadingScreen onDone={onDone} />}
      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <Services />
          <About />
          <Skills />
          <Techniques />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Switch>
        <Route path="/" component={Portfolio} />
        <Route component={Portfolio} />
      </Switch>
    </WouterRouter>
  );
}

export default App;
