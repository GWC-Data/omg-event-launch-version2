import { Clock, Users, Gem, Award } from "lucide-react";

const highlights = [
  {
    icon: Award,
    title: "Guinness World Record",
    description: "Be part of history as we attempt to set a world record",
  },
  {
    icon: Gem,
    title: "1,00,000 Rudraksha",
    description: "Each bead blessed with 1,00,000 powerful mantras",
  },
  {
    icon: Users,
    title: "25 Pandithars",
    description: "Top spiritual masters conducting the sacred ceremony",
  },
  {
    icon: Clock,
    title: "34 Hours",
    description: "Continuous chanting infusing divine energy",
  },
];

const EventHighlights = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold gold-text-gradient mb-4">
            The Sacred Event
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A once-in-a-lifetime opportunity to witness and participate in a historic spiritual gathering
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="group p-6 bg-card-gradient rounded-xl border border-gold/20 hover:border-gold/50 transition-all duration-300 hover:shadow-divine"
            >
              <div className="w-14 h-14 rounded-full bg-divine-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <item.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-gold mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Divine message */}
        <div className="mt-16 text-center p-8 bg-card-gradient rounded-2xl border border-gold/30">
          <p className="font-display text-xl md:text-2xl text-foreground italic">
            "You will be assigned a dedicated time during this pooja to receive{" "}
            <span className="text-gold">Lord Shiva's blessings</span> directly"
          </p>
        </div>
      </div>
    </section>
  );
};

export default EventHighlights;
