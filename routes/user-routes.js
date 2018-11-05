const express = require('express');
const router = express.Router();

const {decodeToken, checkUser} = require('../middleware/check-auth');
const userController = require('../controllers/user-controller');
const uniqueValidator = require('../middleware/unique-validator');
const users = require('../models/user-model');

/**
 * @apiVersion 1.0.0
 *
 * @api {post} /api/user/create Create New User
 * @apiName CreateUser
 * @apiGroup User
 *
 * @apiParam {String} firstName First Name
 * @apiParam {String} lastName  Last Name
 * @apiParam {String} email Email
 * @apiParam {String} password Password
 * @apiParam {Number[]} [phone] Phone Numbers
 * @apiParam {String} [street] Street
 * @apiParam {String} [city] City
 * @apiParam {String} [state] State
 * @apiParam {String} [country] Country
 * @apiParam {String} [pin] Pincode
 *
 * @apiHeader {String} [isadmin] Create an account with admin previleges
 *
 * @apiSuccessExample {json} Success Response
 *    HTTP/1.1 201 OK
 *    {
 *      "error": false,
 *      "message": "User created successfully!!!",
 *      "data": {
 *          "userId": "5b9ff8f4558ca01054196469",
 *          "firstName": "Vikas",
 *          "lastName": "Pulluri",
 *          "email": "vikasiiitn@gmail.com",
 *          "phone": [
 *              9494336401
 *           ],
 *          "address": {
 *              "street": "Rajeev street",
 *              "city": "Chintalapudi",
 *              "state": "Andhra Pradesh",
 *              "country": "India",
 *              "pin": 534460
 *          }
 *      }
 *@apiErrorExample {json} Error Response-1
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "error": true,
 *      "message": "Invalid Request",
 *      "errorCode": "UC-CU-1",
 *      "errorType": "DataValidationError"
 *    }
 *@apiErrorExample {json} Error Response-2
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "error": true,
 *      "message": "An account already exists with the provided email Id",
 *      "errorCode": "UV-1",
 *      "errorType": "DuplicateDataError"
 *    }
 * @apiErrorExample {json} Error Response-3
 *    HTTP/1.1 500 INTERNAL SERVER ERROR
 *    {
 *      "error": true,
 *      "message": "Something went wrong, please try again later...",
 *      "errorCode": "UC-CU-2",
 *      "errorType": "UnknownError"
 *    }
 */
router.post('/create', uniqueValidator(users,'email'), userController.createUser);

/**
 * @apiVersion 1.0.0
 *
 * @api {post} /api/user/login Login User
 * @apiName LoginUser
 * @apiGroup User
 *
 * @apiParam {String} email Email
 * @apiParam {String} password Password
 *
 *
 * @apiSuccessExample {json} Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "error": false,
 *      "message": "User Logged In Successfully...",
 *      "data": {
 *          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpa2FzaWlpdG5AZ21haWwuY29tIiwiaWQiOiI1Yjk2YWRjNDc0NGQ0ZTFhMzhjZjJhOGEiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1MzcyMTMwNjQsImV4cCI6MTUzNzIxNjY2NH0.2U_A27fPZPgkqN1DaS9fg_C6qr5AUeU7rRsO6yQk1uQ",
 *          "username": "Vikas Pulluri",
 *          "email": "vikasiiitn@gmail.com",
 *          "expiryDuration": 3600,
 *          "userId": "5b96adc4744d4e1a38cf2a8a"
 *      }
 * @apiErrorExample {json} Error Response-1
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "error": true,
 *      "message": "Invalid Request",
 *      "errorCode": "UC-LU-1",
 *      "errorType": "OAuthError"
 *    }
 * @apiErrorExample {json} Error Response-2
 *    HTTP/1.1 401 UNAUTHORIZED
 *    {
 *      "error": true,
 *      "message": "Invalid username provided",
 *      "errorCode": "UC-LU-2",
 *      "errorType": "OAuthError"
 *    }
 * @apiErrorExample {json} Error Response-3
 *    HTTP/1.1 401 UNAUTHORIZED
 *    {
 *      "error": true,
 *      "message": "Invalid Authentication Credentials",
 *      "errorCode": "UC-LU-3",
 *      "errorType": "OAuthError"
 *    }
 * @apiErrorExample {json} Error Response-4
 *    HTTP/1.1 500 INTERNAL SERVER ERROR
 *    {
 *      "error": true,
 *      "message": "Something went wrong, please try again later...",
 *      "errorCode": "UC-LU-4",
 *      "errorType": "UknownError"
 *    }
 */
router.post('/login', userController.loginUser);

/**
 * @apiVersion 1.0.0
 *
 * @api {get} /api/user/@self Get User
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiHeader {String} authorization Authorization Token prepended with (Bearer )
 *
 *
 * * @apiSuccessExample {json} Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "error": false,
 *      "message": "User Data Fetched Successfully!!!",
 *      "data": {
 *          "userId": "5b9ff8f4558ca01054196469",
 *          "firstName": "Vikas",
 *          "lastName": "Pulluri",
 *          "email": "vikasiiitn@gmail.com",
 *          "createdOn": "2018-09-10T18:28:32.000Z",
 *          "orders": [],
 *          "phone": [
 *              9494336401
 *           ],
 *          "address": {
 *              "street": "Rajeev street",
 *              "city": "Chintalapudi",
 *              "state": "Andhra Pradesh",
 *              "country": "India",
 *              "pin": 534460
 *          }
 *      }
 * @apiErrorExample {json} Error Response
 *    HTTP/1.1 401 UNAUTHORIZED
 *    {
 *      "error": true,
 *      "message": "Authentication Failed",
 *      "errorCode": "CA-1",
 *      "errorType": "OAuthError"
 *    }
 */
router.get('/@self', decodeToken, checkUser, userController.getUser);


module.exports = router;
