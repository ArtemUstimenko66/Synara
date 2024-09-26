interface ValidationErrors {
    [key: string]: string;
}

interface ValidateFieldsParams {
    datePosted: string;
    description: string;
}

export const validateFields = (fields: ValidateFieldsParams): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    if (!fields.datePosted) {
        newErrors.datePosted = 'Будь ласка, введіть дату';
    }
    if (!fields.description) {
        newErrors.description = 'Будь ласка, введіть опис';
    }

    return newErrors;
};