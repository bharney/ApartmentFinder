import React from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import TextInput from '../common/TextInput';
import AddRowButton from '../common/AddRowButton';
import Admin from '../common/Admin';

const MassageForm = ({updateMassageState, uploadImage, removeRow, saveMassage, massages, errors, saving, deleteMassage}) => {

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
          {massages.map(massage =>
              <div className="col-xs-12 m-b-30">
                  <div className="mdl-card mdl-shadow--4dp p-t-1-em p-b-3-em">
                      <div className="row p-t-1-em">
                          <div className="col-xs-12 p-t-1-em">
                              {displayIcon(massage.icon, massage.iconWidth, massage.iconHeight)}
                              <h3 className="text-center"><strong>{massage.title}</strong></h3>
                              <hr width="50%" className="center-block" />
                              <p className="text-center">{massage.cost}</p>
                          </div>
                      </div>
                      <p className="text-center">{massage.session_time}</p>
                      <div className="row">
                          <div className="col-xs-12 col-sm-offset-1 col-sm-10">
                              {massage.massage_details.map(massage_details =>
                                <div className="col-xs-6">
                                  <AddRowButton
                                    name={massages.massage.findIndex(i => i.id == massage.id)}
                                    onClick={removeRow} />
                                  <TextInput
                                    className="p-t-0 p-b-0"
                                    name={massages.massage.findIndex(i => i.id == massage.id)}
                                    label="Time"
                                    placeholder="Time"
                                    value={massage_details.title}
                                    onChange={updateMassageState} />
                                  <TextInput
                                    className="p-t-0 p-b-0"
                                    name={massages.massage.findIndex(i => i.id == massage.id)}
                                    label="Time"
                                    placeholder="Time"
                                    value={massage_details.description}
                                    onChange={updateMassageState} />
                                </div>
                              )}
                          </div>
                      </div>
                  </div>
              </div>
          )}
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