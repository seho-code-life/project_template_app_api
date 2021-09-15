export interface List {
  id: string;
  title: string;
  content: string;
  create_date: string;
}

export type AddItem = Omit<List, "id" | "create_date">
