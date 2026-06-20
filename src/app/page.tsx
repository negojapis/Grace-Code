import RainingLetters from "@/components/ui/modern-animated-hero-section";
import RotatingEarth from "@/components/ui/wireframe-dotted-globe";

export default function Home() {
  return (
    <main className="bg-black overflow-x-hidden min-h-screen relative">
      <RainingLetters />
      
      <div className="absolute top-6 left-6 z-50 w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] pointer-events-auto mix-blend-screen opacity-80 hover:opacity-100 transition-opacity">
        <RotatingEarth width={120} height={120} />
      </div>
    </main>
  );
}
