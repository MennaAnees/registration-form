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

module.exports = {
  mapMongoosErrors,
  mapMongoUniqueError
};
