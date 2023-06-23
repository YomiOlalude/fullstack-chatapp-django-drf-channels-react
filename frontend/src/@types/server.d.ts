export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Server {
  id: number;
  name: string;
  server: string;
  description: string;
  icon: string;
  category: Category;
  channels: {
    id: number;
    name: string;
    server: string;
    topic: string;
    owner: string;
  }[];
}