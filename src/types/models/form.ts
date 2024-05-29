import { Entry } from './entry';
import { Project } from './project';
import { Section } from './section';
import { User } from './user';

export type Form = {
  id: string;
  name: string;
  description?: string;
  visibility: string;
  isActive: boolean;
  projectId: string;
  sectionsCount?: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  project?: Project;
  user?: User;
  sections?: Section[];
  entries?: Entry[];
};
