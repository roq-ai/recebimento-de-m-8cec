const mapping: Record<string, string> = {
  balances: 'balance',
  divergences: 'divergence',
  goods: 'goods',
  inventories: 'inventory',
  suppliers: 'supplier',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
