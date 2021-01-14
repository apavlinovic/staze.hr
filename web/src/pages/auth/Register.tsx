import React, { useContext } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { FieldErrors, useForm } from 'react-hook-form';

import { AuthContext } from '../../common/core/auth-context/AuthContext';
import Input from '../../common/core/forms/Input';
import Card from '../../common/ui/cards/card/Card';
import { ReactComponent as RegisterIllustration } from './RegisterIllustration.svg';

import './Register.scss';

interface RegistrationFormFields {
    email: string;
    password: string;
    username: string;
    name: string;
}

function Register(props: WithTranslation) {
    const { t } = props;
    const authContext = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        errors,
    } = useForm<RegistrationFormFields>();

    const onSubmit = (data: RegistrationFormFields) => console.log(data);
    const onError = (data: FieldErrors<RegistrationFormFields>) =>
        console.error(data);

    return (
        <div className="page-register container">
            <Card>
                <div className="grid">
                    <div className="grid-item large-span-12 small-span-12 small-align-content-center">
                        <h1 className="small-text-align-center">
                            {t('strings.register_page_title')}
                        </h1>
                    </div>
                    <div className="grid-item large-span-6 small-span-12 small-align-content-center">
                        <p className="small-text-align-center">
                            {t('strings.register_page_description')}
                        </p>
                        <br />
                        <RegisterIllustration />
                    </div>
                    <div className="grid-item large-span-6 small-span-12">
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

                            <input
                                type="submit"
                                className="__submit"
                                value={t('verb.submit') as string}
                            />
                        </form>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default withTranslation()(Register);
