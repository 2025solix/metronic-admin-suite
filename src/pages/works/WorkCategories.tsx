import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Search, X } from 'lucide-react';
import { useCategories, useUpdateCategory } from '@/hooks/useCategories';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import type { Json } from '@/integrations/supabase/types';

interface Category {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  base_rate: number | null;
  is_active: boolean | null;
  display_order: number | null;
  metadata: Json | null;
  created_at: string;
  updated_at: string;
}

const WorkCategories = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: categories = [], isLoading } = useCategories();
  const updateCategory = useUpdateCategory();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  // Edit form state
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editBaseRate, setEditBaseRate] = useState('');
  const [editIsActive, setEditIsActive] = useState(true);

  const getTags = (category: Category): string[] => {
    if (category.metadata && typeof category.metadata === 'object' && 'tags' in category.metadata) {
      return (category.metadata as { tags: string[] }).tags || [];
    }
    return [];
  };

  const filteredCategories = categories.filter(cat => {
    const tags = getTags(cat);
    const matchesName = cat.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDescription = cat.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesName || matchesTags || matchesDescription;
  });

  const handleView = (category: Category) => {
    setSelectedCategory(category);
    setShowViewModal(true);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setEditName(category.name);
    setEditDescription(category.description || '');
    setEditBaseRate(category.base_rate?.toString() || '');
    setEditIsActive(category.is_active ?? true);
    setShowEditModal(true);
  };

  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!selectedCategory) return;
    
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', selectedCategory.id);
      
      if (error) throw error;
      
      toast.success('Category deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setShowDeleteDialog(false);
    } catch (error) {
      toast.error('Failed to delete category');
    }
  };

  const saveEdit = async () => {
    if (!selectedCategory) return;
    
    try {
      await updateCategory.mutateAsync({
        id: selectedCategory.id,
        name: editName,
        description: editDescription || undefined,
        is_active: editIsActive,
      });
      
      // Update base_rate separately since hook doesn't support it
      if (editBaseRate) {
        await supabase
          .from('categories')
          .update({ base_rate: parseFloat(editBaseRate) })
          .eq('id', selectedCategory.id);
      }
      
      toast.success('Category updated successfully');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setShowEditModal(false);
    } catch (error) {
      toast.error('Failed to update category');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="page-header">
          <h1 className="page-title">Work Categories</h1>
          <p className="page-subtitle">Loading categories...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-40" />
          ))}
        </div>
      </div>
    );
  }

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

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search by name or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.map(category => {
          const tags = getTags(category);
          return (
            <Card key={category.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {category.description || 'No description'}
                    </p>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                        {tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">+{tags.length - 3}</Badge>
                        )}
                      </div>
                    )}
                  </div>
                  <StatusBadge status={category.is_active ? 'Active' : 'Inactive'} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-foreground">₹{category.base_rate || 0}</p>
                    <p className="text-xs text-muted-foreground">Base Rate</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleView(category)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleEdit(category)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(category)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          {searchTerm ? 'No categories found matching your search.' : 'No categories yet. Create your first one!'}
        </div>
      )}

      {/* View Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedCategory?.name}</DialogTitle>
            <DialogDescription>Category Details</DialogDescription>
          </DialogHeader>
          {selectedCategory && (
            <div className="space-y-4">
              <div>
                <Label className="text-muted-foreground">Description</Label>
                <p className="font-medium">{selectedCategory.description || 'No description'}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Base Rate</Label>
                <p className="font-medium text-lg">₹{selectedCategory.base_rate || 0}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Status</Label>
                <div className="mt-1">
                  <StatusBadge status={selectedCategory.is_active ? 'Active' : 'Inactive'} />
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Tags</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {getTags(selectedCategory).map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                  {getTags(selectedCategory).length === 0 && <p className="text-sm">No tags</p>}
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Created</Label>
                <p className="font-medium">{new Date(selectedCategory.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>Update category details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-rate">Base Rate (₹)</Label>
              <Input
                id="edit-rate"
                type="number"
                value={editBaseRate}
                onChange={(e) => setEditBaseRate(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Active Status</Label>
              <Switch
                checked={editIsActive}
                onCheckedChange={setEditIsActive}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button onClick={saveEdit} disabled={updateCategory.isPending}>
              {updateCategory.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedCategory?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default WorkCategories;
