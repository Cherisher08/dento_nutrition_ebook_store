import Search from "./Search";

export const Header = () => {

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold text-gray-800">
          <span className="text-pink-600">DENTO</span> PRESS
        </h1>
      </div>

      <div className="flex-1 flex justify-end max-md:hidden">
        <Search />
      </div>
    </header>
  );
};
