const asyncHandler = require('../../middleware/async');
const ErrorResponse = require('../../util/error');
const User = require('../../models/User');

exports.addUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: user,
  });
});

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    data: users,
  });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`Could not find user by id: ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!user) {
    return next(new ErrorResponse(`Could not find user by id: ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    message: `Updated user with id ${req.params.id}`,
    data: user
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`Could not find user by id: ${req.params.id}`, 404));
  }

  user.deleteOne();

  res.status(200).json({
    success: true,
    message: `Deleted user with id: ${req.params.id}`,
    data: user,
  });
});