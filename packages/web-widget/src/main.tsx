import React from 'react';
import ReactDOM from 'react-dom/client';
import { Nottery } from './components/Lottery/Nottery';

interface WidgetConfig {
  apiKey: string;
  apiUrl: string;
}

declare global {
  interface Window {
    initSdkWidget: (config: WidgetConfig) => void;
  }
}

const createWidget = (config: WidgetConfig) => {
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'sdk-widget-root';
  document.body.appendChild(widgetContainer);

  const root = ReactDOM.createRoot(widgetContainer);
  root.render(
    <React.StrictMode>
      <Nottery />
    </React.StrictMode>
  );
};

window.initSdkWidget = createWidget; 