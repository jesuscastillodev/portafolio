import frontendData from "/src/constants/frontend.json";
import toolsData from "/src/constants/tools.json";
import backendData from "/src/constants/backend.json";
import TechContainer from "./TechContainer";
import Title from "/src/components/title";
const TechStack = () => {
  return (
    <section className="flex flex-col p-4 py-8 gap-8 w-full justify-center items-center">
      <Title title="Habilidades y Herramientas" ></Title>
      <div className="grid lg:grid-cols-3 grid-cols-1 w-full gap-8">
        <TechContainer title={"Frontend"} tools={frontendData} />
        <TechContainer title={"Backend"} tools={backendData} />
        <TechContainer title={"Herramientas"} tools={toolsData} />
      </div>
    </section>
  );
};

export default TechStack;
