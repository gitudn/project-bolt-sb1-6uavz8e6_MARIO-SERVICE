"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const formController_1 = require("../controllers/formController");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
// Validation middleware
const validateFormSubmission = [
    (0, express_validator_1.body)('fullName').trim().notEmpty().withMessage('Full name is required'),
    (0, express_validator_1.body)('phone').trim().notEmpty().withMessage('Phone number is required'),
    (0, express_validator_1.body)('email').trim().isEmail().withMessage('Valid email is required'),
    (0, express_validator_1.body)('service').trim().notEmpty().withMessage('Service selection is required'),
    (0, express_validator_1.body)('message').trim().notEmpty().withMessage('Message is required'),
    (0, express_validator_1.body)('gdprConsent').isBoolean().equals('true').withMessage('GDPR consent is required'),
];
// Routes
router.post('/submit', validateFormSubmission, formController_1.submitForm);
router.get('/submissions', formController_1.getAllSubmissions);
exports.default = router;
