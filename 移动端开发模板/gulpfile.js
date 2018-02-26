
var gulp = require('gulp'),
    browserSync = require('browser-sync').create(), //之前一直在用Gulp开发项目，每次编写完Sass后还要用按F5刷新页面看效果，想想也是够傻的，这么好用的东西竟然现在才开始用。
//BrowserSync可以【同时同步刷新多个浏览器，更神奇的是你在一个浏览器中滚动页面、点击按钮、输入框中输入信息等用户行为也会同步到每个浏览器中】。
    reload = browserSync.reload,
    del = require('del'), // 删除（用del代替gulp-clean）
    tmodjs = require('gulp-tmod'),
    sass = require('gulp-sass'), // compile your sass files 用来编译sass文件
    autoprefixer = require('gulp-autoprefixer'), //使用gulp-autoprefixer根据设置浏览器版本自动处理浏览器前缀。使用它我们可以很潇洒的写代码【特别是开发移动端页面时，就能充分体现它的优势。例如兼容性不太好的flex布局】
    runSequence = require('run-sequence'), //按照指定的顺序运行一系列gulp任务，这种函数是被设计用来解决这种场景：你定义了运行顺序，但是选择不使用依赖。
    concat = require('gulp-concat'), //用来把多个文件合并成一个文件，我们可以用它来合并js文件或者css文件等，这样来减少http请求数量
	gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'), //gulp-uglify用来压缩js文件，使用的是uglify引擎
	minifyCss = require('gulp-minify-css'), // gulp-minify-css用来压缩css文件
	minifyHtml = require('gulp-minify-html'), // gulp-minify-html用来压缩html文件
    inject = require('gulp-inject'),
    rev = require('gulp-rev'), // 给静态资源文件名添加hash值:unicorn.css => unicorn-d41d8cd98f.css (这个要修改:http://blog.csdn.net/lunhui1994_/article/details/76549226)
    revCollector = require('gulp-rev-collector'),
    base64 = require('gulp-base64');
	
var condition = true;

//gulp自动添加版本号 【需要注意的地方，很重要！！！】
/*推荐使用gulp-rev + gulp-rev-collector是比较方便的方法，结果如下:
 "/css/style.css" => "/dist/css/style-1d87bebe.css"
 "/js/script1.js" => "/dist/script1-61e0be79.js"
 "cdn/image.gif"  => "//cdn8.example.dot/img/image-35c3af8134.gif"

 但是由于公司发布系统限制，如果用上面方法实现，每次更新都会积压过多过期无用的文件，我们预期效果是:
 "/css/style.css" => "/dist/css/style.css?v=1d87bebe"
 "/js/script1.js" => "/dist/script1.js?v=61e0be79"
 "cdn/image.gif"  => "//cdn8.example.dot/img/image.gif?v=35c3af8134"
 怎么破?改上面两个Gulp插件是最高效的方法了。*/
//参考： http://www.cnblogs.com/givebest/p/4707432.html




//rev会做什么：根据静态资源内容，生成md5签名，打包出来的文件名会加上md5签名，同时生成一个json用来保存文件名路径对应关系。
//替换html里静态资源的路径为带有md5值的文件路径，这样html才能找到资源路径。【比较重要的一点：静态服务器需要配置静态资源的过期时间为永不过期】
//rev达到什么效果：
// 1).静态资源只需要请求一次，永久缓存，不会发送协商请求304
// 2).版本更新只会更新修改的静态资源内容
// 3).不删除旧版本的静态资源，版本回滚的时候只需要更新html，同样不会增加http请求次数


//gulp.dest(path)生成的文件路径是我们传入的path参数后面加上gulp.src()中有通配符开始出现的那部分路径
// compressed expanded
gulp.task('sass', function() { //创建一个任务叫做sass
    return gulp.src('src/scss/page/*.scss') //获取文件流
        .pipe(sass({ // 文件流经过sass(gulp-sass插件)处理
            outputStyle: "compressed"
        }).on('error', sass.logError))
        .pipe(autoprefixer({ //文件流经过autoprefixer(gulp-autoprefixer插件)处理
            browsers: ['Android >= 2.3', 'iOS >= 8.0'],
            cascade: true //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
        }))
        .pipe(gulp.dest('src/static/css/')) //最后把经过处理的流再通过pipe方法导入到gulp.dest()中，gulp.dest()方法则把流中的内容写入到文件中
        //【注意我们给gulp.dest()传入的路径参数，只能用来指定要生成的文件的目录，而不能指定要生成的文件的文件名】
        //这里生成的文件路径是 src/static/css/*.css
        .pipe(reload({
            stream: true
        }));
});

//gulp.task()用来定义任务
//但需要知道执行多个任务时怎么来控制任务执行的顺序
//gulp中执行多个任务，可以通过任务依赖来实现。例如我想要执行one, two, three这三个任务，那我们就可以定义一个空的任务，然后把那三个任务当做这个空的任务的依赖就行了：
// gulp.task('default',['one','two','three'])



//gulp.watch()用来监视文件的变化，当文件发生变化后，我们可以利用它来执行相应的任务，例如文件压缩等。
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        // proxy: "http://192.168.3.7/webapp/src/"
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('src/scss/**/*.scss', ['sass']); //监听scss文件，会在scss文件变动后执行sass这个task
    gulp.watch('src/module/*.html').on('change', reload); //会在修改html文件后刷新页面
    gulp.watch('src/static/js/**/*.js').on('change', reload); //会在修改js后刷新页面
});

//js压缩 //JS获取版本号
gulp.task('miniJs', function() {
    return gulp.src('src/static/js/**/*.js')
        .pipe(gulpif(
            condition, uglify()
        )) // 生产环境，condition=true，对js进行压缩， 否则不压缩
        .pipe(rev())
        .pipe(gulp.dest('./tActivity/static/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./cache/rev/js')); // D:\workspace\truck\truck-web\activity\cache\rev\js\rev-manifest.json
});

// gulp-rev
//执行以下两句会生成一个json，里面存储的是文件原名和生成hash文件名的对应
//.pipe(rev.manifest()) //set hash key json
//.pipe(gulp.dest(config.rev)); //dest hash key json



// Img获取版本号
gulp.task('revImg', function() {
    return gulp.src('src/static/images/**/*.*') //  src\static\images\icons\*.*   and   src\static\images\icons2\*.*  and  src\static\images\*.*
        .pipe(rev())
        .pipe(gulp.dest('./tActivity/static/images')) // tActivity\static\images\icons\*.*   and  tActivity\static\images\icons2\*.*  and  tActivity\static\images\*.*
        .pipe(rev.manifest())
        .pipe(gulp.dest('./cache/rev/images'));
});

//CSS压缩  //CSS添加版本号
gulp.task('revCss', function() {
    return gulp.src('src/static/css/**/*.css')
        .pipe(base64({ 
            extensions: ['png', 'jpg'],
            // exclude: ['a.jpg', 'c.png'],
            maxImageSize: 8 * 1024
            // ,
            // deleteAfterEncoding: true,
            // debug: true
        }))
        .pipe(rev())
        .pipe(gulp.dest('./tActivity/static/css')) //这里生成的文件路径是 ./tActivity//static/css/**/*.css
        .pipe(rev.manifest())
        .pipe(gulp.dest('./cache/rev/css')); // D:\workspace\truck\truck-web\activity\cache\rev\css\rev-manifest.json
});


// 压缩html文件/更新引入文件版本
gulp.task('miniHtml', function() {
    return gulp.src(['./cache/rev/**/*.json', './src/module/*.html']) // 所以revCollector 就是根据json文件中显示的文件名对应关系，遍历所有html，替换文件命名
        .pipe(revCollector())
		.pipe(gulpif(
            condition, minifyHtml({
                empty: true,
                spare: true,
                quotes: true
            })
        )) // condition=true表示生产环境环境下面压缩，否则（开发环境下面）不压缩html文件
        .pipe(gulp.dest('./tActivity/module')); //替换结果输出到./tActivity/module下
});


gulp.task('cleanBuild', function(cb) {
    return del('./tActivity/', cb);
});

// 开发构建 (开发的时候不压缩css,html,js等文件)
gulp.task('dev', function(done){
	condition = false; // 开发环境不压缩
	runSequence(['cleanBuild'], ['revImg'], ['revCss'], ['miniHtml'], ['miniJs'], done);
	//runSequence('cleanBuild', 'revImg', 'revCss', 'miniHtml', 'miniJs', done);
});

// 正式构建
gulp.task('build', function(done){
	runSequence(['cleanBuild'], ['revImg'], ['revCss'], ['miniHtml'], ['miniJs'], done);
});


gulp.task('default', ['build']); // 执行：gulp，默认执行build这个task

// 开发的时候，先执行：gulp dev, 再执行：gulp serve;    上线的时候，执行gulp build, 然后把压缩后的文件用到线上

//runSequence('A','B','C','D') 这里有一点必须注意，函数A,B,C必须返回值，这个返回值要么是流(stream)，要么是一个promise对象，要么是一个handle对象，要么是一个回调函数

// gulp.task('concat', function() {
//     return gulp.src(['./src/static/js/flexible.js', './src/static/js/lib/zepto/zepto.min.js'])
//         .pipe(concat('common.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('./dist/static/js'));
// });


// gulp.task('injector', function() {
//     return gulp.src('./dist/module/*.html')
//         .pipe(inject(gulp.src('./dist/static/js/common.js'), {
//             relative: true
//         }))
//         .pipe(gulp.dest('./dist/module/'));
// });
