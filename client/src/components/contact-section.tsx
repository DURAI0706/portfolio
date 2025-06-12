import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PERSONAL_INFO } from '@/lib/constants';
import type { InsertContact } from '@shared/schema';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to send message');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="relative z-10 py-20 px-6 bg-white/5">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-mono font-bold text-center mb-16">
          Get In <span className="cyber-blue">Touch</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-8">Let's Connect</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[hsl(var(--cyber-blue))]/20 rounded-lg flex items-center justify-center">
                  <i className="fas fa-envelope cyber-blue"></i>
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-400">{PERSONAL_INFO.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[hsl(var(--cyber-blue))]/20 rounded-lg flex items-center justify-center">
                  <i className="fas fa-phone cyber-blue"></i>
                </div>
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-gray-400">{PERSONAL_INFO.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[hsl(var(--cyber-blue))]/20 rounded-lg flex items-center justify-center">
                  <i className="fas fa-map-marker-alt cyber-blue"></i>
                </div>
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-gray-400">{PERSONAL_INFO.location}</p>
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="pt-8">
              <h4 className="font-semibold mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                <a 
                  href={PERSONAL_INFO.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[hsl(var(--cyber-blue))]/20 hover:text-[hsl(var(--cyber-blue))] transition-all duration-300"
                >
                  <i className="fab fa-github text-xl"></i>
                </a>
                <a 
                  href={PERSONAL_INFO.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[hsl(var(--cyber-blue))]/20 hover:text-[hsl(var(--cyber-blue))] transition-all duration-300"
                >
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
                <a 
                  href={PERSONAL_INFO.medium} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[hsl(var(--cyber-blue))]/20 hover:text-[hsl(var(--cyber-blue))] transition-all duration-300"
                >
                  <i className="fab fa-medium text-xl"></i>
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-[hsl(var(--cyber-blue))] focus:outline-none transition-colors text-white placeholder:text-gray-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-[hsl(var(--cyber-blue))] focus:outline-none transition-colors text-white placeholder:text-gray-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Subject</label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project collaboration"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-[hsl(var(--cyber-blue))] focus:outline-none transition-colors text-white placeholder:text-gray-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-[hsl(var(--cyber-blue))] focus:outline-none transition-colors resize-none text-white placeholder:text-gray-400"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={contactMutation.isPending}
                className="w-full px-6 py-3 bg-[hsl(var(--cyber-blue))] text-white font-semibold rounded-lg hover:bg-cyan-400 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {contactMutation.isPending ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
