import React from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import TextInput from '../common/TextInput';
import TextAreaInput from '../common/TextAreaInput';
import RemoveRowButton from '../common/RemoveRowButton';
import Admin from '../common/Admin';

const MassageForm = ({updateMassageState, uploadImage, removeRow, saveMassage, massage, errors, saving, deleteMassage}) => {
  
  let displayIcon = function (icon, iconWidth, iconHeight) {
            debugger;
             let requireImg = icon ? require(`../../images/${icon}`) : ""
            const iconImg = {
                backgroundImage: 'url(' + requireImg + ')',
                backgroundSize: `${iconWidth} ${iconHeight}`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }
            return (<div className="icon-circle-sm bg-color-green mdl-shadow--4dp" style={iconImg}></div>)
        }
        let offset = false;
        let offsetColumns = function (massage_details) {
            if (offset) {
                offset = false;
                return (
                    <div className="row">
                        <div className="col-xs-12 col-sm-offset-1 col-sm-4">
                            <h4><strong>{massage_details.title}</strong></h4>
                            <p>{massage_details.description}</p>
                        </div>
                    </div>
                )
            }
            else {
                offset = true;
                return (
                    <div className="col-xs-12 col-sm-offset-2 col-sm-4">
                        <h4><strong>{massage_details.title}</strong></h4>
                        <p>{massage_details.description}</p>
                    </div>
                )
            }

        }

  return (
      <form>
        <div className="row p-t-1-em">
            <div className="col-xs-10 col-xs-offset-1 p-t-1-em">
                {displayIcon(massage.icon, massage.iconWidth, massage.iconHeight)}
                <TextInput
                  className="p-t-0 p-b-0"
                  name="title"
                  label="Title"
                  placeholder="Title"
                  value={massage.title}
                  onChange={updateMassageState} />
                <hr width="50%" className="center-block" />
                <TextInput
                  className="p-t-0 p-b-0"
                  name="cost"
                  label="Cost"
                  placeholder="Cost"
                  value={massage.cost}
                  onChange={updateMassageState} />
                <TextInput
                  className="p-t-0 p-b-0"
                  name="time"
                  label="Time"
                  placeholder="Time"
                  value={massage.session_time}
                  onChange={updateMassageState} />
              </div>
        </div>
        <div className="row">
            <div className="col-xs-12 col-sm-offset-1 col-sm-10">
                {massage.massage_details.map(massage_details =>
                  <div className="col-xs-6">
                    <div className="pull-right">
                    <RemoveRowButton
                      name={massage.massage_details.findIndex(i => i.id == massage.id)}
                      onClick={removeRow} />
                      </div>
                    <TextInput
                      className="p-t-0 p-b-0"
                      name={massage.massage_details.findIndex(i => i.id == massage.id)}
                      label="Title"
                      placeholder="Title"
                      value={massage_details.title}
                      onChange={updateMassageState} />
                    <TextAreaInput
                      className="p-t-0 p-b-0"
                      name={massage.massage_details.findIndex(i => i.id == massage.id)}
                      label="Description"
                      placeholder="Description"
                      rows="4"
                      value={massage_details.description}
                      onChange={updateMassageState} />
                  </div>
                )}
            </div>
        </div>
    </form>
  );
};

MassageForm.propTypes = {
  massage: React.PropTypes.object.isRequired,
  updateMassageState: React.PropTypes.object.isRequired,
  saving: React.PropTypes.object.isRequired,
  saveMassage: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object
};

export default MassageForm;