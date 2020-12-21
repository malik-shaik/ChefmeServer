const { dbConnection } = require('./src/Database');
const { PORT } = require('./src/Config');
const server = require('./src/app');

// const port = PORT || 5550;
const port = process.env.PORT || 5000;

const connectServer = async () => {
  try {
    if (!(await dbConnection())) throw new Error('‼️ Server Error ‼️');
    server.listen(port, () =>
      console.log(`🚀🚀... Server Running on port:${port} ... 🚀🚀`)
    );
  } catch (error) {
    console.log(error.message);
  }
};

connectServer();
