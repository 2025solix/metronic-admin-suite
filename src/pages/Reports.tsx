import { useState } from 'react';
import { Eye, MessageSquare, CheckCircle } from 'lucide-react';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { reportsData } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('all');

  const getFilteredData = () => {
    switch (activeTab) {
      case 'complaints':
        return reportsData.filter(r => r.type === 'Complaint');
      case 'feedback':
        return reportsData.filter(r => r.type === 'Feedback');
      case 'system':
        return reportsData.filter(r => r.type === 'System');
      default:
        return reportsData;
    }
  };

  const columns = [
    { key: 'id', header: 'Report ID', sortable: true },
    {
      key: 'type',
      header: 'Type',
      render: (item: typeof reportsData[0]) => (
        <span className={`text-sm font-medium ${
          item.type === 'Complaint' ? 'text-destructive' :
          item.type === 'Feedback' ? 'text-success' :
          'text-info'
        }`}>
          {item.type}
        </span>
      ),
    },
    { key: 'reporter', header: 'Reporter', sortable: true },
    { key: 'category', header: 'Category' },
    {
      key: 'severity',
      header: 'Severity',
      render: (item: typeof reportsData[0]) => <StatusBadge status={item.severity} />,
    },
    { key: 'date', header: 'Date', sortable: true },
    {
      key: 'status',
      header: 'Status',
      render: (item: typeof reportsData[0]) => <StatusBadge status={item.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item: typeof reportsData[0]) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
          <Button variant="ghost" size="sm">
            <MessageSquare className="w-4 h-4 mr-1" />
            Respond
          </Button>
        </div>
      ),
    },
  ];

  const filters = [
    {
      key: 'severity',
      label: 'Severity',
      options: [
        { value: 'Critical', label: 'Critical' },
        { value: 'High', label: 'High' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Low', label: 'Low' },
      ],
    },
    {
      key: 'status',
      label: 'Status',
      options: [
        { value: 'Open', label: 'Open' },
        { value: 'In Review', label: 'In Review' },
        { value: 'Resolved', label: 'Resolved' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">Reports & Feedback</h1>
        <p className="page-subtitle">Manage complaints, feedback, and system reports</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-foreground">{reportsData.length}</div>
            <p className="text-sm text-muted-foreground">Total Reports</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-warning">{reportsData.filter(r => r.status === 'Open').length}</div>
            <p className="text-sm text-muted-foreground">Open</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-info">{reportsData.filter(r => r.status === 'In Review').length}</div>
            <p className="text-sm text-muted-foreground">In Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-success">{reportsData.filter(r => r.status === 'Resolved').length}</div>
            <p className="text-sm text-muted-foreground">Resolved</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All ({reportsData.length})</TabsTrigger>
          <TabsTrigger value="complaints">Complaints ({reportsData.filter(r => r.type === 'Complaint').length})</TabsTrigger>
          <TabsTrigger value="feedback">Feedback ({reportsData.filter(r => r.type === 'Feedback').length})</TabsTrigger>
          <TabsTrigger value="system">System ({reportsData.filter(r => r.type === 'System').length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <DataTable
            data={getFilteredData()}
            columns={columns}
            searchPlaceholder="Search by ID, reporter, or category..."
            filters={filters}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
