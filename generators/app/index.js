'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Next, add your custom code
    this.option('babel'); // This method adds support for a `--babel` flag
  }

  prompting() {
    this.log(
      yosay('Welcome to the majestic ' + chalk.red('generator-codenut') + ' generator!')
    );

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Project name?',
        default: this.appname
          .trim()
          .replace(
            /(?:^\w|[A-Z]|\b\w)/g,
            (letter, index) => (index === 0 ? letter.toLowerCase() : letter.toUpperCase())
          )
          .replace(/\s+/g, '')
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.name
          .trim()
          .replace(
            /(?:^\w|[A-Z]|\b\w)/g,
            (letter, index) => (index === 0 ? letter.toLowerCase() : letter.toUpperCase())
          )
          .replace(/\s+/g, '')
      }
    );
    this.fs.copy(this.templatePath('.bowerrc'), this.destinationPath('.bowerrc'));
    this.fs.copyTpl(this.templatePath('bower.json'), this.destinationPath('bower.json'), {
      name: this.props.name
    });
    if (this.fs.exists(this.templatePath('gitignore.txt'))) {
      this.fs.copy(
        this.templatePath('gitignore.txt'),
        this.destinationPath('.gitignore')
      );
    }

    this.fs.copy(this.templatePath('gulpfile.js'), this.destinationPath('gulpfile.js'));
    this.fs.copy(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js')
    );
    this.fs.copy(this.templatePath('.jscsrc'), this.destinationPath('.jscsrc'));
    this.fs.copy(
      this.templatePath('.scss-lint.yml'),
      this.destinationPath('.scss-lint.yml')
    );
    this.fs.copy(this.templatePath('app'), this.destinationPath('app'));
  }

  install() {
    this.installDependencies({
      bower: true,
      npm: true,
      skipMessage: this.options['skip-install-message'],
      skipInstall: this.options['skip-install'],
      callback: () => {
        console.log('Codenut Prerender');
        this.spawnCommand('./node_modules/gulp/bin/gulp.js', ['compile']);
      }
    });
  }
};
