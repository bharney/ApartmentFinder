import React from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import DatePicker from 'material-ui/DatePicker';
import TextInput from '../common/TextInput';
import AddRowButton from '../common/AddRowButton';
import Admin from '../common/Admin';

const ScheduleForm = ({updateClassState, updateDateState, updateScheduleTimeState, removeRow, saveSchedule, schedule, errors, saving, deleteSchedule}) => {

  const vertAlign = {
    verticalAlign: "middle"
  }

  return (
    <form>
      <table className="table table-hover">
        <thead>
          <tr>
            <th colSpan="2">
              <DatePicker
                formatDate={new Intl.DateTimeFormat('en-US', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }).format}
                hintText="Date"
                value={schedule.session_date == '' ? new Date() : new Date(schedule.session_date)} name="session_date"
                onChange={updateDateState} />
            </th>
          </tr>
        </thead>
        {schedule.session_details.map(session_details =>
          <tbody>
            <tr>
              <td style={vertAlign} className="text-center">
                <AddRowButton
                  name={schedule.session_details.findIndex(i => i.id == session_details.id)}
                  onClick={removeRow} />
              </td>
              <td>
                <TextInput
                  className="p-t-0 p-b-0"
                  name={schedule.session_details.findIndex(i => i.id == session_details.id)}
                  label="Time"
                  placeholder="Time"
                  value={session_details.session_time}
                  onChange={updateScheduleTimeState} />
              </td>
              <td>
                <TextInput
                  className="p-t-0 p-b-0"
                  name={schedule.session_details.findIndex(i => i.id == session_details.id)}
                  label="Class"
                  placeholder="Class"
                  value={session_details.class}
                  onChange={updateClassState} />
              </td>
            </tr>
          </tbody>)
        }
      </table>
    </form>
  );
};

ScheduleForm.propTypes = {
  schedule: React.PropTypes.object.isRequired,
  updateScheduleState: React.PropTypes.object.isRequired,
  saving: React.PropTypes.object.isRequired,
  saveSchedule: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object
};

export default ScheduleForm;