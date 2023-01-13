//imports
import { createText } from "./functions.js";
//end imports
export function commandHistory(){
    let record = JSON.parse(localStorage.getItem("history")) || [];
    if(record.length === 0){
        createText("No History Found!");
    }else{
        createText("Previously used commands are: ");
        for(let i=0;i<record.length;++i){
            createText((i+1).toString() + ".) " + record[i]);
        }
    }
}


export function saveHistory(value){
    let record = JSON.parse(localStorage.getItem("history")) || [];
    if(value === "history") return;
    if(record.length > 9){
        record.shift();
        record.push(value);
    }else{
        record.push(value);
    }
    localStorage.setItem("history", JSON.stringify(record));
}


export function clearHistory(){
    let record = JSON.parse(localStorage.getItem("history")) || [];
    createText("Clearing your history");
    record = [];
    localStorage.setItem("history", JSON.stringify(record));
}

export function popInvalidCommand(){
    let record = JSON.parse(localStorage.getItem("history")) || [];
    record.pop();
    localStorage.setItem("history", JSON.stringify(record));
}
