const gulp = require('gulp');
const header = require('gulp-header');
const less = require("gulp-less");
const stylus = require("gulp-stylus");
const path = require("path")
const cssmin = require('gulp-cssmin');
const clean = require('gulp-clean');
const rename = require("gulp-rename");
const replace = require('gulp-replace');
const chalk = require('chalk');
const pkg = require('./package')
const banner =
  "/** \n\
  * " + pkg.version + " \n\
    * 样式文件\n\
    * By bhz\n\
    */\n";
const style = '.less' // 控制使用的样式
const SRC_PATH = './src/'
const DEST_PATH = './dist/'

const colorPrimary = chalk.green // 主色
const colorSecondary = chalk.blue // 辅助色

// 获取扩展名，包括最后的.
function getExt(path) {
  let index = path.lastIndexOf('.');
  return path.substr(index)
}

// 获取文件路径，不包括最后的/
function getPath(path) {
  let index = path.lastIndexOf('/');
  return path.substr(0, index)
}

gulp.task('init:style', function () {
  return gulp.src(['./dist/**/**.wxss'])
    .pipe(rename({
      extname: style
    }))
    .pipe(replace('.wxss', style))
    .pipe(gulp.dest(SRC_PATH))
})
gulp.task('init:xml', function () {
  return gulp.src(['./dist/**/**.wxml'])
    .pipe(rename({
      extname: ".xml"
    }))
    .pipe(gulp.dest(SRC_PATH))
})
gulp.task('init', gulp.parallel('init:style', 'init:xml', function () {
  return gulp.src(['./dist/**/**', '!./dist/**/**.wxss', '!./dist/**/**.wxml'])
    .pipe(gulp.dest(SRC_PATH))
}))

gulp.task('build:style', function () {
  return gulp.src([`./src/**/**${style}`])
    .pipe(less())
    .pipe(rename({
      extname: ".wxss"
    }))
    .pipe(replace(style, '.wxss'))
    .pipe(gulp.dest(DEST_PATH))
})
gulp.task('build:xml', function () {
  return gulp.src(['./src/**/**.xml'])
    .pipe(rename({
      extname: ".wxml"
    }))
    .pipe(gulp.dest(DEST_PATH))
})
gulp.task('build', gulp.parallel('build:style', 'build:xml', function () {
  return gulp.src(['./src/**/**', `!./src/**/**${style}`, '!./src/**/**.xml'])
    .pipe(gulp.dest(DEST_PATH))
}))

gulp.task('serve', gulp.series('build', function () {
  const watcher = gulp.watch('src/**/**');
  const configWather = gulp.watch('dist/project.config.json');
  watcher.on('change', function (path, stats) {
    path = './' + path.replace(/\\/g, '/')
    let destPath = getPath(path.replace(/^\.\/src/, './dist'))
    let extName = getExt(path)
    if (extName == style) {
      console.log(colorPrimary(path.replace(/^\.\/src/, './dist').replace(/less$/, 'wxss') + ' style generated'))
      return gulp.src(path)
        .pipe(less())
        .pipe(rename({
          extname: ".wxss"
        }))
        .pipe(replace(style, '.wxss'))
        .pipe(gulp.dest(destPath))
    } else if (extName == '.xml') {
      console.log(colorPrimary(path.replace(/^\.\/src/, './dist').replace(/xml$/, 'wxml') + ' wxml generated'))
      return gulp.src(path)
        .pipe(rename({
          extname: ".wxml"
        }))
        .pipe(gulp.dest(destPath))
    } else {
      console.log(colorSecondary(path.replace(/^\.\/src/, './dist') + ' generated'))
      return gulp.src(path)
        .pipe(gulp.dest(destPath))
    }

  })
  configWather.on('change', function (path, stats) {
    path = './' + path.replace(/\\/g, '/')
    console.log(colorPrimary(path + ' config changed'))
    let destPath = getPath(path.replace(/^\.\/dist/, './src'))
    return gulp.src(path)
      .pipe(gulp.dest(destPath))

  })
  console.log(colorPrimary('已启动监听！'))

}))

// 清空src
gulp.task('clean:src', function () {
  return gulp.src(['./src/*'])
    .pipe(clean());
})

// 清空dist
gulp.task('clean:dist', function () {
  return gulp.src(['./dist/*'])
    .pipe(clean());
})