import React, { useState } from 'react';
import useFormValidation from './useFormValidation';
import './App.css'; // Assuming Bootstrap CSS is imported in App.css

function JobApplicationForm() {
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    positionApplyingFor: '',
    relevantExperience: '',
    portfolioUrl: '',
    managementExperience: '',
    additionalSkills: [],
    preferredInterviewTime: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [submittedData, setSubmittedData] = useState({});
  const { errors, validate } = useFormValidation();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setValues((prevValues) => ({
        ...prevValues,
        additionalSkills: checked
          ? [...prevValues.additionalSkills, value]
          : prevValues.additionalSkills.filter((skill) => skill !== value)
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        [id]: value
      }));
    }
  };

  const handlePositionChange = (e) => {
    const { value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      positionApplyingFor: value,
      relevantExperience: '',
      portfolioUrl: '',
      managementExperience: ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(values)) {
      setSubmittedData(values);
      setFormSubmitted(true);
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setFormSubmitted(false);
  };

  const handleReset = () => {
    setValues({
      fullName: '',
      email: '',
      phoneNumber: '',
      positionApplyingFor: '',
      relevantExperience: '',
      portfolioUrl: '',
      managementExperience: '',
      additionalSkills: [],
      preferredInterviewTime: ''
    });
    setFormSubmitted(false);
    setIsEditing(false);
  };

  // Get current date and time in the format required by the datetime-local input
  const getCurrentDateTime = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localDate = new Date(now.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16);
  };

  return (
    <div className="container mt-5">
      {!formSubmitted || isEditing ? (
        <div>
          <h2>{isEditing ? 'Edit Job Application Form' : ''}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                value={values.fullName}
                onChange={handleChange}
                required
              />
              {errors.fullName && <div className="text-danger">{errors.fullName}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={values.email}
                onChange={handleChange}
                required
              />
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                id="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                required
              />
              {errors.phoneNumber && <div className="text-danger">{errors.phoneNumber}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="positionApplyingFor" className="form-label">Applying for Position</label>
              <select
                className="form-select"
                id="positionApplyingFor"
                value={values.positionApplyingFor}
                onChange={handlePositionChange}
                required
              >
                <option value="">Select Position</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Manager">Manager</option>
              </select>
              {errors.positionApplyingFor && <div className="text-danger">{errors.positionApplyingFor}</div>}
            </div>
            {(values.positionApplyingFor === 'Developer' || values.positionApplyingFor === 'Designer') && (
              <div className="mb-3">
                <label htmlFor="relevantExperience" className="form-label">Relevant Experience (Years)</label>
                <input
                  type="number"
                  className="form-control"
                  id="relevantExperience"
                  value={values.relevantExperience}
                  onChange={handleChange}
                  min="1"
                  required
                />
                {errors.relevantExperience && <div className="text-danger">{errors.relevantExperience}</div>}
              </div>
            )}
            {values.positionApplyingFor === 'Designer' && (
              <div className="mb-3">
                <label htmlFor="portfolioUrl" className="form-label">Portfolio URL</label>
                <input
                  type="url"
                  className="form-control"
                  id="portfolioUrl"
                  value={values.portfolioUrl}
                  onChange={handleChange}
                  required
                />
                {errors.portfolioUrl && <div className="text-danger">{errors.portfolioUrl}</div>}
              </div>
            )}
            {values.positionApplyingFor === 'Manager' && (
              <div className="mb-3">
                <label htmlFor="managementExperience" className="form-label">Management Experience</label>
                <input
                  type="text"
                  className="form-control"
                  id="managementExperience"
                  value={values.managementExperience}
                  onChange={handleChange}
                  required
                />
                {errors.managementExperience && <div className="text-danger">{errors.managementExperience}</div>}
              </div>
            )}
            <div className="mb-3">
              <label className="form-label">Additional Skills</label><br/>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="JavaScript"
                  value="JavaScript"
                  checked={values.additionalSkills.includes('JavaScript')}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="JavaScript">JavaScript</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="CSS"
                  value="CSS"
                  checked={values.additionalSkills.includes('CSS')}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="CSS">CSS</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="Python"
                  value="Python"
                  checked={values.additionalSkills.includes('Python')}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="Python">Python</label>
              </div>
              {/* Add more checkboxes for additional skills as needed */}
            </div>
            <div className="mb-3">
              <label htmlFor="preferredInterviewTime" className="form-label">Preferred Interview Time</label>
              <input
                type="datetime-local"
                className="form-control"
                id="preferredInterviewTime"
                value={values.preferredInterviewTime}
                onChange={handleChange}
                min={getCurrentDateTime()}
                required
              />
              {errors.preferredInterviewTime && <div className="text-danger">{errors.preferredInterviewTime}</div>}
            </div>
            <button type="submit" className="btn btn-primary">{isEditing ? 'Update' : 'Submit'}</button>
            {isEditing && (
              <button type="button" className="btn btn-secondary ms-2" onClick={handleReset}>Cancel</button>
            )}
          </form>
        </div>
      ) : (
        <div>
          <h2>Submission Summary</h2>
          <p><strong>Full Name:</strong> {submittedData.fullName}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Phone Number:</strong> {submittedData.phoneNumber}</p>
          <p><strong>Position Applying For:</strong> {submittedData.positionApplyingFor}</p>
          {submittedData.positionApplyingFor === 'Developer' || submittedData.positionApplyingFor === 'Designer' ? (
            <p><strong>Relevant Experience:</strong> {submittedData.relevantExperience} years</p>
          ) : null}
          {submittedData.positionApplyingFor === 'Designer' ? (
            <p><strong>Portfolio URL:</strong> <a href={submittedData.portfolioUrl} target="_blank" rel="noopener noreferrer">{submittedData.portfolioUrl}</a></p>
          ) : null}
          {submittedData.positionApplyingFor === 'Manager' ? (
            <p><strong>Management Experience:</strong> {submittedData.managementExperience}</p>
          ) : null}
          <p><strong>Additional Skills:</strong> {submittedData.additionalSkills.join(', ')}</p>
          <p><strong>Preferred Interview Time:</strong> {submittedData.preferredInterviewTime}</p>
          <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default JobApplicationForm;
