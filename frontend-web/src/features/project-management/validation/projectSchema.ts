import { z } from 'zod';

export const projectSchema = z.object({
  name: z.string().min(3, 'Project name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  startDate: z.string(),
  endDate: z.string().optional(),
  ownerId: z.string().uuid('Invalid owner ID'),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
