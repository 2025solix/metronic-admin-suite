import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Briefcase, MapPin, Calendar, CreditCard, Clock, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { worksData } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Separator } from '@/components/ui/separator';

const WorkDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const work = worksData.find(w => w.id === id);

  if (!work) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Work not found</p>
      </div>
    );
  }

  const timeline = [
    { date: work.dateRequested, event: 'Work Requested', status: 'completed' },
    { date: work.dateRequested, event: 'Worker Assigned', status: work.workerName !== 'Unassigned' ? 'completed' : 'pending' },
    { date: work.dueDate, event: 'Work Started', status: work.status === 'Active' || work.status === 'Completed' ? 'completed' : 'pending' },
    { date: work.dueDate, event: 'Work Completed', status: work.status === 'Completed' ? 'completed' : 'pending' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="page-title">{work.id}</h1>
            <StatusBadge status={work.status} />
          </div>
          <p className="page-subtitle">{work.category} Service</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reassign
          </Button>
          <Button variant="outline" className="text-success border-success hover:bg-success/10">
            <CheckCircle className="w-4 h-4 mr-2" />
            Complete
          </Button>
          <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">
            <XCircle className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Work Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Work Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Work ID</p>
                  <p className="font-medium">{work.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium">{work.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mode</p>
                  <p className="font-medium">{work.mode}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <StatusBadge status={work.status} />
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground mb-2">Description</p>
                <p className="text-sm">This is a sample work description. The user has requested {work.category.toLowerCase()} services at their location. Please ensure quality service delivery.</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>123 Main Street, Kochi, Kerala 682001</span>
              </div>
            </CardContent>
          </Card>

          {/* User & Worker Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <User className="w-5 h-5" />
                  User Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{work.userName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">+91 9876543210</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{work.userName.toLowerCase().replace(' ', '.')}@email.com</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Past Works</p>
                  <p className="font-medium">12 completed</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <User className="w-5 h-5" />
                  Worker Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{work.workerName}</p>
                </div>
                {work.workerName !== 'Unassigned' && (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">+91 9876543211</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Skills</p>
                      <p className="font-medium">{work.category}, General Maintenance</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Verification</p>
                      <StatusBadge status="Active" />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="w-5 h-5" />
                Work Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className={`w-3 h-3 rounded-full mt-1.5 ${
                      item.status === 'completed' ? 'bg-success' : 'bg-muted'
                    }`} />
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        item.status === 'completed' ? 'text-foreground' : 'text-muted-foreground'
                      }`}>{item.event}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <CreditCard className="w-5 h-5" />
                Payment Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Service Charge</span>
                <span className="font-medium">₹1,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Platform Fee</span>
                <span className="font-medium">₹150</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-bold">₹1,650</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm text-muted-foreground">Payment Status</span>
                <StatusBadge status={work.paymentStatus} />
              </div>
            </CardContent>
          </Card>

          {/* Dates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="w-5 h-5" />
                Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Requested Date</p>
                <p className="font-medium">{work.dateRequested}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Due Date</p>
                <p className="font-medium">{work.dueDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Preferred Time</p>
                <p className="font-medium">10:00 AM - 12:00 PM</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkDetail;
