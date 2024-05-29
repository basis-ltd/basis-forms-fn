import { Section } from "./section";
import { User } from "./user";

export type Field = {
    id: string;
    sequence: number;
    name: string;
    label: string;
    placeholder: string | null;
    required: boolean;
    type: string;
    accept: string;
    disabled: boolean;
    readonly: boolean;
    maxLength: number | null;
    minLength: number | null;
    max: number | null;
    min: number | null;
    pattern: string | null;
    multiple: boolean;
    defaultValue: string | null;
    autocapitalize: boolean;
    sectionId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    section?: Section;
    user?: User;
};