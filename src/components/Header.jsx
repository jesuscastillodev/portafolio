import logo from "/images/logo-jcastillo.webp";
const Header = () => {
  return (
    <header className="flex flex-col p-4 py-8 items-center">
      <div className="flex justify-between w-full items-center">
        <img
          className="h-12 transform transition duration-500 hover:scale-110"
          src={logo}
          alt="Logo jcastillo.dev"
        />
        <div className="flex flex-row gap-4 items-center">
          <a className="cursor-pointer text-white bg-blue-950 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none">
            Trabajemos juntos
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
