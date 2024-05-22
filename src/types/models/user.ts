import { Institution } from "./institution";

export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    institution: Institution;
    role: string;
    institutionId: string;
    createdAt: Date;
    updatedAt: Date;
};
