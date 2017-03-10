import React from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import TextInput from '../common/TextInput';
import TextAreaInput from '../common/TextAreaInput';
import RemoveRowButton from '../common/RemoveRowButton';
import Admin from '../common/Admin';

const ConsultationDetailsForm = ({updateTitleState, updateCostState, updateSessionTimeState, updateShortState, updateConsultationDescState, removeRow, saveDietConsultation, dietConsultation, errors, saving, deleteDietConsultation }) => {

  let displayIcon = function (icon, iconWidth, iconHeight) {
    let requireImg = icon ? require(`../../images/${icon}`) : ""
    const iconImg = {
      backgroundImage: 'url(' + requireImg + ')',
      backgroundSize: `${iconWidth} ${iconHeight}`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }
    return (<div className="icon-circle-sm bg-color-green mdl-shadow--4dp" style={iconImg}></div>)
  }
  return (
    <div className="row">
      <div className="col-xs-12 col-sm-offset-1 col-sm-10">
        {dietConsultation.consultationDetails.map(consultationDetails =>
          <div className="col-xs-12 col-sm-6">
            <div className="mdl-card mdl-shadow--8dp bright-bg-color m-t-30 p-1-em allow-overflow">
              {displayIcon(consultationDetails.icon, consultationDetails.iconWidth, consultationDetails.iconHeight)}
              <TextInput
                className="p-t-0 p-b-0"
                name={dietConsultation.consultationDetails.findIndex(i => i.id == consultationDetails.id)}
                label="Title"
                placeholder="Title"
                value={dietConsultation.title}
                onChange={updateTitleState} />
              <TextInput
                className="p-t-0 p-b-0"
                name={dietConsultation.consultationDetails.findIndex(i => i.id == consultationDetails.id)}
                label="Cost"
                placeholder="Cost"
                value={dietConsultation.cost}
                onChange={updateCostState} />
              <TextInput
                className="p-t-0 p-b-0"
                name={dietConsultation.consultationDetails.findIndex(i => i.id == consultationDetails.id)}
                label="Consultation Duration"
                placeholder="Consultation Duration"
                value={dietConsultation.session_time}
                onChange={updateSessionTimeState} />
              <TextInput
                className="p-t-0 p-b-0"
                name={dietConsultation.consultationDetails.findIndex(i => i.id == consultationDetails.id)}
                label="Short Description"
                placeholder="Short Description"
                value={dietConsultation.short}
                onChange={updateShortState} />
              <TextAreaInput
                className="p-t-0 p-b-0"
                name={dietConsultation.consultationDetails.findIndex(i => i.id == consultationDetails.id)}
                label="Consultation Description"
                placeholder="Consultation Description"
                value={dietConsultation.consultation_desc}
                onChange={updateConsultationDescState} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

ConsultationDetailsForm.propTypes = {
  dietConsultation: React.PropTypes.object.isRequired,
  updateDietConsultationState: React.PropTypes.object.isRequired,
  saving: React.PropTypes.object.isRequired,
  saveDietConsultation: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object
};

export default ConsultationDetailsForm;