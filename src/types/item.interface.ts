export interface IItem {
  id: string;
  title: string;
  children?: Array<IItem>;
  ancestor?: string;
}