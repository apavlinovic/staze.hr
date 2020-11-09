import React, { useContext } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../common/core/auth-context/AuthContext';

interface RegistrationFormFields {
    email: string;
    password: string;
    username: string;
    name: string;
}

function Register(props: WithTranslation) {
    const { t } = props;
    const authContext = useContext(AuthContext);

    const { register, handleSubmit, watch, errors } = useForm<
        RegistrationFormFields
    >();
    const onSubmit = (data: RegistrationFormFields) => console.log(data);

    return (
        <main>
            <h1>{t('verb.register')}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    <span className="label-text required">
                        {t('noun.email')}
                    </span>
                    <input
                        name="email"
                        type="email"
                        required
                        ref={register({ required: true })}
                    />

                    {errors.email && (
                        <div className="error">
                            {t('errors.required', { error: t('noun.email') })}
                        </div>
                    )}
                </label>

                <label>
                    <span className="label-text required">
                        {t('noun.password')}
                    </span>
                    <input
                        name="password"
                        type="password"
                        required
                        ref={register({ required: true })}
                    />
                    {errors.password && (
                        <div className="error">
                            {t('errors.required', {
                                error: t('noun.password'),
                            })}
                        </div>
                    )}
                </label>

                <label>
                    <span className="label-text">{t('noun.username')}</span>
                    <input name="username" ref={register} />
                </label>

                <input type="submit" value={t('verb.submit') as string} />
            </form>
        </main>
    );
}

export default withTranslation()(Register);
