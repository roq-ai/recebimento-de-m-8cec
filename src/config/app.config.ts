interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: [],
  tenantRoles: ['Business Owner', 'Inventory Manager', 'Goods Receiver'],
  tenantName: 'Supplier',
  applicationName: 'RECEBIMENTO DE MERCADORIA',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: [
    'Register business',
    'Invite Inventory Managers and Goods Receivers',
    'Manage suppliers',
    'View balance implementation for each supplier',
    'View analysis of item divergences for each supplier',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/2bea7250-7c43-4bf6-a54d-4accc4cc2323',
};
