
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.9de33661f63445818c30f8c31daecec0',
  appName: 'Wellbeing Support',
  webDir: 'dist',
  server: {
    url: 'https://9de33661-f634-4581-8c30-f8c31daecec0.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    }
  }
};

export default config;
