import { Category } from "./category";

export type Institution = {
    id: string;
    name: string;
    description: string | null;
    email: string;
    phone: string | null;
    isActive: boolean;
    address: string | null;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
    category: Category;
};
