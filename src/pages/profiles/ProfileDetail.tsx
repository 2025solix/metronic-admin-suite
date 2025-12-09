import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Phone, Mail, MapPin, Calendar, Briefcase, CreditCard, Star, AlertTriangle, Ban, FileText } from 'lucide-react';
import { profilesData, worksData, paymentsData } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const ProfileDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const profile = profilesData.find(p => p.id === id);

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Profile not found</p>
      </div>
    );
  }

  const userWorks = worksData.filter(w => 
    profile.role === 'Employer' ? w.userName === profile.name : w.workerName === profile.name
  );

  const userPayments = paymentsData.filter(p =>
    profile.role === 'Employer' ? p.user === profile.name : p.worker === profile.name
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1 flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-primary/10 text-primary text-xl">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="page-title">{profile.name}</h1>
              <StatusBadge status={profile.status} />
            </div>
            <p className="page-subtitle">{profile.role} • {profile.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Warn
          </Button>
          <Button variant="outline" className="text-warning border-warning hover:bg-warning/10">
            Suspend
          </Button>
          <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">
            <Ban className="w-4 h-4 mr-2" />
            Ban
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <User className="w-5 h-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{profile.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{profile.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Kochi, Kerala</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Joined January 2024</span>
              </div>
            </CardContent>
          </Card>

          {profile.role === 'Worker' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="w-5 h-5" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {['Aadhaar Card', 'PAN Card', 'Skill Certificate'].map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-2 border border-border rounded">
                    <span className="text-sm">{doc}</span>
                    <Badge variant="outline" className="text-success border-success">Verified</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Star className="w-5 h-5" />
                Ratings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-foreground">4.8</span>
                <div className="flex text-warning">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className={`w-4 h-4 ${i <= 4 ? 'fill-current' : ''}`} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Based on 24 reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="works">
            <TabsList>
              <TabsTrigger value="works">
                <Briefcase className="w-4 h-4 mr-2" />
                Work History
              </TabsTrigger>
              <TabsTrigger value="payments">
                <CreditCard className="w-4 h-4 mr-2" />
                Payments
              </TabsTrigger>
              <TabsTrigger value="complaints">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Complaints
              </TabsTrigger>
            </TabsList>

            <TabsContent value="works" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Work ID</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userWorks.length > 0 ? userWorks.map(work => (
                        <tr key={work.id} className="cursor-pointer" onClick={() => navigate(`/works/detail/${work.id}`)}>
                          <td>{work.id}</td>
                          <td>{work.category}</td>
                          <td>{work.dateRequested}</td>
                          <td><StatusBadge status={work.status} /></td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={4} className="text-center py-8 text-muted-foreground">
                            No work history found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Payment ID</th>
                        <th>Amount</th>
                        <th>Method</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userPayments.length > 0 ? userPayments.map(payment => (
                        <tr key={payment.id}>
                          <td>{payment.id}</td>
                          <td>₹{payment.amount.toLocaleString()}</td>
                          <td>{payment.method}</td>
                          <td>{payment.date}</td>
                          <td><StatusBadge status={payment.status} /></td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={5} className="text-center py-8 text-muted-foreground">
                            No payment history found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="complaints" className="mt-4">
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No complaints against this user
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
