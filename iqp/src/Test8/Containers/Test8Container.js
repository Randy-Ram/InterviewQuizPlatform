import React from 'react';
import { englishProverbs, arabianProverbs } from './Test8SentenceList';


let englishTable = []
let arabianTable = []

for (var index in englishProverbs){
    let currArr = []
    currArr.push(index)
    currArr.push(englishProverbs[index])
    englishTable.push(currArr)
    currArr = []
}

for(var index2 in arabianProverbs){
    let currArr = []
    if(index2 === "0"){
        currArr.push("4");
    }
    else {
        currArr.push('')
    }
    currArr.push(arabianProverbs[index2])
    arabianTable.push(currArr)
    currArr = []
}
console.log(englishTable)
console.log(arabianTable)

export class Test8Container extends React.Component {
   
    render(){
        return(
            <h1>Hi!</h1>
        )
    }
}