export interface MetaData {
    pageNumber: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  }


export class PaginatedResponse<T> {
    items: T;
    metaData: MetaData;

    constructor(items: T, metaData: MetaData) {
      this.items = items;
      this.metaData = metaData;
    }
}