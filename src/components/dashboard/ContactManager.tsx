import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Contact } from '@/entities';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Mail, Eye, Trash2, Clock, User, MessageSquare, AlertCircle } from 'lucide-react';

const ContactManager = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ['contacts'],
    queryFn: () => Contact.list('-created_at', 50),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => Contact.update(id, data),
    onSuccess: () => {
      toast({ title: "Message updated successfully!" });
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
    onError: () => {
      toast({ title: "Failed to update message", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => Contact.delete(id),
    onSuccess: () => {
      toast({ title: "Message deleted successfully!" });
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
    onError: () => {
      toast({ title: "Failed to delete message", variant: "destructive" });
    },
  });

  const statusOptions = [
    { id: 'all', label: 'All Messages' },
    { id: 'new', label: 'New' },
    { id: 'read', label: 'Read' },
    { id: 'replied', label: 'Replied' },
  ];

  const priorityOptions = [
    { id: 'low', label: 'Low', color: 'bg-blue-500/20 text-blue-400' },
    { id: 'medium', label: 'Medium', color: 'bg-yellow-500/20 text-yellow-400' },
    { id: 'high', label: 'High', color: 'bg-red-500/20 text-red-400' },
  ];

  const filteredContacts = selectedStatus === 'all' 
    ? contacts 
    : contacts.filter(contact => contact.status === selectedStatus);

  const handleViewMessage = (contact: any) => {
    setSelectedMessage(contact);
    setIsDialogOpen(true);
    
    // Mark as read if it's new
    if (contact.status === 'new') {
      updateMutation.mutate({ 
        id: contact.id, 
        data: { ...contact, status: 'read' } 
      });
    }
  };

  const handleStatusChange = (contactId: string, newStatus: string) => {
    const contact = contacts.find(c => c.id === contactId);
    if (contact) {
      updateMutation.mutate({ 
        id: contactId, 
        data: { ...contact, status: newStatus } 
      });
    }
  };

  const handlePriorityChange = (contactId: string, newPriority: string) => {
    const contact = contacts.find(c => c.id === contactId);
    if (contact) {
      updateMutation.mutate({ 
        id: contactId, 
        data: { ...contact, priority: newPriority } 
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      deleteMutation.mutate(id);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { label: 'New', className: 'bg-green-500/20 text-green-400 border-green-500/30' },
      read: { label: 'Read', className: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
      replied: { label: 'Replied', className: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const config = priorityOptions.find(p => p.id === priority) || priorityOptions[1];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const newMessagesCount = contacts.filter(c => c.status === 'new').length;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Messages</h2>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="glass-card border-white/20 animate-pulse">
              <CardHeader>
                <div className="h-4 bg-white/10 rounded w-3/4"></div>
                <div className="h-3 bg-white/10 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-16 bg-white/10 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center">
            Messages
            {newMessagesCount > 0 && (
              <Badge className="bg-red-500 text-white ml-3">
                {newMessagesCount} new
              </Badge>
            )}
          </h2>
          <p className="text-white/60">Manage contact form submissions</p>
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex flex-wrap gap-2">
        {statusOptions.map((status) => (
          <button
            key={status.id}
            onClick={() => setSelectedStatus(status.id)}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              selectedStatus === status.id
                ? 'bg-gradient-to-r from-portfolio-primary to-portfolio-accent text-white'
                : 'glass-card text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            {status.label}
            {status.id !== 'all' && (
              <span className="ml-2 text-xs">
                ({contacts.filter(c => c.status === status.id).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredContacts.map((contact) => (
          <Card key={contact.id} className="glass-card border-white/20 hover:bg-white/10 transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-white flex items-center space-x-3">
                    <User className="w-5 h-5 text-portfolio-primary" />
                    <span>{contact.name}</span>
                    {getStatusBadge(contact.status)}
                    {getPriorityBadge(contact.priority)}
                  </CardTitle>
                  <CardDescription className="text-white/60 flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Mail className="w-4 h-4" />
                      <span>{contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatDate(contact.created_at)}</span>
                    </div>
                  </CardDescription>
                </div>
                
                <div className="flex space-x-2">
                  <Select
                    value={contact.status}
                    onValueChange={(value) => handleStatusChange(contact.id, value)}
                  >
                    <SelectTrigger className="w-24 h-8 bg-white/10 border-white/20 text-white text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="read">Read</SelectItem>
                      <SelectItem value="replied">Replied</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select
                    value={contact.priority}
                    onValueChange={(value) => handlePriorityChange(contact.id, value)}
                  >
                    <SelectTrigger className="w-20 h-8 bg-white/10 border-white/20 text-white text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleViewMessage(contact)}
                    className="text-white/60 hover:text-white h-8"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(contact.id)}
                    className="text-red-400 hover:text-red-300 h-8"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="mb-3">
                <h4 className="text-white font-medium mb-1 flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2 text-portfolio-primary" />
                  {contact.subject || 'No Subject'}
                </h4>
              </div>
              
              <p className="text-white/80 line-clamp-2">{contact.message}</p>
              
              <div className="flex justify-between items-center mt-4">
                <Button
                  size="sm"
                  onClick={() => handleViewMessage(contact)}
                  className="btn-gradient text-white"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  View Full Message
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <a href={`mailto:${contact.email}?subject=Re: ${contact.subject || 'Your message'}`}>
                    <Mail className="w-3 h-3 mr-1" />
                    Reply
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <Card className="glass-card border-white/20 text-center py-12">
          <CardContent>
            <MessageSquare className="w-12 h-12 text-white/40 mx-auto mb-4" />
            <p className="text-white/60 mb-2">
              {selectedStatus === 'all' 
                ? 'No messages yet.' 
                : `No ${selectedStatus} messages.`
              }
            </p>
            <p className="text-white/40 text-sm">
              Messages from your portfolio contact form will appear here.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Message Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="glass-morphism border-white/20 text-white max-w-2xl">
          {selectedMessage && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-portfolio-primary" />
                  <span>{selectedMessage.name}</span>
                  {getStatusBadge(selectedMessage.status)}
                  {getPriorityBadge(selectedMessage.priority)}
                </DialogTitle>
                <DialogDescription className="text-white/60">
                  <div className="flex items-center space-x-4">
                    <span>{selectedMessage.email}</span>
                    <span>•</span>
                    <span>{formatDate(selectedMessage.created_at)}</span>
                  </div>
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                {selectedMessage.subject && (
                  <div>
                    <h4 className="text-white font-medium mb-2">Subject:</h4>
                    <p className="text-white/80">{selectedMessage.subject}</p>
                  </div>
                )}
                
                <div>
                  <h4 className="text-white font-medium mb-2">Message:</h4>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="text-white/80 whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Close
                  </Button>
                  <Button
                    asChild
                    className="btn-gradient text-white"
                  >
                    <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'Your message'}`}>
                      <Mail className="w-4 h-4 mr-2" />
                      Reply via Email
                    </a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactManager;