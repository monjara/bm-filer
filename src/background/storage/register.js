export async function getRegister() {
  return await chrome.storage.local.get('register')
}

export function setRegister(item) {
  chrome.storage.local.set({ register: item[0] })
}
