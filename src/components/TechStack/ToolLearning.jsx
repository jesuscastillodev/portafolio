import PropTypes from "prop-types";
const Tool = ({ img, name }) => {
  return (
    <div className="w-full animate-pulse flex flex-col items-center justify-center gap-1 p-2">
      <img
        className="grayscale max-h-[70%] w-full object-contain transform transition duration-500 hover:scale-150"
        src={img}
        alt={name}
      />
      <p className="text-xs text-slate-800/50 dark:text-slate-200/50">Aprendiendo</p>
    </div>
  );
};
Tool.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
};
export default Tool;
