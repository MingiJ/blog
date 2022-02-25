exports.cleanUser = (user) => {
  const { password, __v, ...rest } = user._doc;
  return rest;
};
