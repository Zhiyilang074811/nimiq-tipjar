// Nimiq TipJar Mini App
import { Nq, MiniApp } from '@nimiq/mini-app-sdk';
console.log('Nimiq TipJar initialized');
const nq = new Nq();
await nq.init();
const app = new MiniApp(nq);
