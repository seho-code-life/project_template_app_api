export interface Page {
  totalCounts: string;
  rows: [
    {
      primaryKey: {
        name: 'id' | string;
        value: string;
      }[];
      attributes: {
        columnName: string;
        columnValue: unknown;
      }[];
    }
  ];
}
