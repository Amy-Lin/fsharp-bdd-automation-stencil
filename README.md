## F# BDD Automation Test Stencil
This stencil generates examples of automation test project in BDD style with F# language. 

Using this stencil, you will be able to create an automation project in F# and with the following framework:
* [TickSpec](https://tickspec.codeplex.com/), which enables BDD style of test spec.
* [NUnit](http://www.nunit.org/), which enables running the test in build command line and also generating NUnit test report (It's handy when I use it to integrate with CI build server TeamCity).
* [Canopy](https://lefthandedgoat.github.io/canopy/index.html) (optional), which is a wrapper of Selenium Webdriver and has nice and neat API for writing UI test.

It can create the following two types project (with or without UI):
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

A more detailed instruction on how to use this stencil can be found [here](http://amyandlucy.blogspot.com.au/2016/07/a-stencil-to-setup-f-bdd-automation.html)