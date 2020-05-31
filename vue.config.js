module.exports = {
  devServer: {
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'http://localhost:8080',
      },
    },
    host: 'localhost',
    port: 8081,
  },
};
