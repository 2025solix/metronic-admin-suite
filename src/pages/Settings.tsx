import { useState } from 'react';
import { Users, Shield, Settings as SettingsIcon, Lock, Eye, Plus, Edit, Trash2 } from 'lucide-react';
import { adminStaff } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Settings = () => {
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage platform settings and configurations</p>
      </div>

      <Tabs defaultValue="team">
        <TabsList>
          <TabsTrigger value="team">
            <Users className="w-4 h-4 mr-2" />
            Admin Team
          </TabsTrigger>
          <TabsTrigger value="roles">
            <Shield className="w-4 h-4 mr-2" />
            Roles & Permissions
          </TabsTrigger>
          <TabsTrigger value="system">
            <SettingsIcon className="w-4 h-4 mr-2" />
            System Settings
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Admin Team */}
        <TabsContent value="team" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Admin Team Management</CardTitle>
                <CardDescription>Manage admin users and their access</CardDescription>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Admin
              </Button>
            </CardHeader>
            <CardContent>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Admin</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Last Login</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {adminStaff.map(admin => (
                    <tr key={admin.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {admin.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{admin.name}</span>
                        </div>
                      </td>
                      <td>{admin.email}</td>
                      <td>{admin.role}</td>
                      <td><StatusBadge status={admin.status} /></td>
                      <td>{admin.lastLogin}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roles & Permissions */}
        <TabsContent value="roles" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Roles & Permissions</CardTitle>
                <CardDescription>Define roles and access levels</CardDescription>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Role
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Super Admin', description: 'Full access to all features', users: 1 },
                  { name: 'Operations', description: 'Manage works, workers, and users', users: 2 },
                  { name: 'Finance', description: 'Manage payments and reports', users: 1 },
                  { name: 'Support', description: 'Handle reports and notifications', users: 3 },
                ].map((role, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <h3 className="font-medium">{role.name}</h3>
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{role.users} users</span>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Platform Name</Label>
                  <Input defaultValue="JobService" />
                </div>
                <div className="space-y-2">
                  <Label>Support Email</Label>
                  <Input defaultValue="support@jobservice.com" />
                </div>
                <div className="space-y-2">
                  <Label>Default Currency</Label>
                  <Select defaultValue="INR">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">INR (₹)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select defaultValue="IST">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IST">IST (UTC+5:30)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive email alerts for critical events</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Payment Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified about payment issues</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Worker Approval Reminders</p>
                  <p className="text-sm text-muted-foreground">Daily digest of pending approvals</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Authentication & Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication (2FA)</p>
                  <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
                </div>
                <Switch checked={mfaEnabled} onCheckedChange={setMfaEnabled} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Session Timeout</p>
                  <p className="text-sm text-muted-foreground">Automatically logout after inactivity</p>
                </div>
                <Select defaultValue="30">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Blocked Users</CardTitle>
              <CardDescription>Users banned or suspended from the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Lock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No blocked users</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
