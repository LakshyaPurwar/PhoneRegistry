const catchAsyncError = require("../Middleware/catchAsyncError");
const userModel = require("../Models/userModel");
const ErrorHandler = require("../Utils/ErrorHandler");

// Createing new user

exports.createUser = catchAsyncError(async (req, res, next) => {
    const { name, phone_no } = req.body;

    const user = await userModel.create({
        name,
        phone_no
    })

    res.status(201).json({
        success: true,
        message: "user created successfully"
    })
})

// Updating user details

exports.updateUser = catchAsyncError(async (req, res, next) => {
    const { newName, phone_no } = req.body;

    const user = await userModel.findOne({ phone_no: phone_no });

    if (!user) {
        return next(new ErrorHandler("User not found with this phone number", 404));
    }

    user.name = newName;
    await user.save();

    res.status(200).json({
        success: true,
        message: "user updated successfully"
    })
})

// Deleting an user

exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const { phone_no } = req.body;
    const result = await userModel.deleteOne({ phone_no: phone_no });
    if (result.deletedCount !== 1) {
        return next(new ErrorHandler("User not found with this phone number", 404));
    }
    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    })
})

//Fetching all users

exports.fetchUsers = catchAsyncError(async(req,res,next)=>{
    const result = await userModel.find();

    if(!result){
        return next(new ErrorHandler("Could not fetch users",404));
    }
    res.status(200).json({
        success:true,
        result
    })
})
