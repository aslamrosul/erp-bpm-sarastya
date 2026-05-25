export interface Employee {
  id: string;
  employeeNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  hireDate: string;
  departmentId: string;
  departmentName?: string;
  positionId: string;
  positionName?: string;
  salary: number;
  status: 'active' | 'inactive' | 'on-leave';
  address?: string;
  city?: string;
  country?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
}

export interface CreateEmployeeDto {
  employeeNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  hireDate: string;
  departmentId: string;
  positionId: string;
  salary: number;
  status: 'active' | 'inactive' | 'on-leave';
  address?: string;
  city?: string;
  country?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
}

export interface UpdateEmployeeDto extends Partial<CreateEmployeeDto> {}
