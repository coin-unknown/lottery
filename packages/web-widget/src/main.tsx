import React from 'react';
import ReactDOM from 'react-dom/client';
import { Nottery } from './components/Lottery/Nottery';
import { PartnerConfig, WidgetConfig } from './types';
import classes from './styles.module.scss';
import { PartnerWidget } from './components/Partner/Widget';

declare global {
  interface Window {
    initLotteryWidget: (config: WidgetConfig) => void;
    initPartnerWidget: (config: PartnerConfig) => void;
  }
}

const createWidget = (config: WidgetConfig) => {
  const widgetContainer = document.getElementById(config.containerId);

  if (!widgetContainer) {
    throw new Error('Widget container not found');
  }

  const root = ReactDOM.createRoot(widgetContainer);
  root.render(
    <React.StrictMode>
      <Nottery className={classes.widget} config={config}/>
    </React.StrictMode>
  );
};

const createPartnerWidget = (config: PartnerConfig) => {
  const widgetContainer = document.getElementById(config.containerId);

  if (!widgetContainer) {
    throw new Error('Widget container not found');
  }

  const root = ReactDOM.createRoot(widgetContainer);
  root.render(
    <React.StrictMode>
      <PartnerWidget className={classes.widget} config={config}/>
    </React.StrictMode>
  );
}

window.initLotteryWidget = createWidget; 
window.initPartnerWidget = createPartnerWidget;