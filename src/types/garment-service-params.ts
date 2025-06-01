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
    garmentBase?: string,
    sortBy?: string,
    limit?: number,
    skip?: number
}