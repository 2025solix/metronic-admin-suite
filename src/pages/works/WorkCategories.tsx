import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { workCategories } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/common/StatusBadge';

const WorkCategories = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">Work Categories</h1>
          <p className="page-subtitle">Manage job types and category configurations</p>
        </div>
        <Button onClick={() => navigate('/works/create')}>
          <Plus className="w-4 h-4 mr-2" />
          New Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workCategories.map(category => (
          <Card key={category.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                </div>
                <StatusBadge status={category.status} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-foreground">{category.worksCount}</p>
                  <p className="text-xs text-muted-foreground">Total Works</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WorkCategories;
