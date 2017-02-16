import React, { PropTypes } from 'react';

const MultilineText = ({multilineText}) => {

  return (
    <div>
      {multilineText.split("\\n").map(lineText => {
        return <div>{lineText}&nbsp;</div>;
      })}
    </div>
  );
};

MultilineText.propTypes = {
  multilineText: PropTypes.string.isRequired,

};

export default MultilineText;
