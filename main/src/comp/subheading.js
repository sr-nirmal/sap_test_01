import React from 'react';

const Subheading = ({ title, description }) => {
  return (
    <div className="subheading">
      <h3 className="subtitle">{title}</h3>
      <p className='subtitle-title-edscription'>{description}</p>
    </div>
  );
};

export default Subheading;

