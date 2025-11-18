export interface Task {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deadlineAt: Date;
  boardTag: string;
  role: Role;
  size: SizeTag;
  priority: PriorityTag;
  tags: Tag[];
}

export interface Role {
  id: number;
  name: string;
}

export interface Tag {
  id: number;
  name: string;
  color: string;
}

export interface SizeTag extends Tag {
  iconUrl: string;
}

export interface PriorityTag extends Tag {
  priority: number;
}
