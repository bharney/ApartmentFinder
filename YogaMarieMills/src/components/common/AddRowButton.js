import React, { PropTypes } from 'react';

const AddRowButton = ({name, onClick}) => {
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

AddRowButton.propTypes = {
  name: PropTypes.string.isRequired,
  removeRow: PropTypes.func.isRequired,
};

export default AddRowButton;
