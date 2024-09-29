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
  datetime: string;
  category: Category;
  store: string;
  amount: number;
  description?: string;
}

export interface Category {
  name: string;
  color: string;
  icon: string;
}
