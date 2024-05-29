import { Field } from "react-hook-form";
import { Form } from "./form";

export type Section = {
    id: string;
    name: string;
    description: string;
    sequence: number;
    formId: string;
    createdAt: Date;
    updatedAt: Date;
    form?: Form;
    fields?: Field[];
};
