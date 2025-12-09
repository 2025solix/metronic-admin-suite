import { useState } from 'react';
import { Bell, CreditCard, Briefcase, UserCheck, AlertTriangle, Check, Trash2 } from 'lucide-react';
import { notificationsData } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

const Notifications = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return CreditCard;
      case 'work':
        return Briefcase;
      case 'approval':
        return UserCheck;
      case 'system':
        return AlertTriangle;
      default:
        return Bell;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'payment':
        return 'text-warning bg-warning/10';
      case 'work':
        return 'text-info bg-info/10';
      case 'approval':
        return 'text-success bg-success/10';
      case 'system':
        return 'text-destructive bg-destructive/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markSelectedRead = () => {
    setNotifications(notifications.map(n =>
      selectedIds.includes(n.id) ? { ...n, read: true } : n
    ));
    setSelectedIds([]);
  };

  const deleteSelected = () => {
    setNotifications(notifications.filter(n => !selectedIds.includes(n.id)));
    setSelectedIds([]);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">Notifications</h1>
          <p className="page-subtitle">{unreadCount} unread notifications</p>
        </div>
        <div className="flex gap-2">
          {selectedIds.length > 0 && (
            <>
              <Button variant="outline" size="sm" onClick={markSelectedRead}>
                <Check className="w-4 h-4 mr-2" />
                Mark Read
              </Button>
              <Button variant="outline" size="sm" className="text-destructive" onClick={deleteSelected}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </>
          )}
          <Button variant="outline" onClick={markAllRead}>
            Mark All as Read
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Notifications</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {notifications.map(notification => {
              const Icon = getIcon(notification.type);
              const iconColor = getIconColor(notification.type);

              return (
                <div
                  key={notification.id}
                  className={cn(
                    'flex items-start gap-4 p-4 transition-colors hover:bg-muted/50',
                    !notification.read && 'bg-primary/5'
                  )}
                >
                  <Checkbox
                    checked={selectedIds.includes(notification.id)}
                    onCheckedChange={() => toggleSelect(notification.id)}
                  />
                  <div className={cn('p-2 rounded-lg', iconColor)}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className={cn(
                        'text-sm',
                        !notification.read ? 'font-semibold text-foreground' : 'font-medium text-muted-foreground'
                      )}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
