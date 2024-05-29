import { Form } from "./form";
import { Institution } from "./institution";
import { User } from "./user";

export type Project = {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    user?: User;
    forms?: Form[];
    institution: Institution;
};
