export interface PutUpdateMutationTypes {
  id: string;
  file?: string;
  remark: string;
  title: string;
  isPrivate: boolean;
}

export interface DeleteUpdateMutationTypes {
  volunteerId: string;
  updateId: string;
}
