import { Form } from "./form";
import { User } from "./user";

export type Entry = {
    id: string;
    status: string;
    progress: number;
    formId: string;
    userId: string | null;
    createdAt: Date;
    updatedAt: Date;
    form?: Form;
    user?: User;
};