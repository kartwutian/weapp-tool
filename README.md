## 小程序代码自动打包脚手架

### 正确的打开方式

- 第一步`npm install`安装依赖
- 第二步，复制你的小程序代码到dist目录下面
- 第三步，执行`npm run init`, 初始化由dist目录生成的src源代码（主要就是把原小程序的wxss文件转为less文件，把wxml改为xml）
- 第四步, 执行`npm run clean`, 删除掉dist目录的原有小程序代码
- 第五步, 执行`npm run serve`, 由src的代码重新生成小程序代码到dist目录，并监听src下文件的变动，
如果是less文件变动的话，会转化为wxss输出，xml的话会重命名为wxml输出，同时考虑到小程序的开发者工具会上的某些
操作会改变project.config.json的内容，所以同时监听了dist/project.config.json文件的变动输出到src/project.config.json中，
保证src的代码是最新的
- 第五步 打开微信小程序开发者工具，新建项目，把dist目录作为项目代码目录打开，ok