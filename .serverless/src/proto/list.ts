export interface List {
  id: string;
  title: string;
  content: string;
}

export type AddItem = Omit<List, 'id'>;
export type UpdateItem = List;
