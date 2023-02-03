const path = require("path");

module.exports = {
  mode: "development",
  devServer: {
    port: 8080,
  },
  webpack: {
    alias: {
      "@molecules": path.resolve(__dirname, "./src/components/molecules/"),
      "@organisms": path.resolve(__dirname, "./src/components/organisms"),
      "@helpers": path.resolve(__dirname, "./src/helpers"),
      "@atoms": path.resolve(__dirname, "./src/components/atoms"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@theme": path.resolve(__dirname, "./src/theme"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@api": path.resolve(__dirname, "./src/api"),
    },
  },
};
