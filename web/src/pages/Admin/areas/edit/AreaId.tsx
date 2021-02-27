import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { FieldErrors, useForm } from 'react-hook-form';

import Input from '../../../../common/core/forms/Input';
import Loading from '../../../../common/core/loading/Loading';
import Card from '../../../../common/ui/cards/card/Card';
import Error from '../../../../common/core/error/Error';

import { Flip } from '../../../../common/ui/icons/Icons';

import './AreaId.scss';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { Query } from '../../../../types';

interface AreaEditFormFields {
    type: number;
    name: string;
    description: string;
}

function AreaEdit(props: WithTranslation) {
    const { t } = props;

    const { register, handleSubmit, errors } = useForm<AreaEditFormFields>();

    const onSubmit = (data: AreaEditFormFields) => console.log(data);
    const onError = (data: FieldErrors<AreaEditFormFields>) =>
        console.error(data);

    const AREAS_QUERY = gql`
        query area($areaId: Float) {
            area(areaId: $areaId) {
                id
                name
                type
                slug
                description
            }
        }
    `;

    var params = useParams<{
        areaId: string;
    }>();

    const { loading, error, data } = useQuery<Query>(AREAS_QUERY, {
        variables: {
            areaId: parseFloat(params.areaId),
        },
    });

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error error={error} />;
    }

    return (
        <div className="area-edit container">
            <Card>
                <div className="grid">
                    <div className="grid-item large-span-12 small-span-12 small-align-content-center">
                        <h1 className="small-text-align-center">
                            {t('strings.edit_an_area')}
                        </h1>
                    </div>
                    <div className="grid-item large-span-6 small-span-12 small-align-content-center">
                        <br />
                        <Flip />
                    </div>
                    <div className="grid-item large-span-6 small-span-12">
                        <form onSubmit={handleSubmit(onSubmit, onError)}>
                            <Input
                                name="type"
                                type="number"
                                value={data?.area?.type}
                                required={true}
                                label="noun.type"
                                errors={errors}
                                register={register}
                            />

                            <Input
                                name="name"
                                type="string"
                                value={data?.area?.name}
                                required={true}
                                label="noun.name"
                                errors={errors}
                                register={register}
                            />

                            <Input
                                name="description"
                                type="string"
                                label="noun.description"
                                value={data?.area?.description}
                                required={true}
                                errors={errors}
                                register={register}
                            />

                            <input
                                type="submit"
                                className="__submit"
                                value={t('verb.edit') as string}
                            />
                        </form>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default withTranslation()(AreaEdit);
