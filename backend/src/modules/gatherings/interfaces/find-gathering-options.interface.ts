import { TypeEnding } from '../enums/TypeEnding';

export interface FindGatheringsOptions {
  query: string;
  sortOrder?: 'ASC' | 'DESC';
  limit: number;
  offset: number;
  isUrgent?: boolean;
  moneyTo?: number;
  moneyFrom?: number;
  typeEnding?: TypeEnding[];
}
