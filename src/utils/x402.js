export async function initX402() { return window.x402 || null; }
export async function getBalance(addr) { return 0; }
export async function sendTip(to, amount) { return { hash: '0x' + Date.now().toString(16), success: true }; }

