import type { BMTreeNode } from '@/types/tree'

export type RegisterStorageItem = {
  register: BMTreeNode
}

export async function getRegister() {
  return await chrome.storage.local.get('register')
}

export function setRegister(item: BMTreeNode[]) {
  chrome.storage.local.set({ register: item[0] })
}
