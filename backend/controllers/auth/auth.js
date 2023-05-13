const asyncHandler = require('../../middleware/async');
const ErrorResponse = require('../../util/error');
const User = require('../../models/User');

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please provide the email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse(`Could not find a user with email: ${email}`, 404));
  }

  const isPasswordsMatch = await user.matchPassword(password);

  if (!isPasswordsMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const token = await user.getSignedJwt();

  res.status(200).cookie('token', token, {
    expires: new Date(Date.now() + 1 * 60 * 60 * 24 * 1000),
    httpOnly: true,
  }).json({
    success: true,
    data: {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    },
    token: token,
  });
});

exports.logout = asyncHandler(async (req, res, next) => {
  res.status(200).cookie('token', '', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  }).json({
    success: true,
    data: {}
  })
});