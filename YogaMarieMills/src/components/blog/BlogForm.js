import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';


const BlogForm = ({blog, onSave, onChange, loading, errors}) => {
  let loggedIn = false;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xs-offset-1 col-xs-10">
          <h2 >{blog.name}<i id="name" onClick={editing} className="glyphicon glyphicon-pencil btn-primary pencil-icon" aria-hidden="true"></i></h2>
          <div className="col-xs-offset-3 col-xs-7 p-t-20 p-b-20">
            <img width="200" id="image" className="img-circle" src={blog.image} />
            <p id="description" className="dark-color">{blog.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

BlogForm.propTypes = {
  blog: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default BlogForm;


// <TextInput
//             name="name"
//             label="Name"
//             value={blog.name}
//             onChange={onChange}
//             error={errors.name} />

// <input
//             type="submit"
//             disabled={loading}
//             value={loading ? 'Saving...' : 'Save'}
//             className="btn btn-primary"
//             onClick={onSave} />
//         </div>