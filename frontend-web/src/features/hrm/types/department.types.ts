export interface Department {
  id: string;
  name: string;
  code: string;
  description?: string;
  managerId?: string;
  managerName?: string;
  employeeCount: number;
  isActive: boolean;
}

export interface CreateDepartmentDto {
  name: string;
  code: string;
  description?: string;
  managerId?: string;
  isActive: boolean;
}

export interface UpdateDepartmentDto extends Partial<CreateDepartmentDto> {}
