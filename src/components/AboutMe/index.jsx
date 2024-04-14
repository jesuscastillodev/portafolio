import foto from "/images/foto.webp";
const AboutMe = () => {
  return (
    <div className="flex p-4 py-8 gap-8 w-full flex-col lg:flex-row">
      <div className="lg:w-2/3 md:w-full sm bg-white dark:bg-[#081540] rounded-lg p-12 flex items-center flex-row gap-4 animate__animated animate__fadeInBottomLeft">
        <img
          className="h-56 transform transition duration-500 hover:scale-110"
          src={foto}
          alt="foto perfil"
        />
        <div>
          <p className="text-2xl pt-4">¡Hola 👋! soy</p>
          <p className="text-2xl">Jesus Castillo 👨🏻‍💻</p>
          <p className="text-1xl">
            Desarrollador de <span className="text-blue-700">software</span>
          </p>
        </div>
      </div>
      <div className="lg:w-1/3 md:w-full bg-white dark:bg-[#081540] rounded-lg p-8 items-center flex flex-col gap-4 animate__animated animate__fadeInBottomRight">
        <div className="text-3xl">
          Un poco <span className="text-blue-700">sobre mí</span>
        </div>
        <div className="text-1xl">
          <span className="text-blue-700">+8 años</span> de experiencia
          en el desarrollo de software.
        </div>
        <p className="text-1xl">
          Especializado en crear
          <span className="text-blue-700"> soluciones tecnológicas </span>
          innovadoras y eficientes.
        </p>
        <p className="text-1xl">
          <span className="text-blue-700">Pasión por el código</span> y atención
          al detalle en cada proyecto.
        </p>
        <p className="text-1xl">
          Tech lover.
          <span className="text-blue-700 inline-flex items-center">
            Café entusiasta ☕️.
          </span>
          Retos, mi día a día.
        </p>
      </div>
    </div>
  );
};

export default AboutMe;
