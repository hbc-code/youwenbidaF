//?配置具体的修改规则
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
} = require("customize-cra");

const { resolve } = require('path')

function pathResolve(pathUrl) {
  return resolve(__dirname, pathUrl);
}

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#30CB88" },
  }),
  addWebpackAlias({
    //?  别名： 绝对路径
    "@": pathResolve("./src"),
  })
);
