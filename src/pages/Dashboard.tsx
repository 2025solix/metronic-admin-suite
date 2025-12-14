import {
  Users,
  Briefcase,
  UserCheck,
  XCircle,
  TrendingUp,
  CreditCard,
  Activity,
  UserPlus,
} from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { AlertCard } from '@/components/dashboard/AlertCard';
import { useDashboardStats, useGrowthData, useCategoryVolume, useRecentActivity } from '@/hooks/useDashboardStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

const Dashboard = () => {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: growthData = [], isLoading: growthLoading } = useGrowthData();
  const { data: categoryData = [], isLoading: categoryLoading } = useCategoryVolume();
  const { data: recentActivity = [], isLoading: activityLoading } = useRecentActivity();

  if (statsLoading) {
    return (
      <div className="space-y-6">
        <div className="page-header">
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Loading platform metrics...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Platform overview and live organizational metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatCard
          title="Total Workers"
          value={stats?.totalWorkers || 0}
          change="+12% from last month"
          changeType="positive"
          icon={Users}
          iconColor="text-primary"
          iconBg="bg-primary/10"
        />
        <StatCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          change="+8% from last month"
          changeType="positive"
          icon={UserPlus}
          iconColor="text-success"
          iconBg="bg-success/10"
        />
        <StatCard
          title="Active Works"
          value={stats?.activeWorks || 0}
          change="Active bookings"
          changeType="neutral"
          icon={Briefcase}
          iconColor="text-info"
          iconBg="bg-info/10"
        />
        <StatCard
          title="Worker Approvals"
          value={stats?.pendingApprovals || 0}
          change="Requires attention"
          changeType="negative"
          icon={UserCheck}
          iconColor="text-destructive"
          iconBg="bg-destructive/10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Completed Works"
          value={stats?.completedWorks || 0}
          icon={TrendingUp}
          iconColor="text-success"
          iconBg="bg-success/10"
        />
        <StatCard
          title="Cancelled Works"
          value={stats?.cancelledWorks || 0}
          icon={XCircle}
          iconColor="text-destructive"
          iconBg="bg-destructive/10"
        />
        <StatCard
          title="Payment Issues"
          value={stats?.paymentIssues || 0}
          icon={CreditCard}
          iconColor="text-warning"
          iconBg="bg-warning/10"
        />
        <StatCard
          title="Active Online"
          value={`${stats?.activeWorkers || 0} / ${stats?.activeUsers || 0}`}
          change="Workers / Users"
          icon={Activity}
          iconColor="text-primary"
          iconBg="bg-primary/10"
        />
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Alerts & Issues</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(stats?.paymentIssues || 0) > 0 && (
            <AlertCard
              type="danger"
              title="Payment Transfer Failed"
              message={`${stats?.paymentIssues} payment transfers failed`}
            />
          )}
          {(stats?.pendingApprovals || 0) > 0 && (
            <AlertCard
              type="warning"
              title="Pending Approvals"
              message={`${stats?.pendingApprovals} worker approvals pending`}
            />
          )}
          {(stats?.openReports || 0) > 0 && (
            <AlertCard
              type="info"
              title="Open Reports"
              message={`${stats?.openReports} reports require attention`}
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="card-title">Platform Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              {growthLoading ? (
                <Skeleton className="h-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Line type="monotone" dataKey="workers" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} name="Workers" />
                    <Line type="monotone" dataKey="users" stroke="hsl(var(--success))" strokeWidth={2} dot={false} name="Users" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="card-title">Work Volume by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              {categoryLoading ? (
                <Skeleton className="h-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis dataKey="category" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="card-title">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {activityLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12" />
              ))}
            </div>
          ) : recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.map(activity => (
                <div key={activity.id} className="flex items-center gap-4 py-2 border-b border-border last:border-0">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'create' ? 'bg-success' :
                    activity.type === 'update' ? 'bg-primary' :
                    activity.type === 'delete' ? 'bg-destructive' :
                    'bg-muted-foreground'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.user}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No recent activity</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
