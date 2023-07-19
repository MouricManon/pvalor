import { useEffect, useState } from 'react'
import bodyimage from "./public/assets/body.png"
import "./body.css"
import {Body} from "./public/types";

type BodyProps = {
    data: Body
    date : string

}


function BodyC({ data, date}: BodyProps) {
   
function fatdisplay(){
      let somme = 0;
  for (var i = 0; i < data.fat.length; i++) {
    somme += data.fat[i];
  }
  data.avgfat=somme / data.fat.length;
return (
  data.avgfat
)
}
function weightdisplay(){
    let somme = 0;
for (var i = 0; i < data.weight.length; i++) {
  somme += data.weight[i];
}
data.avgweight=somme / data.weight.length;
return (
data.avgweight
)
}
function tempdisplay(){
    let somme = 0;
for (var i = 0; i < data.temp.length; i++) {
  somme += data.temp[i];
}
data.avgtemp=somme / data.temp.length;
return (
data.avgfat
)
}
function isnullfat(){
    if(data.fat.length===0){
        return(<li id="nofat"> There is no fat valor</li>)
    }
    else{
        return(<li id="onefat">The average fat of the day is {fatdisplay()}</li>)
    }
}
function isnullbmi(){
    if(data.bmi.length===0){
        return(<li id="nobmi"> There is no bmi valor</li>)
    }
    else{
        return(<li id="onebmi">bmi :{data.bmi}</li>)
    }
}
function isnullweight(){
    if(data.weight.length===0){
        return(<li id="noweight"> There is no weight valor</li>)
    }
    else{
        return(<li id="oneweight">The average weight of the day is {weightdisplay()}</li>)
    }
}
function isnulltemp(){
    if(data.temp.length===0){
        return(<li id="notemp"> There is no temperature valor</li>)
    }
    else{
        return(<li id="oneweight" >The average temperature of the day is {tempdisplay()}</li>)
    }
}
    return (<div id="body"><div id="titrebody"><img id="bodyimage" alt="body" src={bodyimage}/><h1>Body</h1></div>
   <ul> {isnullfat()}
   {isnullweight()}
   {isnulltemp()}
   {isnullbmi()}</ul></div>)
}
export default BodyC;