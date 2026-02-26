export type ChecklistTask = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
};

export type Checklist = {
  id: string;
  title: string;
  createdAt: number;
  tasks: ChecklistTask[];
};

