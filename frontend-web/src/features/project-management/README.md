# Project Management Feature

Enterprise-style architecture untuk Project Management dengan Kanban dan Gantt visualization.

## Folder Structure

```
project-management/
├── components/          # Reusable components khusus project management
│   └── ProjectCard.tsx
│
├── forms/              # Form components
│   └── ProjectForm.tsx
│
├── gantt/              # Gantt Chart feature
│   ├── GanttChart.tsx      # Main container
│   └── GanttRow.tsx        # Single timeline row
│
├── hooks/              # Custom React hooks
│   ├── useProjects.ts      # Project CRUD operations
│   └── useTasks.ts         # Task CRUD operations
│
├── kanban/             # Kanban Board feature
│   ├── KanbanBoard.tsx     # Main container
│   ├── KanbanColumn.tsx    # Single column (To Do, In Progress, etc)
│   └── KanbanTaskCard.tsx  # Task card component
│
├── pages/              # Page components
│   ├── ProjectManagementPage.tsx  # Main page with view switcher
│   ├── ProjectsPage.tsx
│   └── Figmareference.tsx         # UI reference from Figma
│
├── services/           # API services
│   ├── project.service.ts  # Project API calls
│   └── task.service.ts     # Task API calls
│
├── store/              # Zustand state management
│   ├── project.store.ts    # Project global state
│   └── task.store.ts       # Task global state
│
├── types/              # TypeScript interfaces
│   ├── project.types.ts    # Project types
│   └── task.types.ts       # Task types
│
└── validation/         # Form validation schemas
    └── projectSchema.ts
```

## Component Breakdown

### Pages Layer
**Responsibility:** Compose components, handle routing, manage view state

```tsx
// ProjectManagementPage.tsx
- Fetch data using hooks
- Switch between views (List/Kanban/Gantt)
- Compose child components
- NO complex UI logic here
```

### Kanban Feature

**KanbanBoard.tsx** - Container
- Fetch tasks using `useTasks()`
- Group tasks by status
- Render columns

**KanbanColumn.tsx** - Column component
- Display column title and count
- Render task cards
- Handle empty state

**KanbanTaskCard.tsx** - Task card
- Display task details
- Priority badge
- Assignee info
- Due date

### Gantt Feature

**GanttChart.tsx** - Container
- Fetch tasks using `useTasks()`
- Calculate timeline (min/max dates)
- Render rows
- Display legend

**GanttRow.tsx** - Timeline row
- Display task info
- Render timeline bar
- Status badge

## Data Flow

### Kanban Flow
```
useTasks() → tasks[]
  ↓
KanbanBoard (group by status)
  ↓
KanbanColumn (per status)
  ↓
KanbanTaskCard (per task)
```

### Gantt Flow
```
useTasks() → tasks[]
  ↓
GanttChart (calculate timeline)
  ↓
GanttRow (per task)
```

## Usage Examples

### Using Kanban Board
```tsx
import KanbanBoard from '../kanban/KanbanBoard';

function MyPage() {
  return <KanbanBoard projectId="123" />;
}
```

### Using Gantt Chart
```tsx
import GanttChart from '../gantt/GanttChart';

function MyPage() {
  return <GanttChart projectId="123" />;
}
```

### Using Hooks
```tsx
import { useTasks } from '../hooks/useTasks';

function MyComponent() {
  const { tasks, isLoading, createTask, updateTask } = useTasks();
  
  // Use tasks data
}
```

## Benefits of This Structure

1. **Separation of Concerns**
   - Each component has single responsibility
   - Easy to test individually
   - Clear boundaries

2. **Maintainability**
   - Small, focused files (< 150 lines)
   - Easy to locate and modify
   - Clear naming conventions

3. **Reusability**
   - Components can be used independently
   - Easy to compose new features
   - Shared logic in hooks

4. **Scalability**
   - Easy to add new features
   - Clear structure for new developers
   - Enterprise-ready architecture

## Best Practices

1. **Keep components small** (< 150 lines)
2. **Extract reusable logic** to hooks
3. **Use TypeScript** for type safety
4. **Compose, don't duplicate** - reuse components
5. **One component per file**
6. **Clear naming** - describe what it does

## Future Enhancements

- [ ] Drag & drop for Kanban
- [ ] Task detail modal
- [ ] Filtering and sorting
- [ ] Real-time updates
- [ ] Export Gantt to PDF
- [ ] Zoom controls for Gantt
