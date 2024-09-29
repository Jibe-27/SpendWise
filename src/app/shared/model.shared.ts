export interface Language {
  name: string;
  code: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  budget: number;
}

export interface Expense {
  id: number;
  datetime: string;
  category: Category;
  store: string;
  amount: number;
  description?: string;
  userId: number;
}

export interface Category {
  name: string;
  color: string;
  icon: string;
}
export interface GeneralCategory {
  id: number;
  name: string;
  color: string;
  icon: string;
}
export interface Categorie {
  id?: number;
  name: string;
  color: string;
  icon?: string;
  userId?: number;
}
