import {
  Users,
  Briefcase,
  UserCheck,
  Clock,
  XCircle,
  AlertTriangle,
  CreditCard,
  TrendingUp,
  Activity,
  UserPlus,
} from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { AlertCard } from '@/components/dashboard/AlertCard';
import { dashboardStats, monthlyGrowthData, categoryVolumeData, recentActivity } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Platform overview and live organizational metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatCard
          title="Total Workers"
          value={dashboardStats.totalWorkers}
          change="+12% from last month"
          changeType="positive"
          icon={Users}
          iconColor="text-primary"
          iconBg="bg-primary/10"
        />
        <StatCard
          title="Total Users"
          value={dashboardStats.totalUsers}
          change="+8% from last month"
          changeType="positive"
          icon={UserPlus}
          iconColor="text-success"
          iconBg="bg-success/10"
        />
        <StatCard
          title="Active Works"
          value={dashboardStats.activeWorks}
          change="24 due today"
          changeType="neutral"
          icon={Briefcase}
          iconColor="text-info"
          iconBg="bg-info/10"
        />
        <StatCard
          title="Pending Requests"
          value={dashboardStats.pendingRequests}
          change="+15 new today"
          changeType="neutral"
          icon={Clock}
          iconColor="text-warning"
          iconBg="bg-warning/10"
        />
        <StatCard
          title="Worker Approvals"
          value={dashboardStats.pendingApprovals}
          change="Requires attention"
          changeType="negative"
          icon={UserCheck}
          iconColor="text-destructive"
          iconBg="bg-destructive/10"
        />
      </div>

      {/* Second Row Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="New Work Requests"
          value={dashboardStats.newWorkRequests}
          icon={TrendingUp}
          iconColor="text-success"
          iconBg="bg-success/10"
        />
        <StatCard
          title="Cancelled Works"
          value={dashboardStats.cancelledWorks}
          icon={XCircle}
          iconColor="text-destructive"
          iconBg="bg-destructive/10"
        />
        <StatCard
          title="Payment Issues"
          value={dashboardStats.paymentIssues}
          icon={CreditCard}
          iconColor="text-warning"
          iconBg="bg-warning/10"
        />
        <StatCard
          title="Active Online"
          value={`${dashboardStats.activeWorkers} / ${dashboardStats.activeUsers}`}
          change="Workers / Users"
          icon={Activity}
          iconColor="text-primary"
          iconBg="bg-primary/10"
        />
      </div>

      {/* Alerts Section */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Alerts & Issues</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AlertCard
            type="danger"
            title="Payment Transfer Failed"
            message="12 payment transfers failed due to bank issues"
          />
          <AlertCard
            type="warning"
            title="High Pending Approvals"
            message="67 worker approvals pending for more than 24 hours"
          />
          <AlertCard
            type="info"
            title="System Maintenance"
            message="Scheduled maintenance on Jan 20, 2024 at 2:00 AM"
          />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="card-title">Platform Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyGrowthData}>
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
            </div>
          </CardContent>
        </Card>

        {/* Category Volume Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="card-title">Work Volume by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryVolumeData} layout="vertical">
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
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="card-title">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map(activity => (
              <div key={activity.id} className="flex items-center gap-4 py-2 border-b border-border last:border-0">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'registration' ? 'bg-success' :
                  activity.type === 'work' ? 'bg-primary' :
                  activity.type === 'payment' ? 'bg-info' :
                  activity.type === 'cancellation' ? 'bg-destructive' :
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
