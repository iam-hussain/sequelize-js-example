var path = require('path');
var generator = require('generate-password');
var jwt = require('jsonwebtoken');
import md5 from 'md5';
import models from '../models/index';
import {
    twilio
} from '../config/credentials'

var randomGenerator = function (Size) {
    return generator.generate({
        length: Size,
        uppercase: true,
        numbers: true,
        exclude: true,
        excludeSimilarCharacters: true,
    });
}

var generateOTP = function (otpLength) {
    var digits = '0123456789';
    var otp = '';
    for (let i = 1; i <= otpLength; i++) {
        var index = Math.floor(Math.random() * (digits.length));
        otp = otp + digits[index];
    }
    return otp;
}

var successResponse = function (res, data){
    res.json({
        success: true,
        error: null,
        data: data
    })
    res.end();
    return false;
}

var errorResponse = function (res, msg){
    res.json({
        success: false,
        error: {
            messages: msg
        }
    })
    res.end();
    return false;
}

module.exports.randomGenerator = randomGenerator;
module.exports.generateOTP = generateOTP;
module.exports.successResponse = successResponse;
module.exports.errorResponse = errorResponse;