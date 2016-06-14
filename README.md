## F# BDD Automation Test Stencil
This stencil generates F# BDD automation test samples in two types:
* BDD automation test sample using TickSpec
* BDD automation test using TickSpec with canopy UI automation sample

Besides the test samples, it also generates a "build" folder containing build files using FAKE. After generate the test samples, you can either open the solution in Visual Studio or simply run build cmd to compile and run the sample tests.

### Getting set up
* Download [Node.js](https://nodejs.org/en/download/). Run command `node` and `npm` to make sure they are working
* Install yeoman (you need node/npm installed for this, and preferably on the command line)
```
npm install --global yo
```
* Clone the yeoman stencil repository anywhere you like
> Note: If you get the error saying like this "error: unable to create file >node_modules/yeoman-generator/node_modules/dateform
>at/node_modules/meow/node_modules/normalize-package-data/node_modules/validate-n
>pm-package-license/node_modules/spdx-correct/node_modules/spdx-license-ids/spdx-
>license-ids.json (Filename too long)"
> It's because Git has a limit of 260 characters for a filename on Windows. Issue this command should solve it. `git config --system core.longpaths true`)

* Symlink the package folder 
```
cd generator-stencil
npm link
```

* Navigate to the directory where you'd like to create a new project and type 
```
yo FSharpBDDTest
```
* Follow the onscreen prompts