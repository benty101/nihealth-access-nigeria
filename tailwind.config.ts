import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			// Apple-inspired Color System
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					hover: 'hsl(var(--primary-hover))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					hover: 'hsl(var(--secondary-hover))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
					hover: 'hsl(var(--muted-hover))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					hover: 'hsl(var(--accent-hover))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
					elevated: 'hsl(var(--card-elevated))',
					hover: 'hsl(var(--card-hover))'
				},
				
				// Health-specific semantic colors
				health: {
					success: 'hsl(var(--health-success))',
					warning: 'hsl(var(--health-warning))',
					danger: 'hsl(var(--health-danger))',
					info: 'hsl(var(--health-info))'
				},
				
				// Border variations
				'border-subtle': 'hsl(var(--border-subtle))',
				'border-strong': 'hsl(var(--border-strong))',
				
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},

			// Apple-style border radius system
			borderRadius: {
				xs: '4px',
				sm: 'var(--radius-sm)',
				DEFAULT: 'var(--radius)',
				md: 'var(--radius)',
				lg: 'var(--radius-lg)',
				xl: 'var(--radius-xl)',
				'2xl': '20px',
				'3xl': '24px'
			},

			// Apple-inspired spacing system (8pt grid)
			spacing: {
				'px': '1px',
				'0.5': '2px',
				'1': '4px',
				'1.5': '6px',
				'2': '8px',
				'2.5': '10px',
				'3': '12px',
				'3.5': '14px',
				'4': '16px',
				'5': '20px',
				'6': '24px',
				'7': '28px',
				'8': '32px',
				'9': '36px',
				'10': '40px',
				'11': '44px',
				'12': '48px',
				'14': '56px',
				'16': '64px',
				'18': '72px',
				'20': '80px',
				'24': '96px',
				'28': '112px',
				'32': '128px',
				'36': '144px',
				'40': '160px',
				'44': '176px',
				'48': '192px',
				'52': '208px',
				'56': '224px',
				'60': '240px',
				'64': '256px',
				'72': '288px',
				'80': '320px',
				'96': '384px'
			},

			// Typography system
			fontFamily: {
				sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
				mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace']
			},

			fontSize: {
				'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '-0.01em' }],
				'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '-0.01em' }],
				'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '-0.01em' }],
				'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
				'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.02em' }],
				'2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],
				'3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em' }],
				'4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.025em' }],
				'5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.025em' }],
				'6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.025em' }],
				'7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.025em' }],
				'8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.025em' }],
				'9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.025em' }]
			},

			// Apple-style shadows
			boxShadow: {
				'sm': 'var(--shadow-sm)',
				'DEFAULT': 'var(--shadow)',
				'md': 'var(--shadow-md)',
				'lg': 'var(--shadow-lg)',
				'xl': 'var(--shadow-xl)',
				'2xl': 'var(--shadow-2xl)',
				'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
				'none': 'none'
			},

			// Background gradients
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-health': 'var(--gradient-health)',
				'gradient-subtle': 'var(--gradient-subtle)'
			},

			// Apple-style animations & keyframes
			keyframes: {
				// Accordion animations
				'accordion-down': {
					from: { height: '0', opacity: '0' },
					to: { height: 'var(--radix-accordion-content-height)', opacity: '1' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
					to: { height: '0', opacity: '0' }
				},

				// Fade animations
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-down': {
					'0%': { opacity: '0', transform: 'translateY(-20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},

				// Scale animations
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'scale-out': {
					'0%': { opacity: '1', transform: 'scale(1)' },
					'100%': { opacity: '0', transform: 'scale(0.95)' }
				},

				// Slide animations
				'slide-in-right': {
					'0%': { opacity: '0', transform: 'translateX(100%)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'slide-in-left': {
					'0%': { opacity: '0', transform: 'translateX(-100%)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},

				// Pulse effect
				'pulse-soft': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},

				// Shimmer loading effect
				'shimmer': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},

				// Bounce with Apple easing
				'bounce-soft': {
					'0%, 100%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0,0,0.2,1)' },
					'50%': { transform: 'translateY(-4px)', animationTimingFunction: 'cubic-bezier(0.8,0,1,1)' }
				}
			},

			animation: {
				// Basic animations with Apple easing
				'accordion-down': 'accordion-down 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
				'accordion-up': 'accordion-up 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
				'fade-in': 'fade-in 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
				'fade-in-up': 'fade-in-up 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
				'fade-in-down': 'fade-in-down 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
				'scale-in': 'scale-in 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
				'scale-out': 'scale-out 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
				'slide-in-right': 'slide-in-right 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
				'slide-in-left': 'slide-in-left 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
				'pulse-soft': 'pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'shimmer': 'shimmer 1.5s infinite',
				'bounce-soft': 'bounce-soft 1s infinite'
			},

			// Apple-style timing functions
			transitionTimingFunction: {
				'apple': 'cubic-bezier(0.4, 0, 0.2, 1)',
				'apple-in': 'cubic-bezier(0.4, 0, 1, 1)',
				'apple-out': 'cubic-bezier(0, 0, 0.2, 1)',
				'apple-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
