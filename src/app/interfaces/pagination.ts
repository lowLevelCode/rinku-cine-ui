export interface MetaData {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}

export interface Pagination<T>{
    items:T;
    meta: MetaData;
}