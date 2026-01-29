import Hero from '@/components/Hero';
import InfiniteMarquee from '@/components/ui/InfiniteMarquee';
import FooterReceipt from '@/components/ui/FooterReceipt';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Ambient Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <Hero />

      {/* Tech Stack Marquee */}
      <div className="relative z-10 my-12">
        <InfiniteMarquee />
      </div>

      <FooterReceipt />
    </main>
  );
}
