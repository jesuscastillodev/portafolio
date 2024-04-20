import { useTheme } from "/src/context/ThemeContext";
import propTypes from 'prop-types';
const WorkItem = ({ work }) => {
  const { darkMode } = useTheme();
  return (
    <div className={`lg:w-full md:w-full sm bg-gray-50 dark:bg-[#081540] rounded-lg flex items-center flex-row gap-4 animate__animated ${work.display=="rtl"?"flex-row-reverse animate__fadeInBottomLeft":"animate__fadeInBottomRight"}`}>
      <div className="w-1/3"><img src={darkMode && work.imgLight? work.imgLight:work.img} className="w-full object-contain" alt={work.title} /></div>
      <div className="w-2/3 p-8"><h2 className="text-2xl">Empresa: <span className="text-blue-600">{work.title}</span></h2><p>{work.description}</p><p className="text-xl">Rol: <span className="text-blue-600">{work.role}</span></p></div>
    </div>
  );
};
WorkItem.propTypes = {
  work: propTypes.object.isRequired
};
export default WorkItem;
