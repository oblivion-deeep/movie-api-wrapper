import app from './app.js';

const PORT = process.env.PORT || 3000;

process.on('unhandledRejection', (reason, promise) => {
  console.error('🔥 Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception thrown:', err);
  process.exit(1); 
});

process.on('SIGTERM', () => {
  console.log('📴 Received SIGTERM. Shutting down gracefully...');
  process.exit(0);
});

process.on('exit', (code) => {
  console.log(`🛑 Process exited with code: ${code}`);
});

app.listen(PORT, () =>
  console.log(`🚀 Backend app up and running on port ${PORT}!`)
);
