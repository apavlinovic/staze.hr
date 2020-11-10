import React from 'react';
import { FieldError, FieldErrors } from 'react-hook-form';
import { UseFormMethods } from 'react-hook-form/dist/types/form';
import { withTranslation, WithTranslation } from 'react-i18next';

interface InputProps {
    name: string;
    register: UseFormMethods['register'];
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: RegExp;
    type?: string;
    label?: string;
    required?: boolean;
    errors?: FieldErrors;
}

const Input = (props: InputProps & WithTranslation) => {
    const {
        name,
        type = 'text',
        label = 'missing.label',
        required = false,
        min = undefined,
        max = undefined,
        minLength = undefined,
        maxLength = undefined,
        pattern = undefined,

        register,
        errors = {},
        t,
    } = props;

    const renderErrors = () => {
        if (!errors[name]) {
            return null;
        }

        const error = errors[name] as FieldError;
        let translationKey = 'errors.unknown';
        let translationParams = {};

        switch (error.type) {
            case 'required':
                translationKey = 'errors.required';
                translationParams = { error: t(label) };
                break;
            case 'pattern':
                translationKey = 'errors.pattern';
                translationParams = { error: t(label), pattern: pattern };
                break;
            case 'max':
                translationKey = 'errors.max';
                translationParams = { error: t(label), max: max };
                break;
            case 'min':
                translationKey = 'errors.min';
                translationParams = { error: t(label), max: max };
                break;
            case 'minLength':
                translationKey = 'errors.minLength';
                translationParams = { error: t(label), minLength: minLength };
                break;
            case 'maxLength':
                translationKey = 'errors.maxLength';
                translationParams = { error: t(label), maxLength: maxLength };
                break;
            default:
                break;
        }

        return (
            <div className="error">{t(translationKey, translationParams)}</div>
        );
    };

    return (
        <label>
            <span
                className={`label-text ${
                    required ? 'required' : 'not-required'
                }`}
            >
                {t(label)}
            </span>
            <input
                placeholder={t(label)}
                name={name}
                type={type}
                required={required}
                min={min}
                max={max}
                minLength={minLength}
                maxLength={maxLength}
                ref={register({
                    required,
                    min,
                    max,
                    minLength,
                    maxLength,
                    pattern,
                })}
            />

            {renderErrors()}
        </label>
    );
};

export default withTranslation()(Input);
