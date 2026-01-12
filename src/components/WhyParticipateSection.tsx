import { Heart, Shield, Sparkles, Users, Star, Zap } from "lucide-react";

const reasons = [
  {
    icon: Sparkles,
    title: "Pooja of All Poojas",
    description: "A once in a lifetime opportunity to witness the longest non stop pooja ever performed.",
  },
  {
    icon: Shield,
    title: "Divine Vibrations",
    description: "Experience the transformative power of 1 million chants of lord Shivas name by 25 devoted pandithars, turning negativity into positivity.",
  },
  {
    icon: Heart,
    title: "The Sacred Seed",
    description: "1,00,000 Rudraksha beads elevated through mantric purification, each infused with Lord Shiva’s name a million times.",
  },
  {
    icon: Users,
    title: "Historic Moment",
    description: "Join a massive spiritual gathering and be part of a Guinness World Record attempt.",
  },
  // {
  //   icon: Star,
  //   title: "Historic Moment",
  //   description: "Witness and be part of a Guinness World Record attempt - a historic event that will be remembered for generations.",
  // },
  // {
  //   icon: Zap,
  //   title: "Life-Changing Blessings",
  //   description: "Carry home the divine energy through blessed Rudraksha beads, infused with 1,00,000 powerful mantras for eternal prosperity.",
  // },
];

const WhyParticipateSection = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-divine-purple/5 via-background to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Why We Are Doing This */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs uppercase tracking-widest mb-4">
            Our Sacred Mission
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            Why <span className="gold-text-gradient">Maha Yagam</span>?
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 text-muted-foreground text-lg leading-relaxed">
            <p>
              In an age of turmoil and uncertainty, humanity turns to the divine for strength and upliftment.
              <span className="text-gold font-medium"> Maha Yagam 2026</span> is our humble offering to Lord Shiva — the longest non stop pooja ever performed on Earth
            </p>
             <p>
              On the auspicious night of Maha Shivarathri,
              <span className="text-gold font-medium"> Oh My God (OMG)</span> launches its first grand spiritual event. For
              <span className="text-gold font-medium"> 34 continuous hours, 25 devoted pandithars</span> will chant the sacred Rudhram 
              <span className="text-gold font-medium">1 million times, sanctifying 1,00,000 Rudraksha beads</span> with mantric energy.
            </p>
            <p>
              We believe that when <span className="text-gold font-medium">1,00,000 sacred mantras</span> are chanted 
              over <span className="text-gold font-medium">1,00,000 Rudraksha beads</span> by devoted Pandithars, 
              it creates a powerful vortex of divine energy that can heal, protect, and transform lives.
            </p>
          </div>
        </div>

        {/* Why You Should Participate */}
        <div className="mb-12">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-center text-foreground mb-10">
            Why <span className="gold-text-gradient">You</span> Should Be There
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-card/80 dark:bg-card/50 backdrop-blur-sm border border-gold/20 dark:border-gold/10 hover:border-gold/40 dark:hover:border-gold/30 transition-all duration-500 hover:shadow-lg hover:shadow-gold/10 dark:hover:shadow-gold/5 shadow-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 dark:from-gold/5 via-transparent to-divine-purple/10 dark:to-divine-purple/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-gold/15 dark:bg-gold/10 border border-gold/30 dark:border-gold/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <reason.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h4 className="font-display text-lg font-semibold text-foreground mb-2">
                    {reason.title}
                  </h4>
                  <p className="text-muted-foreground dark:text-muted-foreground text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divine Quote */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-gold/5 via-card/50 to-divine-purple/5 border border-gold/20">
            <p className="font-display text-xl md:text-2xl text-foreground italic mb-4">
              "When devotion meets divine grace, miracles happen."
            </p>
            <p className="text-gold text-sm uppercase tracking-widest">
              — Ancient Wisdom
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyParticipateSection;
