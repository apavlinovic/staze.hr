import React, { useContext } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { FieldErrors, useForm } from 'react-hook-form';
import { AuthContext } from '../../common/core/auth-context/AuthContext';
import Input from '../../common/core/forms/Input';

interface RegistrationFormFields {
    email: string;
    password: string;
    username: string;
    name: string;
}

function Register(props: WithTranslation) {
    const { t } = props;
    const authContext = useContext(AuthContext);

    const { register, handleSubmit, errors } = useForm<
        RegistrationFormFields
    >();

    const onSubmit = (data: RegistrationFormFields) => console.log(data);
    const onError = (data: FieldErrors<RegistrationFormFields>) =>
        console.error(data);

    return (
        <main>
            <h1>{t('verb.register')}</h1>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <Input
                    name="email"
                    type="email"
                    required={true}
                    label="noun.email"
                    errors={errors}
                    register={register}
                />

                <Input
                    name="password"
                    type="password"
                    required={true}
                    label="noun.password"
                    errors={errors}
                    register={register}
                />

                <Input
                    name="username"
                    label="noun.username"
                    maxLength={100}
                    errors={errors}
                    pattern={/[A-Za-z0-9^\s]+/}
                    register={register}
                />

                <input type="submit" value={t('verb.submit') as string} />
            </form>
        </main>
    );
}

export default withTranslation()(Register);
