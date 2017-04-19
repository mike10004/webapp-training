module.exports = function(grunt) {

    const BUILD_DIR = grunt.option('project-build-directory') || 'target';
    const ARTIFACT_ID = grunt.option('project-artifactId') || 'mvn-webapp-with-less';

    /**
     * Escapes a string for use as part of a regular expression pattern.
     * By Google, according to http://stackoverflow.com/a/18151038.
     * @param {string} s the string to escape
     * @returns {string} the escaped string
     */
    const regExpEscape = function(s) {
        return String(s).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1').
        replace(/\x08/g, '\\x08');
    };

    const parseFilename = function(pathname) {
        const pathnameParts = pathname.split('/');
        return pathnameParts[pathnameParts.length - 1];
    };

    const guessBuildFinalName = function() {
        const fs = require('fs');
        const entries = fs.readdirSync(BUILD_DIR);
        const stageDirRegex = new RegExp('^' + regExpEscape(ARTIFACT_ID) + '-\w+\.\w+(\.\w+)?(-SNAPSHOT)?$');
        const matching = entries.filter(function(path_string){
            return fs.lstatSync(path_string).isDirectory();
        }).map(parseFilename)
          .filter(function(pathname) {
            return stageDirRegex.test(pathname);
        });
        if (matching.length < 0) {
            throw 'no directories match expected staging directory name';
        }
        return matching[0];
    };
    const BUILD_FINAL_NAME = grunt.option('project-build-finalName') || guessBuildFinalName();
    const STAGE_DIR = BUILD_DIR + '/' + BUILD_FINAL_NAME;
    const WEBAPP_SRC_DIR = 'src/main/webapp';

    grunt.initConfig({
        less: {
            options: {
            },
            development: {
                files: [
                    {
                        dest: STAGE_DIR + '/files/app/aggregated.css',
                        src: WEBAPP_SRC_DIR + '/files/app/**/*.less',
                        nonull: true
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('default', ['less']);

};