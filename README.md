## 小程序代码自动打包脚手架

### what'this?

- 优化小程序的开发体验，为什么不考虑`wepy`，`mpvue`, because就目前而言，`wepy`、`mpvue`的坑还是很多的，谁踩谁知道，换句话说，还不够成熟...，小程序的新功能还在完善，增加的新功能就目前而言，`wepy`,`mpvue`可能很难支持
- 小程序本身就是组件化的开发方式，本身的开发方式还可以，入门成本并不高
- 基于上面的一些考虑，结合实际开发，尝试写了这个工具

### 解决了什么问题?

- 使用`Less`写样式，减少了样式的维护成本
- 可以`npm` 安装代码依赖，手动拷贝到`src`下面的自定义目录，开发者自己尝试
- 可以考虑相关依赖，增加代码的风格检查等，开发者自己尝试

### 正确的打开方式

- 第一步`npm install`安装依赖

- 第二步，复制你的小程序代码到dist目录下面

- 第三步，执行`npm run init`, 初始化由dist目录生成的src源代码（主要就是把原小程序的wxss文件转为less文件，把wxml改为xml）

- 第四步, 执行`npm run clean`, 删除掉dist目录的原有小程序代码

- 第五步, 执行`npm run serve`, 由src的代码重新生成小程序代码到dist目录，并监听src下文件的变动，
如果是less文件变动的话，会转化为wxss输出，xml的话会重命名为wxml输出，同时考虑到小程序的开发者工具会上的某些
操作会改变project.config.json的内容，所以同时监听了dist/project.config.json文件的变动输出到src/project.config.json中，
保证src的代码是最新的

- 第六步 打开微信小程序开发者工具，新建项目，把dist目录作为项目代码目录打开，ok

### 备忘： windows 下创建.gitkeep

- `type NUL > .gitkeep`
- 这段代码的意思就是创建一个空文件重定向到名为.gitkeep的文件中.