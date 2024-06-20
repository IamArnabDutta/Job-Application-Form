import { useState } from 'react';

const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  const validate = (values) => {
    let errors = {};

    if (!values.fullName) {
      errors.fullName = 'Full Name is required';
    }

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid';
    }

    if (!values.phoneNumber) {
        errors.phoneNumber = 'Phone Number is required';
      } else if (isNaN(values.phoneNumber)) {
        errors.phoneNumber = 'Phone Number must be a valid number';
      } else if (values.phoneNumber.length !== 10) {
        errors.phoneNumber = 'Phone Number must be exactly 10 digits';
      }

    if (!values.positionApplyingFor) {
      errors.positionApplyingFor = 'Position Applying For is required';
    }

    if ((values.positionApplyingFor === 'Developer' || values.positionApplyingFor === 'Designer') && !values.relevantExperience) {
      errors.relevantExperience = 'Relevant Experience is required';
    } else if (values.relevantExperience && (isNaN(values.relevantExperience) || values.relevantExperience <= 0)) {
      errors.relevantExperience = 'Relevant Experience must be a number greater than 0';
    }

    if (values.positionApplyingFor === 'Designer' && !values.portfolioUrl) {
      errors.portfolioUrl = 'Portfolio URL is required';
    } else if (values.portfolioUrl && !isValidUrl(values.portfolioUrl)) {
      errors.portfolioUrl = 'Portfolio URL is not valid';
    }

    if (values.positionApplyingFor === 'Manager' && !values.managementExperience) {
      errors.managementExperience = 'Management Experience is required';
    }

    if (!values.additionalSkills.length) {
      errors.additionalSkills = 'At least one skill must be selected';
    }

    if (!values.preferredInterviewTime) {
      errors.preferredInterviewTime = 'Preferred Interview Time is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Helper function to check valid URL format
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  return { errors, validate };
};

export default useFormValidation;
