import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, MoreHorizontal } from 'lucide-react';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { worksData } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const WorksOverview = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const getFilteredData = () => {
    switch (activeTab) {
      case 'active':
        return worksData.filter(w => w.status === 'Active');
      case 'completed':
        return worksData.filter(w => w.status === 'Completed');
      case 'pending':
        return worksData.filter(w => w.status === 'Pending' || w.status === 'New');
      case 'cancelled':
        return worksData.filter(w => w.status === 'Cancelled');
      default:
        return worksData;
    }
  };

  const columns = [
    { key: 'id', header: 'Work ID', sortable: true },
    { key: 'category', header: 'Category', sortable: true },
    { key: 'userName', header: 'User Name', sortable: true },
    { key: 'workerName', header: 'Worker Name', sortable: true },
    {
      key: 'status',
      header: 'Status',
      render: (item: typeof worksData[0]) => <StatusBadge status={item.status} />,
    },
    { key: 'dateRequested', header: 'Date Requested', sortable: true },
    { key: 'dueDate', header: 'Due Date', sortable: true },
    { key: 'mode', header: 'Mode' },
    {
      key: 'paymentStatus',
      header: 'Payment',
      render: (item: typeof worksData[0]) => <StatusBadge status={item.paymentStatus} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item: typeof worksData[0]) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/works/detail/${item.id}`);
            }}
          >
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Reassign Worker</DropdownMenuItem>
              <DropdownMenuItem>Mark Complete</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Cancel Work</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const filters = [
    {
      key: 'category',
      label: 'Category',
      options: [
        { value: 'Plumbing', label: 'Plumbing' },
        { value: 'Electrical', label: 'Electrical' },
        { value: 'Cleaning', label: 'Cleaning' },
        { value: 'AC Repair', label: 'AC Repair' },
        { value: 'Carpentry', label: 'Carpentry' },
        { value: 'Painting', label: 'Painting' },
        { value: 'Driver', label: 'Driver' },
      ],
    },
    {
      key: 'paymentStatus',
      label: 'Payment',
      options: [
        { value: 'Paid', label: 'Paid' },
        { value: 'Pending', label: 'Pending' },
        { value: 'Partial', label: 'Partial' },
        { value: 'Refunded', label: 'Refunded' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">Works Overview</h1>
        <p className="page-subtitle">Manage all work requests and assignments</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Works ({worksData.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({worksData.filter(w => w.status === 'Active').length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({worksData.filter(w => w.status === 'Pending' || w.status === 'New').length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({worksData.filter(w => w.status === 'Completed').length})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({worksData.filter(w => w.status === 'Cancelled').length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <DataTable
            data={getFilteredData()}
            columns={columns}
            searchPlaceholder="Search by ID, category, user or worker..."
            filters={filters}
            onRowClick={(item) => navigate(`/works/detail/${item.id}`)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorksOverview;
