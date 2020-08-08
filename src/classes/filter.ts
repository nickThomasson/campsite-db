interface QueryParameter {
  field: string;
  operator: string;
  value: string;
}

interface FilterValues {
  filterName: string;
  isActive: boolean;
  rawValue: string | boolean | Array<string>;
}

class CreateFilterQuery {
  protected queryParameter: QueryParameter;
  protected query: string;

  constructor(queryParameter: QueryParameter) {
    this.queryParameter = queryParameter;
    this.query = `&filter[${this.queryParameter.field}][${this.queryParameter.operator}]=${this.queryParameter.value}`;
  }
}

class CreateFilterValues extends CreateFilterQuery {
  protected filterValues: FilterValues;

  constructor(filterValues: FilterValues, queryParameter: QueryParameter) {
    super(queryParameter);
    this.filterValues = filterValues;
  }
}

export class CreateFilter extends CreateFilterValues {
  constructor(filterValues: FilterValues, queryParameter: QueryParameter) {
    super(filterValues, queryParameter);
  }

  get() {
    return {
      filterName: this.filterValues.filterName,
      isActive: this.filterValues.isActive,
      rawValue: this.filterValues.rawValue,
      query: this.query
    };
  }
}
