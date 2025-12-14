import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import Dashboard from "@/pages/Dashboard";
import WorksOverview from "@/pages/works/WorksOverview";
import WorkCategories from "@/pages/works/WorkCategories";
import WorkDetail from "@/pages/works/WorkDetail";
import CreateCategory from "@/pages/works/CreateCategory";
import WorkerApproval from "@/pages/WorkerApproval";
import ProfilesList from "@/pages/profiles/ProfilesList";
import ProfileDetail from "@/pages/profiles/ProfileDetail";
import Analytics from "@/pages/Analytics";
import Reports from "@/pages/Reports";
import Notifications from "@/pages/Notifications";
import Payments from "@/pages/Payments";
import Settings from "@/pages/Settings";
import AuditLogs from "@/pages/AuditLogs";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="works" element={<Navigate to="/works/overview" replace />} />
            <Route path="works/overview" element={<WorksOverview />} />
            <Route path="works/categories" element={<WorkCategories />} />
            <Route path="works/create" element={<CreateCategory />} />
            <Route path="works/detail/:id" element={<WorkDetail />} />
            <Route path="works/categories/:id/edit" element={<CreateCategory />} />
            <Route path="worker-approval" element={<WorkerApproval />} />
            <Route path="profiles" element={<Navigate to="/profiles/all" replace />} />
            <Route path="profiles/all" element={<ProfilesList />} />
            <Route path="profiles/:type/:id" element={<ProfileDetail />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="reports" element={<Reports />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="payments" element={<Payments />} />
            <Route path="settings" element={<Settings />} />
            <Route path="audit-logs" element={<AuditLogs />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
