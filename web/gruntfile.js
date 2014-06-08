module.exports = function(grunt){

    // ��Ŀ����
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
				expand: true,
				cwd:'frontEnd/',
                src: '**/*.js',
                dest: 'static/',
				ext:".js"
            }               
        }
    });

    // �����ṩ"uglify"����Ĳ��
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Ĭ������
    grunt.registerTask('default', ['uglify']);
}