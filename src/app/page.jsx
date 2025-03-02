import HeroSection from '@/components/home/HeroSection';
import Navbar from '../components/home/Navbar';
import Footer from '@/components/home/Footer';

export default function Home() {
  return (
    <div className="relative w-full h-screen flex flex-col bg-background text-foreground">
      {<Navbar />}
      {<HeroSection/>}
      {<Footer/>}
    </div>
  );
}