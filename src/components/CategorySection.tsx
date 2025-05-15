
import { Playlist } from "@/types";

interface CategorySectionProps {
  title: string;
  playlists: Playlist[];
}

export default function CategorySection({ title, playlists }: CategorySectionProps) {
  if (playlists.length === 0) return null;
  
  return (
    <section className="px-6 py-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 overflow-x-auto pb-2">
        {playlists.map(playlist => (
          <div key={playlist.id} className="relative group cursor-pointer">
            <div className="aspect-square bg-secondary rounded-md overflow-hidden mb-2">
              <img 
                src={playlist.coverUrl || '/placeholder.svg'} 
                alt={playlist.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 ml-1">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
              </div>
            </div>
            <h3 className="font-medium truncate">{playlist.name}</h3>
            <p className="text-xs text-muted-foreground">{playlist.tracks.length} tracks</p>
          </div>
        ))}
      </div>
    </section>
  );
}
