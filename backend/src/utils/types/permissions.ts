export type GRUD = 'c' | 'r' | 'u' | 'd';
export type RNG = 'all' | 'own' | 'none';
export type PermissionType = {
  menus: {
    dashboard: boolean;
    employees: [boolean, GRUD];
    reports: Array<GRUD> | null;
    settings: Array<GRUD> | null;
  };

  kpiInfo: [RNG, GRUD];
  salaryInfo: [RNG, GRUD];
  ladderInfo: [RNG, GRUD];
  profile: [RNG, GRUD];
};

export const defaultPermissions: PermissionType = {
  menus: { dashboard: false, employees: [false, 'r'], reports: [], settings: [] },
  kpiInfo: ['own', 'r'],
  salaryInfo: ['own', 'r'],
  ladderInfo: ['own', 'r'],
  profile: ['own', 'r'],
};
