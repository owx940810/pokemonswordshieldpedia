const gulp = require('gulp')

const { parallel, series, task, src, dest, watch, lastRun } = gulp

task('build:index.html', () => {
  return src('src/index.html')
    .pipe(dest('dist/'))
})

task('build:assets', () => {
  return src('src/assets/**')
    .pipe(dest('dist/assets/'))
})

task('build', parallel('build:index.html', 'build:assets'))
task('default', parallel('build'))

task('watch:html', () => watch('src/index.html', parallel('build:index.html')))
task('watch:assets', () => watch('src/assets/**', parallel('build:assets')))

task('watch', parallel('watch:html', 'watch:assets'))
