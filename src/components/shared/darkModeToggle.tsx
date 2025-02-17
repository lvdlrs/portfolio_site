import { Moon, Sun } from "lucide-react"; // Lucide icons for better UI
import { useTheme } from "./darkModeContext";

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-all duration-300 absolute top-5 right-5 dark:bg-white dark:text-black z-10"
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

export default DarkModeToggle;
