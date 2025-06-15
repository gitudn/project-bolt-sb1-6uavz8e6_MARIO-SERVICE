"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormSubmission = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const formSubmissionSchema = new mongoose_1.default.Schema({
    fullName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    gdprConsent: {
        type: Boolean,
        required: true,
    },
    submittedAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['new', 'in-progress', 'completed'],
        default: 'new',
    }
});
exports.FormSubmission = mongoose_1.default.model('FormSubmission', formSubmissionSchema);
