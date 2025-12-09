// Dashboard Stats
export const dashboardStats = {
  totalWorkers: 2847,
  totalUsers: 4523,
  activeWorks: 156,
  pendingRequests: 89,
  cancelledWorks: 23,
  newWorkRequests: 45,
  paymentIssues: 12,
  pendingApprovals: 67,
  activeWorkers: 234,
  activeUsers: 456,
};

// Growth Data for Charts
export const monthlyGrowthData = [
  { month: 'Jan', workers: 1200, users: 2100, works: 450 },
  { month: 'Feb', workers: 1450, users: 2400, works: 520 },
  { month: 'Mar', workers: 1680, users: 2800, works: 610 },
  { month: 'Apr', workers: 1920, users: 3200, works: 720 },
  { month: 'May', workers: 2150, users: 3600, works: 850 },
  { month: 'Jun', workers: 2400, users: 4000, works: 920 },
  { month: 'Jul', workers: 2650, users: 4300, works: 1050 },
  { month: 'Aug', workers: 2847, users: 4523, works: 1180 },
];

export const categoryVolumeData = [
  { category: 'Plumbing', count: 245 },
  { category: 'Electrical', count: 189 },
  { category: 'Cleaning', count: 320 },
  { category: 'Carpentry', count: 156 },
  { category: 'Painting', count: 134 },
  { category: 'AC Repair', count: 98 },
  { category: 'Driving', count: 210 },
];

// Work Categories
export const workCategories = [
  { id: 'CAT001', name: 'Plumbing', description: 'Water and pipe related services', worksCount: 245, status: 'Active' },
  { id: 'CAT002', name: 'Electrical', description: 'Electrical repair and installation', worksCount: 189, status: 'Active' },
  { id: 'CAT003', name: 'House Cleaning', description: 'Residential cleaning services', worksCount: 320, status: 'Active' },
  { id: 'CAT004', name: 'Carpentry', description: 'Wood work and furniture', worksCount: 156, status: 'Active' },
  { id: 'CAT005', name: 'Painting', description: 'Interior and exterior painting', worksCount: 134, status: 'Active' },
  { id: 'CAT006', name: 'AC Repair', description: 'Air conditioning services', worksCount: 98, status: 'Active' },
  { id: 'CAT007', name: 'Driver Services', description: 'Personal and commercial driving', worksCount: 210, status: 'Active' },
];

// Works Data
export const worksData = [
  { id: 'WRK001', category: 'Plumbing', userName: 'Rajesh Kumar', workerName: 'Suresh M', status: 'Active', dateRequested: '2024-01-15', dueDate: '2024-01-18', mode: 'Offline', paymentStatus: 'Pending' },
  { id: 'WRK002', category: 'Electrical', userName: 'Priya Nair', workerName: 'Anil K', status: 'Completed', dateRequested: '2024-01-14', dueDate: '2024-01-16', mode: 'Offline', paymentStatus: 'Paid' },
  { id: 'WRK003', category: 'Cleaning', userName: 'Mohammed Ali', workerName: 'Lakshmi P', status: 'Pending', dateRequested: '2024-01-16', dueDate: '2024-01-19', mode: 'Offline', paymentStatus: 'Pending' },
  { id: 'WRK004', category: 'AC Repair', userName: 'Deepa Thomas', workerName: 'Unassigned', status: 'New', dateRequested: '2024-01-17', dueDate: '2024-01-20', mode: 'Offline', paymentStatus: 'Pending' },
  { id: 'WRK005', category: 'Carpentry', userName: 'Sanjay Menon', workerName: 'Rajan V', status: 'Active', dateRequested: '2024-01-13', dueDate: '2024-01-17', mode: 'Offline', paymentStatus: 'Partial' },
  { id: 'WRK006', category: 'Painting', userName: 'Anitha R', workerName: 'Babu S', status: 'Cancelled', dateRequested: '2024-01-12', dueDate: '2024-01-15', mode: 'Offline', paymentStatus: 'Refunded' },
  { id: 'WRK007', category: 'Driver', userName: 'George Paul', workerName: 'Krishnan M', status: 'Completed', dateRequested: '2024-01-11', dueDate: '2024-01-11', mode: 'Offline', paymentStatus: 'Paid' },
  { id: 'WRK008', category: 'Plumbing', userName: 'Fathima S', workerName: 'Unassigned', status: 'New', dateRequested: '2024-01-17', dueDate: '2024-01-20', mode: 'Offline', paymentStatus: 'Pending' },
];

// Worker Approvals
export const pendingWorkerApprovals = [
  { id: 'WKR001', name: 'Ajith Kumar', phone: '+91 9876543210', skills: ['Plumbing', 'Pipe Fitting'], documents: 3, status: 'Pending', submittedDate: '2024-01-15' },
  { id: 'WKR002', name: 'Bindu R', phone: '+91 9876543211', skills: ['House Cleaning'], documents: 2, status: 'Pending', submittedDate: '2024-01-14' },
  { id: 'WKR003', name: 'Chandran M', phone: '+91 9876543212', skills: ['Electrical', 'Wiring'], documents: 4, status: 'Pending', submittedDate: '2024-01-13' },
  { id: 'WKR004', name: 'Divya S', phone: '+91 9876543213', skills: ['Cooking', 'Cleaning'], documents: 2, status: 'Pending', submittedDate: '2024-01-12' },
  { id: 'WKR005', name: 'Eapen Thomas', phone: '+91 9876543214', skills: ['Carpentry'], documents: 3, status: 'Pending', submittedDate: '2024-01-11' },
];

// Profiles Data
export const profilesData = [
  { id: 'USR001', name: 'Rajesh Kumar', role: 'Employer', phone: '+91 9876543220', email: 'rajesh@email.com', status: 'Active', avatar: null },
  { id: 'USR002', name: 'Suresh M', role: 'Worker', phone: '+91 9876543221', email: 'suresh@email.com', status: 'Active', avatar: null },
  { id: 'USR003', name: 'Priya Nair', role: 'Employer', phone: '+91 9876543222', email: 'priya@email.com', status: 'Active', avatar: null },
  { id: 'USR004', name: 'Anil K', role: 'Worker', phone: '+91 9876543223', email: 'anil@email.com', status: 'Suspended', avatar: null },
  { id: 'USR005', name: 'Lakshmi P', role: 'Worker', phone: '+91 9876543224', email: 'lakshmi@email.com', status: 'Active', avatar: null },
  { id: 'USR006', name: 'Mohammed Ali', role: 'Employer', phone: '+91 9876543225', email: 'ali@email.com', status: 'Active', avatar: null },
  { id: 'USR007', name: 'Deepa Thomas', role: 'Employer', phone: '+91 9876543226', email: 'deepa@email.com', status: 'Banned', avatar: null },
  { id: 'USR008', name: 'Rajan V', role: 'Worker', phone: '+91 9876543227', email: 'rajan@email.com', status: 'Active', avatar: null },
];

// Payments Data
export const paymentsData = [
  { id: 'PAY001', workId: 'WRK002', user: 'Priya Nair', worker: 'Anil K', amount: 1500, method: 'UPI', status: 'Completed', date: '2024-01-16' },
  { id: 'PAY002', workId: 'WRK007', user: 'George Paul', worker: 'Krishnan M', amount: 2000, method: 'Bank', status: 'Completed', date: '2024-01-11' },
  { id: 'PAY003', workId: 'WRK001', user: 'Rajesh Kumar', worker: 'Suresh M', amount: 1200, method: 'UPI', status: 'Pending', date: '2024-01-17' },
  { id: 'PAY004', workId: 'WRK006', user: 'Anitha R', worker: 'Babu S', amount: 3000, method: 'Bank', status: 'Refunded', date: '2024-01-15' },
  { id: 'PAY005', workId: 'WRK005', user: 'Sanjay Menon', worker: 'Rajan V', amount: 5000, method: 'UPI', status: 'Partial', date: '2024-01-14' },
];

// Notifications
export const notificationsData = [
  { id: 'NOT001', type: 'payment', title: 'Payment Failed', message: 'Payment transfer to Anil K failed', time: '2 hours ago', read: false },
  { id: 'NOT002', type: 'work', title: 'Work Cancelled', message: 'Work WRK006 was cancelled by user', time: '5 hours ago', read: false },
  { id: 'NOT003', type: 'approval', title: 'New Worker Registration', message: 'Ajith Kumar submitted documents for approval', time: '1 day ago', read: true },
  { id: 'NOT004', type: 'system', title: 'System Maintenance', message: 'Scheduled maintenance on Jan 20', time: '2 days ago', read: true },
  { id: 'NOT005', type: 'payment', title: 'Payout Completed', message: 'Successfully transferred ₹15,000 to workers', time: '3 days ago', read: true },
];

// Reports Data
export const reportsData = [
  { id: 'RPT001', type: 'Complaint', reporter: 'Rajesh Kumar', category: 'Service Quality', severity: 'High', date: '2024-01-16', status: 'Open' },
  { id: 'RPT002', type: 'Feedback', reporter: 'Priya Nair', category: 'App Experience', severity: 'Low', date: '2024-01-15', status: 'Resolved' },
  { id: 'RPT003', type: 'Complaint', reporter: 'Mohammed Ali', category: 'Worker Behavior', severity: 'Medium', date: '2024-01-14', status: 'In Review' },
  { id: 'RPT004', type: 'System', reporter: 'Admin', category: 'Technical Issue', severity: 'Critical', date: '2024-01-13', status: 'Open' },
  { id: 'RPT005', type: 'Feedback', reporter: 'Deepa Thomas', category: 'Payment Process', severity: 'Medium', date: '2024-01-12', status: 'Resolved' },
];

// Analytics Data
export const revenueData = [
  { month: 'Jan', revenue: 125000, payouts: 95000 },
  { month: 'Feb', revenue: 145000, payouts: 110000 },
  { month: 'Mar', revenue: 168000, payouts: 128000 },
  { month: 'Apr', revenue: 192000, payouts: 145000 },
  { month: 'May', revenue: 215000, payouts: 162000 },
  { month: 'Jun', revenue: 240000, payouts: 180000 },
  { month: 'Jul', revenue: 265000, payouts: 198000 },
  { month: 'Aug', revenue: 285000, payouts: 215000 },
];

// Admin Staff
export const adminStaff = [
  { id: 'ADM001', name: 'Super Admin', email: 'admin@jobservice.com', role: 'Super Admin', status: 'Active', lastLogin: '2024-01-17 09:30' },
  { id: 'ADM002', name: 'Operations Manager', email: 'ops@jobservice.com', role: 'Operations', status: 'Active', lastLogin: '2024-01-17 08:45' },
  { id: 'ADM003', name: 'Finance Admin', email: 'finance@jobservice.com', role: 'Finance', status: 'Active', lastLogin: '2024-01-16 17:20' },
  { id: 'ADM004', name: 'Support Staff', email: 'support@jobservice.com', role: 'Support', status: 'Inactive', lastLogin: '2024-01-10 14:00' },
];

// Recent Activity
export const recentActivity = [
  { id: 1, action: 'New worker registration', user: 'Ajith Kumar', time: '10 minutes ago', type: 'registration' },
  { id: 2, action: 'Work completed', user: 'Priya Nair', time: '25 minutes ago', type: 'work' },
  { id: 3, action: 'Payment processed', user: 'George Paul', time: '1 hour ago', type: 'payment' },
  { id: 4, action: 'Work cancelled', user: 'Anitha R', time: '2 hours ago', type: 'cancellation' },
  { id: 5, action: 'Document uploaded', user: 'Chandran M', time: '3 hours ago', type: 'document' },
  { id: 6, action: 'New work request', user: 'Fathima S', time: '4 hours ago', type: 'work' },
];
