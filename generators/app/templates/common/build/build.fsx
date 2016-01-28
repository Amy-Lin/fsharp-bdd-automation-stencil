#r "packages/FAKE/tools/FakeLib.dll"; open Fake 

let srcDir = "../<%= applicationName %>"
let packageDir = "../packages"
let solutionDir = "../<%= applicationName %>.sln"

Target "Clean" (fun _ ->
    CleanDirs [srcDir + @"/bin/"]
)

Target "RestorePackages" (fun _ -> 
     solutionDir
     |> RestoreMSSolutionPackages (fun p ->
         { p with
             Sources = "https://www.nuget.org/api/v2/" :: p.Sources
             OutputPath = packageDir
             Retries = 4 })
 )
 
Target "Build" (fun _ ->
    !! solutionDir
      |> MSBuildRelease "" "Build"
      |> Log "AppBuild-Output: "
)

Target "Test" (fun _ ->
   !! (srcDir + @"/bin/**/<%= applicationName %>.dll") 
      |> NUnit (fun p -> { p with DisableShadowCopy = true; 
                                  ToolPath = packageDir + "/NUnit.2.5.10.11092/Tools" })
)

"Clean"
   ==> "RestorePackages"
   ==> "Build"
   ==> "Test"

RunTargetOrDefault "Test"