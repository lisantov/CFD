import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Role } from '@/utils/type.ts'

export const useRolesStore = defineStore('roles', () => {
  const roles = ref<Role[]>([
    {
      id: 0,
      name: 'Frontend',
    },
    {
      id: 1,
      name: 'Backend',
    },
    {
      id: 2,
      name: 'Аналитик',
    },
    {
      id: 3,
      name: 'Тестировщик',
    },
    {
      id: 4,
      name: 'Дизайнер',
    },
  ]);

  return { roles };
})
