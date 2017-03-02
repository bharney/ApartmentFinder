import React, { PropTypes } from 'react';

const RemoveRowButton = ({name, onClick}) => {
  return (
    <button
      type="button"
      name={name}
      className="btn btn-danger btn-circle"
      onClick={onClick}>
      <i className="glyphicon glyphicon-minus"></i>
    </button>
  );
};

RemoveRowButton.propTypes = {
  name: PropTypes.string.isRequired,
  removeRow: PropTypes.func.isRequired,
};

export default RemoveRowButton;
