import RainingLetters from "@/components/ui/modern-animated-hero-section";
import { HeartFavorite } from "@/components/ui/heart-favorite-shadcnui";

export default function Home() {
  return (
    <main className="bg-black overflow-x-hidden min-h-screen relative">
      <RainingLetters />
      
      <div className="absolute top-6 left-6 z-50 pointer-events-auto opacity-80 hover:opacity-100 transition-opacity">
        <HeartFavorite />
      </div>
    </main>
  );
}
