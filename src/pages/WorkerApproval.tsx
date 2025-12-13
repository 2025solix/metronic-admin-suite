import { useState } from 'react';
import { Eye, Check, X, MessageSquare, FileText } from 'lucide-react';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { usePendingVerifications, useWorkerStats, useApproveWorker, useRejectWorker } from '@/hooks/useWorkers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const WorkerApproval = () => {
  const { data: pendingWorkers = [], isLoading } = usePendingVerifications();
  const { data: stats } = useWorkerStats();
  const [selectedWorker, setSelectedWorker] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  
  const approveWorker = useApproveWorker();
  const rejectWorker = useRejectWorker();

  const handleApprove = async () => {
    if (!selectedWorker) return;
    try {
      await approveWorker.mutateAsync({ id: selectedWorker.id, adminNotes });
      toast.success('Worker approved successfully');
      setShowDetailModal(false);
      setAdminNotes('');
    } catch (error) {
      toast.error('Failed to approve worker');
    }
  };

  const handleReject = async () => {
    if (!selectedWorker || !adminNotes) {
      toast.error('Please provide a reason for rejection');
      return;
    }
    try {
      await rejectWorker.mutateAsync({ id: selectedWorker.id, reason: adminNotes });
      toast.success('Worker rejected');
      setShowDetailModal(false);
      setAdminNotes('');
    } catch (error) {
      toast.error('Failed to reject worker');
    }
  };

  const columns = [
    { key: 'id', header: 'Worker ID', sortable: true, render: (item: any) => item.workers?.id?.slice(0, 8) || item.id.slice(0, 8) },
    { key: 'name', header: 'Name', sortable: true, render: (item: any) => item.workers?.name || '-' },
    { key: 'phone', header: 'Phone', render: (item: any) => item.workers?.phone || '-' },
    {
      key: 'request_type',
      header: 'Request Type',
      render: (item: any) => (
        <Badge variant="secondary">{item.request_type}</Badge>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: any) => <StatusBadge status={item.status} />,
    },
    { key: 'created_at', header: 'Submitted', sortable: true, render: (item: any) => new Date(item.created_at).toLocaleDateString() },
    {
      key: 'actions',
      header: 'Actions',
      render: (item: any) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedWorker(item);
              setShowDetailModal(true);
            }}
          >
            <Eye className="w-4 h-4 mr-1" />
            Review
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="page-header">
          <h1 className="page-title">Worker Approval</h1>
          <p className="page-subtitle">Loading verification requests...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">Worker Approval</h1>
        <p className="page-subtitle">Review and approve worker registrations (FIFO order)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-foreground">{stats?.pending || pendingWorkers.length}</div>
            <p className="text-sm text-muted-foreground">Pending Approvals</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-success">{stats?.verified || 0}</div>
            <p className="text-sm text-muted-foreground">Verified Workers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-destructive">{stats?.suspended || 0}</div>
            <p className="text-sm text-muted-foreground">Suspended</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">{stats?.total || 0}</div>
            <p className="text-sm text-muted-foreground">Total Workers</p>
          </CardContent>
        </Card>
      </div>

      <DataTable
        data={pendingWorkers}
        columns={columns}
        searchPlaceholder="Search by ID, name, or phone..."
        onRowClick={(item) => {
          setSelectedWorker(item);
          setShowDetailModal(true);
        }}
      />

      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Worker Approval Review</DialogTitle>
            <DialogDescription>
              Review worker details and documents before approval
            </DialogDescription>
          </DialogHeader>

          {selectedWorker && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Personal Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Name</p>
                    <p className="font-medium">{selectedWorker.workers?.name || '-'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Worker ID</p>
                    <p className="font-medium">{selectedWorker.workers?.id?.slice(0, 8) || '-'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Phone</p>
                    <p className="font-medium">{selectedWorker.workers?.phone || '-'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedWorker.workers?.email || '-'}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Request Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Request Type</p>
                    <Badge variant="secondary">{selectedWorker.request_type}</Badge>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Submitted Date</p>
                    <p className="font-medium">{new Date(selectedWorker.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Admin Notes</h3>
                <Textarea 
                  placeholder="Add notes about this application..." 
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowDetailModal(false)}>
              <MessageSquare className="w-4 h-4 mr-2" />
              Request Info
            </Button>
            <Button 
              variant="outline" 
              className="text-destructive border-destructive hover:bg-destructive/10"
              onClick={handleReject}
              disabled={rejectWorker.isPending}
            >
              <X className="w-4 h-4 mr-2" />
              Deny
            </Button>
            <Button 
              className="bg-success hover:bg-success/90"
              onClick={handleApprove}
              disabled={approveWorker.isPending}
            >
              <Check className="w-4 h-4 mr-2" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkerApproval;
