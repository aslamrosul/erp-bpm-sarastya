export interface Position {
  id: string;
  title: string;
  code: string;
  description?: string;
  level: 'junior' | 'mid' | 'senior' | 'lead' | 'manager' | 'director';
  minSalary: number;
  maxSalary: number;
  employeeCount: number;
  isActive: boolean;
}

export interface CreatePositionDto {
  title: string;
  code: string;
  description?: string;
  level: 'junior' | 'mid' | 'senior' | 'lead' | 'manager' | 'director';
  minSalary: number;
  maxSalary: number;
  isActive: boolean;
}

export interface UpdatePositionDto extends Partial<CreatePositionDto> {}
