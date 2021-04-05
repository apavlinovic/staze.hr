class AreaTrailFilter {
    duration: string | null;
    distance: number | null;

    constructor(duration: string | null, distance: number | null) {
        this.duration = duration;
        this.distance = distance;
    }
}

export const ALL_TRAILS = new AreaTrailFilter(null, null);
export const SHORT_TRAILS = new AreaTrailFilter(null, 3);
export const HOUR_TRAILS_1 = new AreaTrailFilter('1', null);
export const HOUR_TRAILS_3 = new AreaTrailFilter('3', null);
