var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var mkdirp = require('mkdirp');
var _ = require('lodash');

var applicationTypes = [
    {
        name: 'F# BDD Automation',
        value: {
            id: "bdd",
            defaultApplicationName: 'FSharpBddTest',
            defaultRegistoryNamePrefix: 'Stencil'
        }
    },
    {
        name: 'F# BDD Automation with Canopy',
        value: {
            id: 'bdd-canopy',
            defaultApplicationName: 'FSharpBddTestWithCanopy',
            defaultRegistoryNamePrefix: 'Stencil'
        }
    }
];

StencilGenerator = yeoman.generators.Base.extend({
    init: function() {
        this.log(yosay("Welcome to the stencil generator"));
    },
    prompting: {
        askForProjectType: function() {
            var done = this.async();

            var prompts = [
                {
                    type: 'list',
                    name: 'type',
                    message: 'What type of automation do you want to create?',
                    choices: applicationTypes
                }
            ];

            this.prompt(prompts, function(props) {
                this.type = props.type;

                done();
            }.bind(this));
        },

        askForName: function() {
            var done = this.async();

            var prompts = [
                {
                    name: "applicationName",
                    message: "What's the name of your BDD test application?",
                    default: this.type.defaultApplicationName
                }
            ];

            this.prompt(prompts, function(props) {
                this.applicationName = props.applicationName;

				this.applicationDirectory = props.applicationName;
                done();
            }.bind(this));
        }
    },

    writing: {
        writeTemplate: function() {
            var self = this,
                sourceRoot = this.sourceRoot();

            mkdirp(self.applicationDirectory);

            this.sourceRoot(sourceRoot + "/common");
            this.fs.copyTpl(this.templatePath("Application.sln"), solutionFile(this.applicationName + ".sln"), this);

            this.fs.copyTpl(this.templatePath("Application/App.config"), projectFile("App.config"), this);
			this.fs.copyTpl(this.templatePath("Application/Application.fsproj"), projectFile(this.applicationName + ".fsproj"), this);		
            this.fs.copyTpl(this.templatePath("Application/AssemblyInfo.fs"), projectFile("AssemblyInfo.fs"), this);
			this.fs.copyTpl(this.templatePath("Application/AssemblyInfo.fs"), projectFile("AssemblyInfo.fs"), this);
			this.fs.copyTpl(this.templatePath("Application/Fixtures.fs"), projectFile("Fixtures.fs"), this);
			this.fs.copyTpl(this.templatePath("Application/packages.config"), projectFile("packages.config"), this);
			this.fs.copyTpl(this.templatePath("Application/StockFeature.txt"), projectFile("StockFeature.txt"), this);
			this.fs.copyTpl(this.templatePath("Application/StockStepDefinitions.fs"), projectFile("StockStepDefinitions.fs"), this);

			this.fs.copyTpl(this.templatePath("build/build.fsx"), buildFile("build.fsx"), this);
			this.fs.copyTpl(this.templatePath("build/build.cmd"), buildFile("build.cmd"), this);
			this.fs.copyTpl(this.templatePath("build/build.sh"), buildFile("build.sh"), this);
			
			this.fs.copyTpl(this.templatePath("build/.nuget/NuGet.Config"), nugetFile("NuGet.Config"), this);
			this.fs.copy(this.templatePath("build/.nuget/NuGet.exe"), nugetFile("NuGet.exe"), this);
			this.fs.copyTpl(this.templatePath("build/.nuget/NuGet.targets"), nugetFile("NuGet.targets"), this);
			this.fs.copyTpl(this.templatePath("build/.nuget/packages.config"), nugetFile("packages.config"), this);
			
            switch (this.type.id) {
            case "bdd":
            {
                break;
            }
            case "bdd-canopy":
            {
				this.sourceRoot(sourceRoot + "/canopy");
				this.fs.copyTpl(this.templatePath("packages.config"), projectFile("packages.config"), this);
                this.fs.copyTpl(this.templatePath("Application.fsproj"), projectFile(this.applicationName + ".fsproj"), this);	
                this.fs.copyTpl(this.templatePath("Fixtures.fs"), projectFile("Fixtures.fs"), this);
				this.fs.copyTpl(this.templatePath("CanopyTestFeature.txt"), projectFile("CanopyTestFeature.txt"), this);
				this.fs.copyTpl(this.templatePath("CanopyTestFeatureStepDefinitions.fs"), projectFile("CanopyTestFeatureStepDefinitions.fs"), this);
                break;
            }
            }

            function testFile(file) {
                return self.destinationPath(self.applicationDirectory + "/src/" + self.applicationName + ".Tests/" + file);
            }

            function baseFile(file) {
                return self.destinationPath(self.applicationDirectory + "/" + file);
            }

            function buildFile(file) {
                return self.destinationPath(self.applicationDirectory + "/build/" + file);
            }

            function solutionFile(file) {
                return self.destinationPath(self.applicationDirectory + "/" + file);
            }

            function projectFile(file) {
                return self.destinationPath(self.applicationDirectory + "/" + self.applicationName + "/" + file);
            }
			
			function nugetFile(file) {
                return self.destinationPath(self.applicationDirectory + "/build/.nuget/" + file);
            }
        }
    },

    end: function () {
        this.log("\r\n");
        this.log("Your automation test project has been created in the following directory: ")
        this.log("\r\n");
        this.log(chalk.cyan(this.destinationPath(this.applicationDirectory)));
        this.log("\r\n");
        this.log("You can use the following commands to get going");
        this.log("\r\n");
        this.log(chalk.green("   build") + "              compile test and build docker image");
        this.log("\r\n");
    }
});

module.exports = StencilGenerator;