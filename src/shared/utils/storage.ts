export const STORAGE_KEYS = {
  students: 'almdoun:students',
  progress: (id: string) => `almdoun:progress:${id}`,
  results: (studentId: string) => `almdoun:results:${studentId}`,
  settings: 'almdoun:settings',
  darkMode: '@almdoun_dark_mode',
} as const;
