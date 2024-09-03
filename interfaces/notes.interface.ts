export interface Note {
  id: number;
  name: string;
  status: "to-do" | "doing" | "done";
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
