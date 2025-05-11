export type GarmentServiceParams = {
    search?: string,
    categories?: Array<string>,
    genders?: Array<string>,
    types?: Array<string>,
    colors?: Array<string>,
    states?: Array<string>,
    minPrice?: number,
    maxPrice?: number,
    me?: boolean,
    sortBy?: string,
    limit?: number,
    skip?: number
}