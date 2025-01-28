import React from 'react';
import ReactDOM from 'react-dom/client';
import { Nottery } from './components/Lottery/Nottery';
import { WidgetConfig } from './types';
import classes from './styles.module.scss';

declare global {
  interface Window {
    initLotteryWidget: (config: WidgetConfig) => void;
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

window.initLotteryWidget = createWidget; 