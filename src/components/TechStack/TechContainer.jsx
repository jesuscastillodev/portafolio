import Tool from "./Tool";
import ToolLearning from "./ToolLearning";
import PropTypes from "prop-types";
const TechContainer = ({ title, tools }) => (
  <div className="bg-white dark:bg-[#081540] rounded-lg p-4 flex items-center flex-col gap-4 animate__animated animate__fadeInBottomRight">
    <h2 className="text-3xl">{title}</h2>
    <div className="grid grid-cols-3 gap-4 grid-rows-3 grid-flow-row h-[200px] w-full">
      {tools.map((data, key) => {
        return data.learning?<ToolLearning key={key} img={data.img} name={data.name} />:<Tool key={key} img={data.img} name={data.name} />;
      })}
    </div>
  </div>
);
TechContainer.propTypes = {
    title: PropTypes.string,
    tools: PropTypes.array,
  };
export default TechContainer;
