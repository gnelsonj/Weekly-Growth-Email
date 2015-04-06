module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compass: {
            dist: {
                options: {
                    sassDir: 'sass/',
                    cssDir: 'css/build/',
                    outputStyle: 'compressed'
                },
            },
        },
        jade: {
            dist: {
                options: {
                    pretty: true,    
                    data: {
                        debug: true
                    }
                },
                files: {
                    'html/weekly-digest.html': ['jade/weekly-digest.jade']
                }
            }
        },
        inlinecss: {
            dist: {
                options: {
                    removeStyleTags: false,
                    preserveMediaQueries: true
                },
                files: {
                    'html/build/weekly-digest-inlined.html': 'html/weekly-digest.html'
                }
            }
        },
        watch: {
            css: {
                files: ['sass/**/*.sass', 'sass/**/*.scss'],
                tasks: ['compass'],
                options: {
                    spawn: false,
                },
            },
            jade: {
                files: ['jade/**/*.jade'],
                tasks: ['jade'],
                options: {
                    spawn: false,
                },
            },
            inline: {
                files: ['html/**/*.html', 'sass/**/*.sass', 'jade/**/*.jade'],
                tasks: ['inlinecss'],
                options: {
                    spawn: false,
                },
            },
        },
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-inline-css');
    grunt.loadNpmTasks('grunt-contrib-jade');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['compass', 'jade', 'inlinecss']);

};