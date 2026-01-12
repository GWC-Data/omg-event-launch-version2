import { Star, Users } from "lucide-react";

const celebrities = [
  { name: "Coming Soon", role: "Spiritual Leader", revealed: false },
  { name: "Coming Soon", role: "Film Celebrity", revealed: false },
  { name: "Coming Soon", role: "Business Icon", revealed: false },
  { name: "Coming Soon", role: "Sports Legend", revealed: false },
  { name: "Coming Soon", role: "Political Leader", revealed: false },
  { name: "Coming Soon", role: "Music Maestro", revealed: false },
];

const CelebritySection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-gold/30 mb-4">
            <Star className="w-4 h-4 text-gold" />
            <span className="text-sm text-gold">Special Guests</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold gold-text-gradient mb-4">
            Celebrity Participants
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Be part of this divine experience alongside renowned personalities who will grace this sacred event
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          {celebrities.map((celebrity, index) => (
            <div
              key={index}
              className="group relative p-6 bg-card-gradient rounded-xl border border-gold/20 hover:border-gold/50 transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary border-2 border-gold/30 flex items-center justify-center group-hover:border-gold transition-colors">
                {celebrity.revealed ? (
                  <img src="" alt={celebrity.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <Users className="w-8 h-8 text-gold/50" />
                )}
              </div>
              <h3 className="font-display text-lg font-semibold text-gold mb-1">
                {celebrity.name}
              </h3>
              <p className="text-sm text-muted-foreground">{celebrity.role}</p>
              {!celebrity.revealed && (
                <div className="mt-2 text-xs text-gold/70 animate-pulse">
                  Revealing Soon
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground italic">
            Many more distinguished guests to be announced...
          </p>
        </div>
      </div>
    </section>
  );
};

export default CelebritySection;
