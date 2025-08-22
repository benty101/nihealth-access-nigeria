import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight } from 'lucide-react';

const navigationMenuVariants = cva(
  [
    'flex flex-col w-full bg-white border-r border-neutral-200',
    'transition-all duration-300 ease-in-out',
  ],
  {
    variants: {
      variant: {
        default: 'bg-white border-neutral-200',
        glass: 'bg-white/80 backdrop-blur-md border-white/20',
        dark: 'bg-neutral-900 border-neutral-800 text-white',
      },
      size: {
        compact: 'w-16',
        default: 'w-64',
        wide: 'w-80',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const navigationItemVariants = cva(
  [
    'flex items-center gap-3 px-4 py-3 text-sm font-medium',
    'transition-all duration-200 ease-in-out rounded-md mx-2',
    'hover:bg-primary-50 hover:text-primary-700',
    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
  ],
  {
    variants: {
      active: {
        true: [
          'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-sm',
          'hover:from-primary-600 hover:to-primary-700',
        ],
        false: 'text-neutral-600',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed hover:bg-transparent hover:text-neutral-600',
        false: '',
      },
    },
    defaultVariants: {
      active: false,
      disabled: false,
    },
  }
);

const navigationSectionVariants = cva(
  [
    'px-4 py-2 text-xs font-semibold uppercase tracking-wider',
    'text-neutral-500 border-b border-neutral-100',
  ]
);

export interface NavigationItem {
  id: string;
  label: string;
  path?: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  disabled?: boolean;
  external?: boolean;
  onClick?: () => void;
  children?: NavigationItem[];
}

export interface NavigationSection {
  id: string;
  label: string;
  items: NavigationItem[];
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

export interface NavigationMenuProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof navigationMenuVariants> {
  sections: NavigationSection[];
  compact?: boolean;
  onItemClick?: (item: NavigationItem) => void;
}

const NavigationMenu = React.forwardRef<HTMLDivElement, NavigationMenuProps>(
  (
    {
      className,
      variant,
      size,
      sections,
      compact = false,
      onItemClick,
      ...props
    },
    ref
  ) => {
    const location = useLocation();
    const [expandedSections, setExpandedSections] = useState<string[]>(
      sections
        .filter((section) => section.defaultExpanded)
        .map((section) => section.id)
    );

    const toggleSection = (sectionId: string) => {
      setExpandedSections((prev) =>
        prev.includes(sectionId)
          ? prev.filter((id) => id !== sectionId)
          : [...prev, sectionId]
      );
    };

    const isActive = (path?: string) => {
      if (!path) return false;
      return location.pathname === path;
    };

    const renderNavigationItem = (item: NavigationItem, depth = 0) => {
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = expandedSections.includes(item.id);
      const active = isActive(item.path);

      if (hasChildren) {
        return (
          <div key={item.id} className="space-y-1">
            <button
              onClick={() => toggleSection(item.id)}
              className={cn(
                navigationItemVariants({ active: false, disabled: item.disabled }),
                'w-full justify-between',
                depth > 0 && 'ml-4'
              )}
              disabled={item.disabled}
            >
              <div className="flex items-center gap-3">
                {item.icon && (
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                )}
                {!compact && <span>{item.label}</span>}
              </div>
              {!compact && (
                <ChevronRight
                  className={cn(
                    'h-4 w-4 transition-transform',
                    isExpanded && 'rotate-90'
                  )}
                />
              )}
            </button>
            {isExpanded && !compact && (
              <div className="space-y-1 ml-2">
                {item.children.map((child) =>
                  renderNavigationItem(child, depth + 1)
                )}
              </div>
            )}
          </div>
        );
      }

      const Component = item.path ? NavLink : 'button';
      const componentProps = item.path
        ? { to: item.path, target: item.external ? '_blank' : undefined }
        : { onClick: () => item.onClick?.() };

      return (
        <Component
          key={item.id}
          {...componentProps}
          className={cn(
            navigationItemVariants({ active, disabled: item.disabled }),
            depth > 0 && 'ml-4'
          )}
          disabled={item.disabled}
          onClick={() => {
            onItemClick?.(item);
            item.onClick?.();
          }}
        >
          {item.icon && (
            <item.icon
              className={cn(
                'h-5 w-5 flex-shrink-0',
                active ? 'text-white' : 'text-neutral-500'
              )}
            />
          )}
          {!compact && (
            <div className="flex-1 flex items-center justify-between">
              <span>{item.label}</span>
              {item.badge && (
                <span className="px-2 py-0.5 text-xs bg-primary-100 text-primary-700 rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
          )}
        </Component>
      );
    };

    return (
      <nav
        ref={ref}
        className={cn(
          navigationMenuVariants({ variant, size: compact ? 'compact' : size, className })
        )}
        {...props}
      >
        <div className="flex-1 overflow-y-auto py-4">
          {sections.map((section) => {
            const isExpanded = expandedSections.includes(section.id);

            return (
              <div key={section.id} className="mb-6">
                {!compact && (
                  <div className="flex items-center justify-between px-4 py-2">
                    <h3 className={cn(navigationSectionVariants())}>
                      {section.label}
                    </h3>
                    {section.collapsible && (
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="p-1 hover:bg-neutral-100 rounded"
                      >
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 transition-transform text-neutral-400',
                            isExpanded && 'rotate-180'
                          )}
                        />
                      </button>
                    )}
                  </div>
                )}

                {(isExpanded || !section.collapsible) && (
                  <div className="space-y-1">
                    {section.items.map((item) => renderNavigationItem(item))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    );
  }
);

NavigationMenu.displayName = 'NavigationMenu';

// Specialized health navigation menu
const HealthNavigationMenu = React.forwardRef<
  HTMLDivElement,
  Omit<NavigationMenuProps, 'sections'> & {
    userRole?: 'patient' | 'doctor' | 'admin';
    healthStatus?: 'excellent' | 'good' | 'fair' | 'poor';
  }
>(({ userRole = 'patient', healthStatus = 'good', ...props }, ref) => {
  // This would be dynamically generated based on user role and health status
  const sections: NavigationSection[] = [
    {
      id: 'my-health',
      label: 'My Health',
      defaultExpanded: true,
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          path: '/dashboard',
          badge: healthStatus === 'poor' ? 'Alert' : undefined,
        },
        {
          id: 'records',
          label: 'Medical Records',
          path: '/records',
        },
        {
          id: 'timeline',
          label: 'Health Timeline',
          path: '/timeline',
        },
      ],
    },
    // Add more sections based on role
  ];

  return <NavigationMenu ref={ref} sections={sections} {...props} />;
});

HealthNavigationMenu.displayName = 'HealthNavigationMenu';

export { NavigationMenu, HealthNavigationMenu };