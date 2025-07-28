import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HelpCircle, X, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from '@/components/ui/modern-card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface HelpItem {
  title: string;
  description: string;
  action?: () => void;
  external?: boolean;
  badge?: string;
}

interface PageHelp {
  title: string;
  description: string;
  quickActions: HelpItem[];
  commonQuestions: HelpItem[];
}

interface ContextualHelpProps {
  className?: string;
}

const ContextualHelp: React.FC<ContextualHelpProps> = ({ className }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Contextual help content based on current page
  const getPageHelp = (): PageHelp => {
    const pathname = location.pathname;

    const helpContent: { [key: string]: PageHelp } = {
      '/dashboard': {
        title: 'Health Dashboard Help',
        description: 'Your personal health command center with insights and quick actions.',
        quickActions: [
          {
            title: 'Book an Appointment',
            description: 'Schedule with healthcare providers',
            action: () => window.location.href = '/appointments'
          },
          {
            title: 'Order Lab Tests',
            description: 'Home sample collection available',
            action: () => window.location.href = '/labs',
            badge: 'Popular'
          },
          {
            title: 'Chat with AI Assistant',
            description: 'Get instant health guidance',
            action: () => window.location.href = '/ai-chat',
            badge: 'Free'
          }
        ],
        commonQuestions: [
          {
            title: 'How do I update my health information?',
            description: 'Go to My Profile to update personal and medical information',
            action: () => window.location.href = '/profile'
          },
          {
            title: 'What does my health score mean?',
            description: 'Learn about our health scoring system',
            external: true
          },
          {
            title: 'How to connect with family members?',
            description: 'Set up family health management',
            external: true
          }
        ]
      },
      '/appointments': {
        title: 'Appointment Booking Help',
        description: 'Schedule consultations with healthcare providers across Nigeria.',
        quickActions: [
          {
            title: 'Find Specialists Near You',
            description: 'Browse doctors by specialty and location',
            action: () => window.location.href = '/hospitals'
          },
          {
            title: 'Check Insurance Coverage',
            description: 'Verify your insurance benefits',
            action: () => window.location.href = '/insurance'
          },
          {
            title: 'Try Telemedicine',
            description: 'Virtual consultations available',
            action: () => window.location.href = '/telemedicine',
            badge: '24/7'
          }
        ],
        commonQuestions: [
          {
            title: 'How far in advance can I book?',
            description: 'Booking availability and scheduling options',
            external: true
          },
          {
            title: 'What if I need to reschedule?',
            description: 'Learn about our flexible rescheduling policy',
            external: true
          },
          {
            title: 'Are virtual consultations covered?',
            description: 'Insurance coverage for telemedicine',
            external: true
          }
        ]
      },
      '/insurance': {
        title: 'Health Insurance Help',
        description: 'Compare and manage your health insurance coverage.',
        quickActions: [
          {
            title: 'Compare Insurance Plans',
            description: 'Find the best coverage for your needs',
            action: () => window.location.reload()
          },
          {
            title: 'Check Coverage Benefits',
            description: 'Understand what\'s included in your plan',
            external: true
          },
          {
            title: 'File a Claim',
            description: 'Submit insurance claims online',
            external: true
          }
        ],
        commonQuestions: [
          {
            title: 'Which plan is right for me?',
            description: 'Guide to choosing the best insurance plan',
            external: true
          },
          {
            title: 'How do pre-existing conditions affect coverage?',
            description: 'Understanding coverage limitations',
            external: true
          },
          {
            title: 'What\'s the claims process?',
            description: 'Step-by-step guide to filing claims',
            external: true
          }
        ]
      },
      '/labs': {
        title: 'Lab Tests Help',
        description: 'Order diagnostic tests with home sample collection.',
        quickActions: [
          {
            title: 'Browse Popular Tests',
            description: 'See commonly ordered diagnostic tests',
            action: () => window.location.reload()
          },
          {
            title: 'Schedule Home Collection',
            description: 'Book sample collection at your location',
            badge: 'Convenient'
          },
          {
            title: 'View Previous Results',
            description: 'Access your test history',
            action: () => window.location.href = '/records'
          }
        ],
        commonQuestions: [
          {
            title: 'How do I prepare for tests?',
            description: 'Pre-test preparation instructions',
            external: true
          },
          {
            title: 'When will I get results?',
            description: 'Typical turnaround times for different tests',
            external: true
          },
          {
            title: 'Are results secure and private?',
            description: 'Our data protection and privacy policies',
            external: true
          }
        ]
      }
    };

    return helpContent[pathname] || {
      title: 'MeddyPal Help',
      description: 'Get help with using MeddyPal\'s health services.',
      quickActions: [
        {
          title: 'Search All Services',
          description: 'Find any health service or information',
          action: () => {} // This would trigger the unified search
        },
        {
          title: 'Contact Support',
          description: '24/7 health support available',
          external: true
        }
      ],
      commonQuestions: [
        {
          title: 'How do I get started?',
          description: 'Complete guide to using MeddyPal',
          external: true
        },
        {
          title: 'Is my data secure?',
          description: 'Learn about our security measures',
          external: true
        }
      ]
    };
  };

  const pageHelp = getPageHelp();

  return (
    <>
      {/* Help Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-40 rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-all duration-200",
          "bg-card/95 backdrop-blur-sm border-border hover:bg-card",
          "lg:bottom-8 lg:right-8",
          className
        )}
      >
        <HelpCircle className="h-5 w-5" />
        <span className="sr-only">Get Help</span>
      </Button>

      {/* Help Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Help Content */}
          <div className="fixed top-4 right-4 bottom-4 w-full max-w-md z-50">
            <ModernCard variant="glass-strong" className="h-full flex flex-col">
              <ModernCardHeader className="flex-shrink-0 pb-4">
                <div className="flex items-center justify-between">
                  <ModernCardTitle className="text-lg">{pageHelp.title}</ModernCardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {pageHelp.description}
                </p>
              </ModernCardHeader>

              <ModernCardContent className="flex-1 overflow-y-auto pt-0 space-y-6">
                {/* Quick Actions */}
                <div>
                  <h3 className="font-medium mb-3 text-sm text-foreground">Quick Actions</h3>
                  <div className="space-y-2">
                    {pageHelp.quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={action.action}
                        className="w-full flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left group"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{action.title}</span>
                            {action.badge && (
                              <Badge variant="secondary" className="text-xs">
                                {action.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {action.description}
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Common Questions */}
                <div>
                  <h3 className="font-medium mb-3 text-sm text-foreground">Common Questions</h3>
                  <div className="space-y-2">
                    {pageHelp.commonQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={question.action}
                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors text-left group"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{question.title}</span>
                            {question.external && (
                              <ExternalLink className="h-3 w-3 text-muted-foreground" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {question.description}
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Support */}
                <div className="pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => window.location.href = '/support'}
                  >
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                </div>
              </ModernCardContent>
            </ModernCard>
          </div>
        </>
      )}
    </>
  );
};

export default ContextualHelp;