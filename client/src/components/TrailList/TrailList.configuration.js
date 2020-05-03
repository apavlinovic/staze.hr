export const PAGE_SIZE = 50;

export const SORTS = {
    NAME_ASC: { sort: 'Name-asc', label: 'strings.order_by_name_asc' },
    NAME_DESC: { sort: 'Name-desc', label: 'strings.order_by_name_desc' },
    DURATION_ASC: { sort: 'Duration-asc', label: 'strings.order_by_duration_asc' },
    DURATION_DESC: { sort: 'Duration-desc', label: 'strings.order_by_duration_desc' },
    DISTANCE_ASC: { sort: 'Distance-asc', label: 'strings.order_by_distance_asc' },
    DISTANCE_DESC: { sort: 'Distance-desc', label: 'strings.order_by_distance_desc' },
}

export const FILTER_DISTANCE = {
    DISTANCE_1: { filter: 1, label: 'strings.filter_distance_1' },
    DISTANCE_2: { filter: 2, label: 'strings.filter_distance_2' },
    DISTANCE_3: { filter: 3, label: 'strings.filter_distance_3' },
    DISTANCE_4: { filter: 4, label: 'strings.filter_distance_4' },
    DISTANCE_5: { filter: 5, label: 'strings.filter_distance_5' },
    DISTANCE_10: { filter: 10, label: 'strings.filter_distance_10' },
    DISTANCE_15: { filter: 15, label: 'strings.filter_distance_15' },
    DISTANCE_MAX: { filter: 1000, label: 'strings.filter_distance_max' },
}

export const FILTER_DURATION = {
    DURATION_1: { filter: '01:00', label: 'strings.filter_duration_1' },
    DURATION_2: { filter: '02:00', label: 'strings.filter_duration_2' },
    DURATION_3: { filter: '03:00', label: 'strings.filter_duration_3' },
    DURATION_4: { filter: '04:00', label: 'strings.filter_duration_4' },
    DURATION_5: { filter: '05:00', label: 'strings.filter_duration_5' },
    DURATION_MAX: { filter: '24:00', label: 'strings.filter_duration_max' },
}
