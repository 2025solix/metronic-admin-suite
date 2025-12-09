import { useState } from 'react';
import { Eye, Check, X, MessageSquare, FileText } from 'lucide-react';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { pendingWorkerApprovals } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

const WorkerApproval = () => {
  const [selectedWorker, setSelectedWorker] = useState<typeof pendingWorkerApprovals[0] | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const columns = [
    { key: 'id', header: 'Worker ID', sortable: true },
    { key: 'name', header: 'Name', sortable: true },
    { key: 'phone', header: 'Phone' },
    {
      key: 'skills',
      header: 'Skills',
      render: (item: typeof pendingWorkerApprovals[0]) => (
        <div className="flex flex-wrap gap-1">
          {item.skills.map(skill => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      key: 'documents',
      header: 'Documents',
      render: (item: typeof pendingWorkerApprovals[0]) => (
        <span className="flex items-center gap-1">
          <FileText className="w-4 h-4 text-muted-foreground" />
          {item.documents} uploaded
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: typeof pendingWorkerApprovals[0]) => <StatusBadge status={item.status} />,
    },
    { key: 'submittedDate', header: 'Submitted', sortable: true },
    {
      key: 'actions',
      header: 'Actions',
      render: (item: typeof pendingWorkerApprovals[0]) => (
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

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">Worker Approval</h1>
        <p className="page-subtitle">Review and approve worker registrations (FIFO order)</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-foreground">{pendingWorkerApprovals.length}</div>
            <p className="text-sm text-muted-foreground">Pending Approvals</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-success">48</div>
            <p className="text-sm text-muted-foreground">Approved Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-destructive">3</div>
            <p className="text-sm text-muted-foreground">Rejected Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-warning">12</div>
            <p className="text-sm text-muted-foreground">Awaiting Info</p>
          </CardContent>
        </Card>
      </div>

      <DataTable
        data={pendingWorkerApprovals}
        columns={columns}
        searchPlaceholder="Search by ID, name, or phone..."
        onRowClick={(item) => {
          setSelectedWorker(item);
          setShowDetailModal(true);
        }}
      />

      {/* Detail Modal */}
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
              {/* Personal Details */}
              <div>
                <h3 className="font-semibold mb-3">Personal Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Name</p>
                    <p className="font-medium">{selectedWorker.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Worker ID</p>
                    <p className="font-medium">{selectedWorker.id}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Phone</p>
                    <p className="font-medium">{selectedWorker.phone}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Submitted Date</p>
                    <p className="font-medium">{selectedWorker.submittedDate}</p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="font-semibold mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedWorker.skills.map(skill => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="font-semibold mb-3">Uploaded Documents</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['Aadhaar Card', 'PAN Card', 'Skill Certificate'].slice(0, selectedWorker.documents).map((doc, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 border border-border rounded-lg">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{doc}</p>
                        <p className="text-xs text-muted-foreground">Uploaded</p>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="font-semibold mb-3">Admin Notes</h3>
                <Textarea placeholder="Add notes about this application..." />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowDetailModal(false)}>
              <MessageSquare className="w-4 h-4 mr-2" />
              Request Info
            </Button>
            <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">
              <X className="w-4 h-4 mr-2" />
              Deny
            </Button>
            <Button className="bg-success hover:bg-success/90">
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
