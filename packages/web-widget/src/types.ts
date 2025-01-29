export type WidgetConfig = {
  containerId: string;
  refferalWallet: string;
  className?: string;
  onConnected?: () => void;
};
export type PartnerConfig = {
  containerId: string;
};
export type TabType = {
  id: string;
  title: string;
};