import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const [workersRes, usersRes, bookingsRes, paymentsRes, reportsRes, verificationsRes] = await Promise.all([
        supabase.from('workers').select('id, verification_status, is_available'),
        supabase.from('users').select('id, status'),
        supabase.from('bookings').select('id, booking_status, payment_status'),
        supabase.from('payments').select('id, status'),
        supabase.from('reports').select('id, status'),
        supabase.from('verification_requests').select('id, status'),
      ]);

      const workers = workersRes.data || [];
      const users = usersRes.data || [];
      const bookings = bookingsRes.data || [];
      const payments = paymentsRes.data || [];
      const verifications = verificationsRes.data || [];

      return {
        totalWorkers: workers.length,
        totalUsers: users.length,
        activeWorks: bookings.filter(b => ['pending', 'accepted', 'in_progress'].includes(b.booking_status)).length,
        pendingRequests: bookings.filter(b => b.booking_status === 'pending').length,
        cancelledWorks: bookings.filter(b => b.booking_status === 'cancelled').length,
        completedWorks: bookings.filter(b => b.booking_status === 'completed').length,
        paymentIssues: payments.filter(p => p.status === 'failed').length,
        pendingApprovals: verifications.filter(v => v.status === 'pending').length,
        activeWorkers: workers.filter(w => w.is_available).length,
        activeUsers: users.filter(u => u.status === 'active').length,
        openReports: (reportsRes.data || []).filter(r => r.status === 'open').length,
      };
    },
  });
};

export const useGrowthData = () => {
  return useQuery({
    queryKey: ['growth-data'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('daily_statistics')
        .select('*')
        .order('date', { ascending: true })
        .limit(12);
      if (error) throw error;
      return (data || []).map(d => ({
        month: new Date(d.date).toLocaleDateString('en-US', { month: 'short' }),
        workers: d.new_workers || 0,
        users: d.new_users || 0,
        works: d.total_bookings || 0,
        revenue: d.total_revenue || 0,
        payouts: d.worker_earnings || 0,
      }));
    },
  });
};

export const useCategoryVolume = () => {
  return useQuery({
    queryKey: ['category-volume'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('category_name');
      if (error) throw error;
      
      const volumeMap: Record<string, number> = {};
      (data || []).forEach(b => {
        volumeMap[b.category_name] = (volumeMap[b.category_name] || 0) + 1;
      });
      
      return Object.entries(volumeMap).map(([category, count]) => ({
        category,
        count,
      }));
    },
  });
};

export const useRecentActivity = () => {
  return useQuery({
    queryKey: ['recent-activity'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('audit_logs')
        .select('*, admins(name)')
        .order('created_at', { ascending: false })
        .limit(10);
      if (error) throw error;
      
      return (data || []).map(log => ({
        id: log.id,
        action: log.description,
        user: log.admins?.name || 'System',
        time: getRelativeTime(log.created_at),
        type: log.action_type,
      }));
    },
  });
};

function getRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  return `${diffDays} days ago`;
}
