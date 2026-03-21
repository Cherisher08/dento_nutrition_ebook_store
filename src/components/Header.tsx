import { useNavigate } from "react-router-dom";
import Search from "./Search";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <img src="/logo.jpeg" alt="Dento Nutrition Logo" className="w-16 h-16" />
        <h1 className="text-2xl font-bold text-gray-800">
          <span className="text-blue-400">DENTO</span> NUTRITION
        </h1>
      </div>

      <div className="flex-1 flex justify-end max-md:hidden">
        <button
          onClick={() => navigate("/admin")}
          className="text-sm text-gray-500 hover:text-orange-500 border border-gray-200 hover:border-orange-300 px-3 py-1.5 rounded-lg transition cursor-pointer"
        >
          Admin Console
        </button>
        <Search />
      </div>
    </header>
  );
};
