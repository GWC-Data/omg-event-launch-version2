import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9">
        <Moon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Moon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      ) : (
        <Sun className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

