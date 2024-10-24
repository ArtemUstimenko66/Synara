interface ValidateFieldsParams {
    datePosted: string;
    description: string;
    title: string;
    currentLocation: string;
    details: string;
}

interface ValidationErrors {
    [key: string]: string;
}

export const validateFields = (fields: ValidateFieldsParams): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    if (!fields.datePosted) {
        newErrors.datePosted = 'Будь ласка, введіть дату';
    }
    if (!fields.description) {
        newErrors.description = 'Будь ласка, введіть опис';
    }
    if (!fields.title) {
        newErrors.title = 'Будь ласка, введіть назву';
    }
    if (!fields.currentLocation) {
        newErrors.currentLocation = 'Будь ласка, введіть місце';
    }
    if (!fields.details) {
        newErrors.details = 'Будь ласка, введіть деталі';
    }

    return newErrors;
};
