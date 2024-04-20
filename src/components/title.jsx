import propTypes from 'prop-types';
import React from 'react';
const Title = ({ title }) => {
  const textElements = title.split(" ").map((word, index) => {
    if (index === 0) {
      return <span key={index} className='text-blue-600'>{word}</span>;
    }
    return word;
  }).map((element, index) => (
    // Agregamos espacios entre los elementos manualmente, excepto para el primer elemento
    <React.Fragment key={index}>
      {index !== 0 && " "}
      {element}
    </React.Fragment>
  ));
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold">{textElements}</h1>
    </div>
  );
}
Title.propTypes = {
  title: propTypes.string.isRequired
};
export default Title;