import { MapPin, Calendar, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-gold/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="font-display text-2xl font-bold gold-text-gradient mb-3">
              Maha Yagam 2026
            </h3>
            <p className="text-muted-foreground text-sm">
              Experience the divine. Transform your life.
              A once-in-a-lifetime spiritual gathering.
            </p>
          </div>

          {/* Event Details */}
          <div className="text-center">
            <h4 className="font-display text-lg font-semibold text-gold mb-4">Event Details</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4 text-gold" />
                <span>February 26, 2026</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-gold" />
                <span>Hotel Hills, Hosur</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <h4 className="font-display text-lg font-semibold text-gold mb-4">Contact Us</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-end gap-2 text-muted-foreground">
                <Phone className="w-4 h-4 text-gold" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center justify-center md:justify-end gap-2 text-muted-foreground">
                <Mail className="w-4 h-4 text-gold" />
                <span>info@shivaratri2025.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gold/10 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 Maha Yagam Divine Experience. All rights reserved.
          </p>
          <p className="text-xs text-gold/50 mt-2 font-display">
            ॐ नमः शिवाय • Om Namah Shivaya
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
