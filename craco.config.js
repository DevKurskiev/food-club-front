const path = require("path");

module.exports = {
  mode: "development",
  devServer: {
    port: 8080,
  },
  webpack: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@atoms": path.resolve(__dirname, "./src/components/atoms"),
      "@molecules": path.resolve(__dirname, "./src/components/molecules/"),
      "@organisms": path.resolve(__dirname, "./src/components/organisms"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@theme": path.resolve(__dirname, "./src/theme"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
};
