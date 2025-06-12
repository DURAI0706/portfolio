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
    <section id="contact" className="relative z-10 py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Get In Touch
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6 text-blue-900">
            <h3 className="text-2xl font-semibold mb-8">Let's Connect</h3>

            <div className="space-y-5">
              {[
                {
                  icon: 'fas fa-envelope',
                  label: 'Email',
                  value: PERSONAL_INFO.email
                },
                {
                  icon: 'fas fa-phone',
                  label: 'Phone',
                  value: PERSONAL_INFO.phone
                },
                {
                  icon: 'fas fa-map-marker-alt',
                  label: 'Location',
                  value: PERSONAL_INFO.location
                }
              ].map((info, idx) => (
                <div key={idx} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/40 border border-white/60 shadow-inner rounded-lg flex items-center justify-center text-blue-700">
                    <i className={`${info.icon} text-lg`}></i>
                  </div>
                  <div>
                    <p className="font-semibold">{info.label}</p>
                    <p className="text-blue-700">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <h4 className="font-semibold mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {[
                  { href: PERSONAL_INFO.github, icon: 'fab fa-github' },
                  { href: PERSONAL_INFO.linkedin, icon: 'fab fa-linkedin' },
                  { href: PERSONAL_INFO.medium, icon: 'fab fa-medium' }
                ].map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/40 border border-white/60 rounded-lg flex items-center justify-center hover:bg-cyan-300/30 text-blue-800 hover:text-blue-900 transition-all duration-300"
                  >
                    <i className={`${link.icon} text-xl`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/40 backdrop-blur-lg shadow-xl border border-white/60 rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6 text-blue-900">
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3 bg-white/60 text-blue-900 placeholder:text-blue-500 border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 bg-white/60 text-blue-900 placeholder:text-blue-500 border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Subject</label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Collaboration"
                  required
                  className="w-full px-4 py-3 bg-white/60 text-blue-900 placeholder:text-blue-500 border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell me about your project..."
                  required
                  className="w-full px-4 py-3 bg-white/60 text-blue-900 placeholder:text-blue-500 border border-white/50 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-300"
                />
              </div>

              <Button
                type="submit"
                disabled={contactMutation.isPending}
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50"
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
