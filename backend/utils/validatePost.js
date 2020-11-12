const validateData = (title, description, email, file) => {
  console.log('validatePost, file', file);

  const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const invalidSigns = /[<>%\$]/;

  let isValid = true;
  if (!title && !description && !email) isValid = false;
  else if (title.length < 10 && title.length > 50) isValid = false;
  else if (description.length < 20) isValid = false;
  else if (!validEmail.test(email)) isValid = false;

  if (file) {
    const validFileExtension = /(.*?)\.(jpg|jpeg|gif|png)$/;
    if (!validFileExtension.test(file)) isValid = false;
    console.log('File ext isValid', isValid);

  }

  console.log('after validation', isValid);
  return isValid;
};

module.exports = validateData;
