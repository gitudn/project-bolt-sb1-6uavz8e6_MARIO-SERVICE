"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSubmissions = exports.submitForm = void 0;
const FormSubmission_1 = require("../models/FormSubmission");
const submitForm = async (req, res) => {
    try {
        const { fullName, phone, email, service, message, gdprConsent, } = req.body;
        // Create new form submission
        const formSubmission = new FormSubmission_1.FormSubmission({
            fullName,
            phone,
            email,
            service,
            message,
            gdprConsent,
        });
        // Save to database
        await formSubmission.save();
        res.status(201).json({
            success: true,
            message: 'Form submitted successfully',
            data: formSubmission,
        });
    }
    catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({
            success: false,
            message: 'Error submitting form',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
exports.submitForm = submitForm;
const getAllSubmissions = async (_req, res) => {
    try {
        const submissions = await FormSubmission_1.FormSubmission.find().sort({ submittedAt: -1 });
        res.status(200).json({
            success: true,
            data: submissions,
        });
    }
    catch (error) {
        console.error('Error fetching submissions:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching submissions',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
exports.getAllSubmissions = getAllSubmissions;
