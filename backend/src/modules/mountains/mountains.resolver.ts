import { Resolver, Query } from 'type-graphql';
import { getRepository } from 'typeorm';

import { MountainWithTrailCount } from './schema/mountainWithTrailCount.model';
import { Trail } from '../trails/schema/trail';

@Resolver()
export class MountainResolver {
    @Query(() => [MountainWithTrailCount], {
        name: 'mountains',
    })
    async getMountainsWithTrailsCount() {
        return getRepository(Trail)
            .createQueryBuilder('trail')
            .select([
                `trail.Mountain as mountain, COUNT(trail.Mountain) as trails`,
            ])
            .groupBy('trail.Mountain')
            .orderBy('trail.Mountain', 'ASC')
            .getRawMany()
            .then((value: Array<{ mountain: string; trails: string }>) => {
                return value.map(
                    (v) =>
                        new MountainWithTrailCount(
                            v.mountain,
                            parseInt(v.trails),
                        ),
                );
            });
    }
}
