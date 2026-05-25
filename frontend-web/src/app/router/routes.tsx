import { createBrowserRouter } from "react-router-dom";

// Auth
import LoginPage from "../../features/auth/pages/LoginPage";
import RegisterPage from "../../features/auth/pages/RegisterPage";

// Route Guards
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

// Dashboard
import DashboardPage from "../../features/dashboard/pages/DashboardPage";

// Teamwork
import TeamworkCalendarPage from "../../features/teamwork/pages/TeamworkCalendarPage";
import TeamworkDocumentsPage from "../../features/teamwork/pages/TeamworkDocumentsPage";

// CRM
import CRMLeadsPage from "../../features/crm/pages/CRMLeadsPage";
import CRMPipelinePage from "../../features/crm/pages/CRMPipelinePage";
import CRMCustomersPage from "../../features/crm/pages/CRMCustomersPage";
import CRMActivitiesPage from "../../features/crm/pages/CRMActivitiesPage";

// Sales
import SalesQuotationPage from "../../features/sales/pages/SalesQuotationPage";
import SalesOrderPage from "../../features/sales/pages/SalesOrderPage";
import SalesReportPage from "../../features/sales/pages/SalesReportPage";

// Purchases
import PurchaseRequestPage from "../../features/purchases/pages/PurchaseRequestPage";
import PurchaseOrderPage from "../../features/purchases/pages/PurchaseOrderPage";
import SupplierPage from "../../features/purchases/pages/SupplierPage";

// Invoicing
import CustomerInvoicePage from "../../features/invoicing/pages/CustomerInvoicePage";
import SupplierInvoicePage from "../../features/invoicing/pages/SupplierInvoicePage";
import PaymentPage from "../../features/invoicing/pages/PaymentPage";

// Accounting
import JournalEntriesPage from "../../features/accounting/pages/JournalEntriesPage";
import ChartOfAccountsPage from "../../features/accounting/pages/ChartOfAccountsPage";
import FinancialReportPage from "../../features/accounting/pages/FinancialReportPage";
import AccountingBudgetPage from "../../features/accounting/pages/AccountingBudgetPage";

// Budget
import BudgetLinesPage from "../../features/budget/pages/BudgetLinesPage";
import BudgetReportPage from "../../features/budget/pages/BudgetReportPage";

// Project Management
import ProjectManagementPage from "../../features/project-management/pages/ProjectManagementPage";

// HRM
import { EmployeesPage } from "../../features/hrm/pages/EmployeesPage";
import { DepartmentsPage } from "../../features/hrm/pages/DepartmentsPage";
import { PositionsPage } from "../../features/hrm/pages/PositionsPage";
import LeaveManagementPage from "../../features/hrm/pages/LeaveManagementPage";
import MyHRProfilePage from "../../features/hrm/pages/MyHRProfilePage";
import MyHRLeavePage from "../../features/hrm/pages/MyHRLeavePage";
import MyHRTimesheetPage from "../../features/hrm/pages/MyHRTimesheetPage";
import MyHRExpensePage from "../../features/hrm/pages/MyHRExpensePage";

// Expense
import ExpenseReportPage from "../../features/expense/pages/ExpenseReportPage";
import ExpenseApprovalPage from "../../features/expense/pages/ExpenseApprovalPage";

// Timesheet
import InputTimesheetPage from "../../features/timesheet/pages/InputTimesheetPage";
import ValidateTimesheetPage from "../../features/timesheet/pages/ValidateTimesheetPage";

// Recruitment
import JobPositionsPage from "../../features/recruitment/pages/JobPositionsPage";
import CandidatesPage from "../../features/recruitment/pages/CandidatesPage";
import RecruitmentStagesPage from "../../features/recruitment/pages/RecruitmentStagesPage";

// Contracts
import EmployeeContractsPage from "../../features/contracts/pages/EmployeeContractsPage";
import CustomerContractsPage from "../../features/contracts/pages/CustomerContractsPage";

// BPM
import ActiveProcessesPage from "../../features/bpm/pages/ActiveProcessesPage";
import BPMWorkflowStudioPage from "../../features/bpm/pages/BPMWorkflowStudioPage";
import BPMApprovalInboxPage from "../../features/bpm/pages/BPMApprovalInboxPage";
import ProcessHistoryPage from "../../features/bpm/pages/ProcessHistoryPage";

// Admin
import AppsManagementPage from "../../features/admin/pages/AppsManagementPage";
import GeneralDataPage from "../../features/admin/pages/GeneralDataPage";
import UserManagementPage from "../../features/admin/pages/UserManagementPage";
import ConfigurationPage from "../../features/admin/pages/ConfigurationPage";
import AdminTechnicalPage from "../../features/admin/pages/AdminTechnicalPage";
import AdminBatchesPage from "../../features/admin/pages/AdminBatchesPage";
import AdminMessagePage from "../../features/admin/pages/AdminMessagePage";
import AdminSecurityPage from "../../features/admin/pages/AdminSecurityPage";

// Notifications
import NotificationCenterPage from "../../features/notifications/pages/NotificationCenterPage";

import MainLayout from "../layouts/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: DashboardPage },

      // Teamwork
      { path: "teamwork/calendar", Component: TeamworkCalendarPage },
      { path: "teamwork/documents", Component: TeamworkDocumentsPage },

      // CRM
      { path: "crm/leads", Component: CRMLeadsPage },
      { path: "crm/pipeline", Component: CRMPipelinePage },
      { path: "crm/customers", Component: CRMCustomersPage },
      { path: "crm/activities", Component: CRMActivitiesPage },

      // Sales
      { path: "sales/quotation", Component: SalesQuotationPage },
      { path: "sales/order", Component: SalesOrderPage },
      { path: "sales/report", Component: SalesReportPage },

      // Purchases
      { path: "purchases/request", Component: PurchaseRequestPage },
      { path: "purchases/order", Component: PurchaseOrderPage },
      { path: "purchases/supplier", Component: SupplierPage },

      // Invoicing
      { path: "invoicing/customer", Component: CustomerInvoicePage },
      { path: "invoicing/supplier", Component: SupplierInvoicePage },
      { path: "invoicing/payment", Component: PaymentPage },

      // Accounting
      { path: "accounting/journal", Component: JournalEntriesPage },
      { path: "accounting/chart", Component: ChartOfAccountsPage },
      { path: "accounting/report", Component: FinancialReportPage },
      { path: "accounting/budget", Component: AccountingBudgetPage },

      // Budget Management
      { path: "budget/lines", Component: BudgetLinesPage },
      { path: "budget/report", Component: BudgetReportPage },

      // Project Management
      { path: "projects", Component: ProjectManagementPage },

      // HR
      { path: "hrm/employees", Component: EmployeesPage },
      { path: "hrm/departments", Component: DepartmentsPage },
      { path: "hrm/positions", Component: PositionsPage },

      // MyHR
      { path: "myhr/profile", Component: MyHRProfilePage },
      { path: "myhr/leave", Component: MyHRLeavePage },
      { path: "myhr/timesheet", Component: MyHRTimesheetPage },
      { path: "myhr/expense", Component: MyHRExpensePage },

      // Leave Management
      { path: "leave", Component: LeaveManagementPage },

      // Expense Management
      { path: "expense/report", Component: ExpenseReportPage },
      { path: "expense/approval", Component: ExpenseApprovalPage },

      // Timesheet Management
      { path: "timesheet/input", Component: InputTimesheetPage },
      { path: "timesheet/validate", Component: ValidateTimesheetPage },

      // Recruitment
      { path: "recruitment/positions", Component: JobPositionsPage },
      { path: "recruitment/candidates", Component: CandidatesPage },
      { path: "recruitment/stages", Component: RecruitmentStagesPage },

      // Contracts
      { path: "contracts/employee", Component: EmployeeContractsPage },
      { path: "contracts/customer", Component: CustomerContractsPage },

      // BPM
      { path: "bpm/active", Component: ActiveProcessesPage },
      { path: "bpm/studio", Component: BPMWorkflowStudioPage },
      { path: "bpm/approval", Component: BPMApprovalInboxPage },
      { path: "bpm/history", Component: ProcessHistoryPage },

      // Application Config
      { path: "config/apps", Component: AppsManagementPage },
      { path: "config/general", Component: GeneralDataPage },
      { path: "users", Component: UserManagementPage },
      { path: "config/settings", Component: ConfigurationPage },

      // Administration
      { path: "admin/technical", Component: AdminTechnicalPage },
      { path: "admin/batches", Component: AdminBatchesPage },
      { path: "admin/message", Component: AdminMessagePage },
      { path: "admin/security", Component: AdminSecurityPage },

      // Notifications
      { path: "notifications", Component: NotificationCenterPage },
    ],
  },
]);
