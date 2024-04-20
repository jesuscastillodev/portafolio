import workData from "/src/constants/works.json";
import WorkItem from "./workItem.jsx";
import Title from "/src/components/title.jsx";
const Works = () => {
  return (
    <section className="flex flex-col p-4 py-8 gap-8 w-full justify-center items-center">
      <Title title="Trabajos Realizados" ></Title>
      {workData.map((work, index) => (
        <WorkItem key={index} work={work} />
      ))}
    </section>
  );
};
export default Works;
