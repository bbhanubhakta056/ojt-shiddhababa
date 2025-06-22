// stores/toast.ts
import { defineStore } from 'pinia';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
  duration: number; // in ms
}

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: [] as Toast[],
    nextId: 1
  }),
  actions: {
    trigger(message: string, type: ToastType = 'success', duration = 3000) {
      const id = this.nextId++;
      this.toasts.push({ id, message, type, duration });

      setTimeout(() => this.dismiss(id), duration);
    },
    dismiss(id: number) {
      this.toasts = this.toasts.filter(toast => toast.id !== id);
    }
  }
});
