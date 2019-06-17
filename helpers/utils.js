const mapMongoosErrors = (errors) => Object.keys(errors).reduce((agg, ele) => {
  agg[ele] = [{ error: errors[ele].message }];
  return agg;
}, {});

const mapMongoUniqueError = (error) => {
  let field = error.message.split('.$')[1];
  field = field.split(' dup key')[0];
  field = field.substring(0, field.lastIndexOf('_'));
  return { [field]: [{ error: 'taken' }] };
};

const validateDate = (date) => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;

  var currentDate = (new Date(today)).getTime();
  var birthdate = (new Date(date)).getTime()
  if (birthdate > currentDate)
      return false;

  return true;
};

const validateDateFormat = (date) => {
  if (!/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(date))
      return false;
  return true;
}

module.exports = {
  mapMongoosErrors,
  mapMongoUniqueError,
  validateDateFormat,
  validateDate
};
