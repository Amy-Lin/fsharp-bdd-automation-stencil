module CanopyTestFeatureStepDefinitions

open TickSpec
open canopy


let [<Given>] ``a customer open canopy test page`` () = 
    start chrome
    //go to url
    url "http://lefthandedgoat.github.io/canopy/testpages/"

let [<When>] ``the clickMe button is clicked`` () =  
    "#button_clicked" == "button not clicked"
    click "#button"

let [<Then>] ``the text '(.*)' should shows up`` (text:string) =     
    "#button_clicked" == "button clicked"
    quit()




