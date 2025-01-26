import React from 'react';
import ReactDOM from 'react-dom/client';
import { Nottery } from './components/Lottery/Nottery';
import { WidgetConfig } from './types';

declare global {
  interface Window {
    initSdkWidget: (config: WidgetConfig) => void;
  }
}

const createWidget = (config: WidgetConfig) => {
  console.log(config);
  const widgetContainer = document.getElementById('lottery-widget');

  if (!widgetContainer) {
    throw new Error('Widget container not found');
  }

  const root = ReactDOM.createRoot(widgetContainer);
  root.render(
    <React.StrictMode>
      <Nottery />
    </React.StrictMode>
  );
};

window.initSdkWidget = createWidget; 