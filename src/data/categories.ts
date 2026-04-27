export const CATEGORY_TREE = {
  Sarees: {
    'Silk Sarees': [
      'Pure Kanchipuram Silk',
      'Pure Mysore Crepe Silk',
      'Mysore Semi Crepe Silk',
      'Kanchipuram Semi Silk',
      'Dharmavaram Semi Pattu',
    ],
    'Cotton Sarees': ['Mul Cotton', 'Khadhi Cotton', 'Chettinad Cotton', 'Kanchi Cotton'],
    'Fancy Sarees': ['Semi Modal Printed', 'Tissue Sarees'],
    Special: ['Celebrity Inspired Sarees', 'Pure Silk Cotton', 'Semi Silk Cotton'],
  },
  Jewelry: {
    Jewelry: ['Necklaces', 'Earrings', 'Bangles', 'Bridal Sets', 'Temple Jewelry'],
  },
} as const;

export const CATEGORIES = Object.keys(CATEGORY_TREE) as Array<keyof typeof CATEGORY_TREE>;

export const getSubcategories = (category: string): string[] => {
  const group = (CATEGORY_TREE as Record<string, Record<string, readonly string[]>>)[category];
  if (!group) return [];
  return Object.values(group).flat();
};
