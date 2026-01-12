import { Gift, Music, Utensils, Camera, Heart, Sparkles } from "lucide-react";

const attractions = [
  {
    icon: Music,
    title: "o	Divine Vibration",
    description: "A Spiritual Saga unfolds",
  },
  {
    icon: Gift,
    title: "Pre Booking Rudraksh",
    description: "Get a special opportunity to own the special rudraksh post Mahashivarathri",
  },
  {
    icon: Sparkles,
    title: "OMG gets launched",
    description: "The World’s 1st AI powered spiritual experience brand gets a mega launch pad",
  },
  // {
  //   icon: Gift,
  //   title: "Spiritual Gifts",
  //   description: "Receive blessed items and sacred souvenirs",
  // },
  // {
  //   icon: Heart,
  //   title: "Healing Sessions",
  //   description: "Experience spiritual healing and meditation",
  // },
  // {
  //   icon: Sparkles,
  //   title: "Surprise Reveals",
  //   description: "Special surprises await during the event",
  // },
];

const AttractionsSection = () => {
  return (
    <section className="py-20 relative bg-gradient-to-b from-transparent via-divine-purple/10 to-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold gold-text-gradient mb-4">
            What Awaits You
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Beyond the sacred ceremony, experience these special moments that will enrich your spiritual journey
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          {attractions.map((item, index) => (
            <div
              key={index}
              className="group p-5 bg-card-gradient rounded-xl border border-gold/20 hover:border-gold/50 transition-all duration-300 hover:shadow-divine text-center"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-divine-gradient transition-all">
                <item.icon className="w-6 h-6 text-gold group-hover:text-primary-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center p-8 bg-card-gradient rounded-2xl border border-gold/30 max-w-3xl mx-auto">
          <Sparkles className="w-10 h-10 text-gold mx-auto mb-4" />
          <h3 className="font-display text-2xl font-bold text-gold mb-3">
            There are some interesting things waiting for you!
          </h3>
          <p className="text-muted-foreground">
            Make your presence and be part of this unforgettable divine experience.
            Many more surprises will be revealed at the event!
          </p>
        </div>
      </div>
    </section>
  );
};

export default AttractionsSection;
