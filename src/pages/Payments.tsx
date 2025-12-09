import { useState } from 'react';
import { Eye, Download, RefreshCw } from 'lucide-react';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { paymentsData } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

const Payments = () => {
  const [activeTab, setActiveTab] = useState('all');

  const getFilteredData = () => {
    switch (activeTab) {
      case 'completed':
        return paymentsData.filter(p => p.status === 'Completed');
      case 'pending':
        return paymentsData.filter(p => p.status === 'Pending' || p.status === 'Partial');
      case 'refunds':
        return paymentsData.filter(p => p.status === 'Refunded');
      default:
        return paymentsData;
    }
  };

  const columns = [
    { key: 'id', header: 'Payment ID', sortable: true },
    { key: 'workId', header: 'Work ID' },
    { key: 'user', header: 'User (Payer)', sortable: true },
    { key: 'worker', header: 'Worker (Recipient)', sortable: true },
    {
      key: 'amount',
      header: 'Amount',
      render: (item: typeof paymentsData[0]) => (
        <span className="font-medium">₹{item.amount.toLocaleString()}</span>
      ),
      sortable: true,
    },
    { key: 'method', header: 'Method' },
    {
      key: 'status',
      header: 'Status',
      render: (item: typeof paymentsData[0]) => <StatusBadge status={item.status} />,
    },
    { key: 'date', header: 'Date', sortable: true },
    {
      key: 'actions',
      header: 'Actions',
      render: (item: typeof paymentsData[0]) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="w-4 h-4 mr-1" />
            Receipt
          </Button>
        </div>
      ),
    },
  ];

  const filters = [
    {
      key: 'method',
      label: 'Method',
      options: [
        { value: 'UPI', label: 'UPI' },
        { value: 'Bank', label: 'Bank Transfer' },
      ],
    },
  ];

  const totalAmount = paymentsData.reduce((sum, p) => sum + p.amount, 0);
  const completedAmount = paymentsData.filter(p => p.status === 'Completed').reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = paymentsData.filter(p => p.status === 'Pending' || p.status === 'Partial').reduce((sum, p) => sum + p.amount, 0);
  const refundedAmount = paymentsData.filter(p => p.status === 'Refunded').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">Payments</h1>
          <p className="page-subtitle">Manage payment transactions and payouts</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-foreground">₹{totalAmount.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Total Volume</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-success">₹{completedAmount.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-warning">₹{pendingAmount.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-info">₹{refundedAmount.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Refunded</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Payments ({paymentsData.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({paymentsData.filter(p => p.status === 'Completed').length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({paymentsData.filter(p => p.status === 'Pending' || p.status === 'Partial').length})</TabsTrigger>
          <TabsTrigger value="refunds">Refunds ({paymentsData.filter(p => p.status === 'Refunded').length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <DataTable
            data={getFilteredData()}
            columns={columns}
            searchPlaceholder="Search by ID, user, or worker..."
            filters={filters}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Payments;
