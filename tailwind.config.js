
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(240, 70%, 50%)',
        accent: 'hsl(180, 70%, 50%)',
        bg: 'hsl(220, 20%, 98%)',
        surface: 'hsl(220, 20%, 100%)',
        'text-primary': 'hsl(220, 20%, 15%)',
        'text-secondary': 'hsl(220, 20%, 40%)',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
      },
      spacing: {
        sm: '8px',
        md: '12px',
        lg: '20px',
      },
      boxShadow: {
        card: '0 4px 12px hsla(220, 20%, 10%, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.22,1,0.36,1)',
        'slide-up': 'slideUp 0.25s cubic-bezier(0.22,1,0.36,1)',
        'bounce-scale': 'bounceScale 0.15s cubic-bezier(0.22,1,0.36,1)',
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '250ms',
      },
      transitionTimingFunction: {
        'default': 'cubic-bezier(0.22,1,0.36,1)',
      },
    },
  },
  plugins: [],
}
