module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Watch //
        watch: {
            js: {
                files: ['build/js/*.js'],
                tasks: ['js'],
                options: {
                    spawn: false,
                    interupt: true,
                },
            },
            styles: {
                files: ['build/css/*.css'],
                tasks: ['styles'],
                options: {
                    spawn: false,
                    interupt: true,
                },
            },
            image: {
                files: ['build/images/*'],
                tasks: ['images'],
                options: {
                    spawn: false,
                    interupt: true,
                },
            },
            html: {
                files: ['build/*.html'],
                tasks: ['html'],
                options: {
                    spawn: false,
                    interupt: true,
                },
            },
        },

        // JS //
        uglify: {
            build: {
                src: ['build/js/libs/*.js', 'build/js/*.js'],
                dest: 'dist/js/main.min.js'
            }
        },

        // CSS //
        cssmin: {
            dist: {
                files: {
                    'dist/css/main.css': ['build/css/libs/*.css', 'build/css/*.css']
                }
            }
        },
        autoprefixer: {
            autoprefix: {
                expand: true,
                flatten: true,
                src: 'dist/css/main.css',
                dest: 'dist/css/',
            },
        },
        uncss: {
            dist: {
                files: {
                    'dist/css/main.css': ['build/*.html']
                }
            }
        },

        // Images //
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'build/',
                    src: ['images/**'],
                    dest: 'dist/'
                }]
            },
            // svgs: {
            //     files: [{
            //         expand: true,
            //         cwd: 'build/images',
            //         src: ['**'],
            //         dest: 'dist/images'
            //     }]
            // }
        },
        imageoptim: {
            myTask: {
                options: {
                    jpegMini: false,
                    imageAlpha: false,
                    quitAfter: true
                },
                src: ['dist/images']
            }
        },
        svgmin: { // Task
            options: { // Configuration that will be passed directly to SVGO
                plugins: [{
                    removeViewBox: false
                }, {
                    removeUselessStrokeAndFill: false
                }, {
                    convertPathData: {
                        straightCurves: false // advanced SVGO plugin option
                    }
                }]
            },
            dist: { // Target
                files: [{ // Dictionary of files
                    expand: true, // Enable dynamic expansion.
                    cwd: 'build/images/', // Src matches are relative to this path.
                    src: ['*.svg'], // Actual pattern(s) to match.
                    dest: 'dist/images/', // Destination path prefix.
                    ext: '.svg' // Dest filepaths will have this extension.
                    // ie: optimise img/src/branding/logo.svg and store it in img/branding/logo.min.svg
                }]
            },
        },

        // HTML //
        htmlmin: {
            main: {
                options: { // Target options
                    removeComments: false,
                    collapseWhitespace: true,
                    minifyJS: true,
                    minifyCSS: true
                },
                files: [{
                    expand: true, // Enable dynamic expansion.
                    cwd: 'build/', // Src matches are relative to this path.
                    src: ['*.html'], // Actual pattern(s) to match.
                    dest: 'dist/', // Destination path prefix.
                    ext: '.html', // Dest filepaths will have this extension.
                    extDot: 'first' // Extensions in filenames begin after the first dot
                }]
            }
        },

        // Host //
        browserSync: {
            dev: {
                bsFiles: {
                    src: ['dist/css/*.css', 'dist/*.html', 'dist/js/*.js', 'dist/images/**']
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "dist"
                    }
                }
            },
            host: {
                bsFiles: {
                    src: ['dist/css/*.min.css', 'dist/*.html', 'dist/js/*.js', 'dist/images/**']
                },
                options: {
                    watchTask: false,
                    server: {
                        baseDir: "dist"
                    }
                }
            }
        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-imageoptim');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-svgmin');


    // Tasks
    grunt.registerTask('default', ['js', 'styles', 'images', 'html']);
    grunt.registerTask('js', ['uglify']);
    grunt.registerTask('styles', ['cssmin', 'newer:uncss:dist', 'autoprefixer']);
    grunt.registerTask('images', ['newer:copy:main', 'newer:imageoptim:myTask', 'svgmin']);
    grunt.registerTask('html', ['htmlmin']);
    grunt.registerTask('serve', ['browserSync:dev', 'watch']);
    grunt.registerTask('host', 'browserSync:host');


};
