import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface CustomField {
  id: string;
  label: string;
  type: string;
  required: boolean;
  options?: string[];
}

const CreateCategory = () => {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [requirePayment, setRequirePayment] = useState(false);

  const prebuiltQuestions = [
    { id: 'problem_desc', label: 'Describe the problem', type: 'textarea' },
    { id: 'urgency', label: 'How urgent is this?', type: 'radio', options: ['Emergency', 'Within 24 hours', 'Within a week', 'Flexible'] },
    { id: 'property_type', label: 'Property Type', type: 'radio', options: ['Residential', 'Commercial', 'Industrial'] },
    { id: 'photos', label: 'Upload photos of the issue', type: 'file' },
    { id: 'preferred_time', label: 'Preferred time slot', type: 'radio', options: ['Morning', 'Afternoon', 'Evening'] },
  ];

  const addCustomField = () => {
    setCustomFields([
      ...customFields,
      { id: `field_${Date.now()}`, label: '', type: 'text', required: false },
    ]);
  };

  const updateField = (id: string, updates: Partial<CustomField>) => {
    setCustomFields(fields =>
      fields.map(f => (f.id === id ? { ...f, ...updates } : f))
    );
  };

  const removeField = (id: string) => {
    setCustomFields(fields => fields.filter(f => f.id !== id));
  };

  const togglePrebuiltQuestion = (question: typeof prebuiltQuestions[0]) => {
    const exists = customFields.find(f => f.id === question.id);
    if (exists) {
      removeField(question.id);
    } else {
      setCustomFields([
        ...customFields,
        { ...question, required: true },
      ]);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="page-title">Create Work Category</h1>
          <p className="page-subtitle">Define a new job type with custom fields and questions</p>
        </div>
      </div>

      {/* Basic Details */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              placeholder="e.g., Plumbing, Electrical, Cleaning"
              value={categoryName}
              onChange={e => setCategoryName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of this service category"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Pre-built Questions */}
      <Card>
        <CardHeader>
          <CardTitle>Pre-built Questions</CardTitle>
          <p className="text-sm text-muted-foreground">Select common questions to include</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {prebuiltQuestions.map(question => (
              <div key={question.id} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                <Checkbox
                  id={question.id}
                  checked={customFields.some(f => f.id === question.id)}
                  onCheckedChange={() => togglePrebuiltQuestion(question)}
                />
                <label htmlFor={question.id} className="flex-1 cursor-pointer">
                  <p className="text-sm font-medium">{question.label}</p>
                  <p className="text-xs text-muted-foreground">Type: {question.type}</p>
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custom Fields Builder */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Custom Fields</CardTitle>
            <p className="text-sm text-muted-foreground">Add additional questions for this category</p>
          </div>
          <Button onClick={addCustomField}>
            <Plus className="w-4 h-4 mr-2" />
            Add Field
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {customFields.filter(f => !prebuiltQuestions.some(p => p.id === f.id)).map((field, index) => (
            <div key={field.id} className="flex items-start gap-3 p-4 border border-border rounded-lg bg-muted/30">
              <GripVertical className="w-5 h-5 text-muted-foreground mt-2 cursor-move" />
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Field Label</Label>
                  <Input
                    placeholder="Question text"
                    value={field.label}
                    onChange={e => updateField(field.id, { label: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Field Type</Label>
                  <Select
                    value={field.type}
                    onValueChange={value => updateField(field.id, { type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="textarea">Multiline Text</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="radio">Radio (Single Select)</SelectItem>
                      <SelectItem value="checkbox">Checkbox (Multi Select)</SelectItem>
                      <SelectItem value="file">File Upload</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={field.required}
                      onCheckedChange={checked => updateField(field.id, { required: checked })}
                    />
                    <Label className="text-sm">Required</Label>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => removeField(field.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {customFields.filter(f => !prebuiltQuestions.some(p => p.id === f.id)).length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No custom fields added yet. Click "Add Field" to create one.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Require Pre-payment</p>
              <p className="text-sm text-muted-foreground">Users must pay before work is assigned</p>
            </div>
            <Switch checked={requirePayment} onCheckedChange={setRequirePayment} />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3 justify-end">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button variant="outline">
          Preview
        </Button>
        <Button>
          Save Category
        </Button>
      </div>
    </div>
  );
};

export default CreateCategory;
