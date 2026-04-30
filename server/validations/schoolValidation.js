function sanitizeString(value) {
  if (typeof value !== "string") {
    return value;
  }

  return value
    .replace(/[\x00-\x1F\x7F]/g, "")
    .replace(/[<>]/g, "")
    .trim()
    .replace(/\s+/g, " ");
}

function validateLatitude(value) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return { isValid: false, message: "latitude must be a valid number" };
  }

  if (numericValue < -90 || numericValue > 90) {
    return { isValid: false, message: "latitude must be between -90 and 90" };
  }

  return { isValid: true, value: numericValue };
}

function validateLongitude(value) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return { isValid: false, message: "longitude must be a valid number" };
  }

  if (numericValue < -180 || numericValue > 180) {
    return { isValid: false, message: "longitude must be between -180 and 180" };
  }

  return { isValid: true, value: numericValue };
}

function validateRequiredString(fieldName, value) {
  if (typeof value !== "string") {
    return {
      isValid: false,
      message: `${fieldName} is required and must be a string`
    };
  }

  const sanitizedValue = sanitizeString(value);

  if (!sanitizedValue) {
    return {
      isValid: false,
      message: `${fieldName} cannot be empty`
    };
  }

  if (sanitizedValue.length > 255) {
    return {
      isValid: false,
      message: `${fieldName} must be at most 255 characters`
    };
  }

  return { isValid: true, value: sanitizedValue };
}

function validateAddSchoolPayload(payload) {
  const errors = [];

  const nameValidation = validateRequiredString("name", payload.name);
  const addressValidation = validateRequiredString("address", payload.address);
  const latitudeValidation = validateLatitude(payload.latitude);
  const longitudeValidation = validateLongitude(payload.longitude);

  if (!nameValidation.isValid) {
    errors.push(nameValidation.message);
  }

  if (!addressValidation.isValid) {
    errors.push(addressValidation.message);
  }

  if (!latitudeValidation.isValid) {
    errors.push(latitudeValidation.message);
  }

  if (!longitudeValidation.isValid) {
    errors.push(longitudeValidation.message);
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  return {
    isValid: true,
    value: {
      name: nameValidation.value,
      address: addressValidation.value,
      latitude: latitudeValidation.value,
      longitude: longitudeValidation.value
    }
  };
}

function validateListSchoolsQuery(query) {
  const errors = [];

  const latitudeValidation = validateLatitude(query.lat);
  const longitudeValidation = validateLongitude(query.lng);

  if (!latitudeValidation.isValid) {
    errors.push(latitudeValidation.message.replace("latitude", "lat"));
  }

  if (!longitudeValidation.isValid) {
    errors.push(longitudeValidation.message.replace("longitude", "lng"));
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  return {
    isValid: true,
    value: {
      latitude: latitudeValidation.value,
      longitude: longitudeValidation.value
    }
  };
}

module.exports = {
  validateAddSchoolPayload,
  validateListSchoolsQuery
};
