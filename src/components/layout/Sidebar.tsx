import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  UserCheck,
  BarChart3,
  FileText,
  Bell,
  CreditCard,
  Settings,
  ChevronDown,
  ChevronRight,
  Shield,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  children?: { to: string; label: string }[];
}

const NavItem = ({ to, icon, label, collapsed, children }: NavItemProps) => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(
    children?.some(child => location.pathname.startsWith(child.to)) || location.pathname.startsWith(to)
  );
  const hasChildren = children && children.length > 0;
  const isActive = location.pathname === to || (hasChildren && children.some(c => location.pathname.startsWith(c.to)));

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className={cn(
            'nav-item w-full justify-between group',
            isActive ? 'text-primary bg-primary/5' : 'nav-item-inactive'
          )}
        >
          <div className="flex items-center gap-3">
            <span className={cn(
              'transition-colors',
              isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
            )}>
              {icon}
            </span>
            {!collapsed && <span>{label}</span>}
          </div>
          {!collapsed && (
            <span className="transition-transform duration-200">
              {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </span>
          )}
        </button>
        <div className={cn(
          'ml-6 mt-1 space-y-1 overflow-hidden transition-all duration-200',
          expanded && !collapsed ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}>
          {children.map(child => (
            <NavLink
              key={child.to}
              to={child.to}
              className={({ isActive }) =>
                cn('nav-item text-sm', isActive ? 'nav-item-active' : 'nav-item-inactive')
              }
            >
              <span>{child.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    );
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn('nav-item group', isActive ? 'nav-item-active' : 'nav-item-inactive')
      }
    >
      <span className="transition-colors group-hover:text-primary">
        {icon}
      </span>
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
};

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 z-40',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-sidebar-border px-3">
        {collapsed ? (
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
            <span className="text-primary-foreground font-bold text-lg">JK</span>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-bold text-lg">JK</span>
            </div>
            <div>
              <span className="font-bold text-lg text-foreground">JobKaro</span>
              <span className="text-xs text-muted-foreground block -mt-1">Admin Portal</span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        <NavItem to="/dashboard" icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" collapsed={collapsed} />
        
        <NavItem
          to="/works"
          icon={<Briefcase className="w-5 h-5" />}
          label="Works"
          collapsed={collapsed}
          children={[
            { to: '/works/overview', label: 'All Works Overview' },
            { to: '/works/categories', label: 'Categories' },
            { to: '/works/create', label: 'Create Category' },
          ]}
        />

        <NavItem
          to="/worker-approval"
          icon={<UserCheck className="w-5 h-5" />}
          label="Worker Approval"
          collapsed={collapsed}
        />

        <NavItem
          to="/profiles"
          icon={<Users className="w-5 h-5" />}
          label="Profiles"
          collapsed={collapsed}
          children={[
            { to: '/profiles/all', label: 'All Profiles' },
          ]}
        />

        <NavItem to="/analytics" icon={<BarChart3 className="w-5 h-5" />} label="Analytics" collapsed={collapsed} />
        <NavItem to="/reports" icon={<FileText className="w-5 h-5" />} label="Reports" collapsed={collapsed} />
        <NavItem to="/notifications" icon={<Bell className="w-5 h-5" />} label="Notifications" collapsed={collapsed} />
        <NavItem to="/payments" icon={<CreditCard className="w-5 h-5" />} label="Payments" collapsed={collapsed} />
        <NavItem to="/audit-logs" icon={<Shield className="w-5 h-5" />} label="Audit Logs" collapsed={collapsed} />
        <NavItem to="/settings" icon={<Settings className="w-5 h-5" />} label="Settings" collapsed={collapsed} />
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border">
        {!collapsed && (
          <div className="text-xs text-muted-foreground text-center">
            <span className="font-medium">v1.0.0</span> • JobKaro Admin
          </div>
        )}
      </div>
    </aside>
  );
};
