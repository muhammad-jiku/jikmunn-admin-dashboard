import { Server } from 'http';

process.on('uncaughtException', (error) => {
  console.error(error);
  process.exit(1);
});

let server: Server;
