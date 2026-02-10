
export enum Category {
  FRUIT = 'Fruit',
  VEGETABLE = 'Vegetable'
}

export interface FoodItem {
  id: string;
  name: string;
  category: Category;
  emoji: string;
  color: string;
  shortDesc: string;
  benefits: string[];
}

// Fix: Add missing FunFact interface for AI-generated responses
export interface FunFact {
  fact: string;
  joke: string;
}
