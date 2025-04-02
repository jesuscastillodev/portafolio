import Title from "/src/components/title";
const Galery = () => {
  return (
    <section className="flex flex-col p-4 py-8 gap-8 w-full justify-center items-center">
      <Title title="Trabajos Realizados"></Title>
      <div className="w-full bg-gray-50 dark:bg-[#081540] rounded-lg flex items-center flex-col p-8 gap-4 animate__animated">
        <div className="grid grid-cols-6 col-span-2 gap-2">
          <div className="group/item relative bg-[#dcdadb] overflow-hidden rounded-xl col-span-3 max-h-[14rem]">
            <a target="_blank" rel="noreferrer" href="https://boleta.jcastillo.dev/"
              className="group/edit group-hover/item:visible invisible text-white text-xl absolute inset-0  bg-slate-900/80 flex justify-center items-center"
            >
              <div className="text-center">
                <h2 className="text-2xl">Boletas de Honorarios</h2>
                <p>Calcula el monto liquido y bruto para las boletas de honorarios</p>
              </div>
            </a>
            <img
              className="h-full w-full object-cover "
              src="/images/design/trabajo1.png"
              alt=""
            />
          </div>
          <div className="bg-[#dcdadb] overflow-hidden rounded-xl col-span-3 max-h-[14rem]">
            <img
              className="h-full w-full object-cover  "
              src="/images/design/gestiona APP.png"
              alt=""
            />
          </div>
          {/* <div className="bg-[#dcdadb] overflow-hidden rounded-xl col-span-2 max-h-[10rem]">
            <img
              className="h-full w-full object-cover "
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt=""
            />
          </div>
          <div className="bg-[#dcdadb] overflow-hidden rounded-xl col-span-2 max-h-[10rem]">
            <img
              className="h-full w-full object-cover "
              src="https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt=""
            />
          </div>
          <div className="group/item relative overflow-hidden rounded-xl col-span-2 max-h-[10rem]">
            <a
              href=""
              className="group/edit group-hover/item:visible invisible text-white text-xl absolute inset-0  bg-slate-900/80 flex justify-center items-center"
            >
              <div className="text-center">
                <h2 className="text-2xl">Proyecto 1</h2>
                <p>Descripción del proyecto 1</p>
              </div>
            </a>
            <img
              className="h-full w-full object-cover "
              src="https://images.unsplash.com/photo-1560393464-5c69a73c5770?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80"
              alt=""
            />
          </div> */}
        </div>
      </div>
    </section>
  );
};
export default Galery;
