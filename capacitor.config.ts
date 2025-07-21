import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.5f93396244ab48f9bee6013ccda878ec',
  appName: 'macro-balance-buddy',
  webDir: 'dist',
  server: {
    url: 'https://5f933962-44ab-48f9-bee6-013ccda878ec.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  bundledWebRuntime: false
};

export default config;