export const menuItems = [
  { label: 'Overview', value: 'overview', icon: 'overview' },
  { label: 'Settlement History', value: 'settlement-history', icon: 'settlement-history' },
  { label: 'Refund History', value: 'refund-history', icon: 'refund-history' },
  { label: 'Reports', value: 'reports', icon: 'reports' }
]

export const supportMenuItems = [
  { label: 'Support', value: 'support', icon: 'support' },
  { label: 'User Guide', value: 'user-guide', icon: 'user-guide' }
]

export const menuItemsMap = menuItems.reduce((menuItemsMap, item) => {
  menuItemsMap[item.value] = item.label
  return menuItemsMap
}, {})
