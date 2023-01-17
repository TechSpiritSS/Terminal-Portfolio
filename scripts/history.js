//imports
import { createText, getInputValue } from "./functions.js";
//end imports
export async function commandHistory(){
    let record = JSON.parse(localStorage.getItem("history")) || [];
    if(record.length === 0){
        await createText("No History Found!");
    }else{
        await createText("Previously used commands are: ");
        for(let i=0;i<record.length;++i){
            await createText((i+1).toString() + ".) " + record[i]);
        }
        await createText("To run a specific cmd from history, run history {id} where id is the id of that cmd in histroy")
    }
}

export async function runSpecificHistoryCmd(id) {
    let record = JSON.parse(localStorage.getItem("history")) || [];
    if (id < 1 || id > record.length) {
        await createText("No History Found for this id!");
    } else {
        await createText(`Running command: ${record[id-1]}`);
        await getInputValue(record,false,record[id-1]);
    }
}

export function saveHistory(value){
    let record = JSON.parse(localStorage.getItem("history")) || [];
    if(value.startsWith('history')) return;
    if(record.length > 9){
        record.shift();
        record.push(value);
    }else{
        record.push(value);
    }
    localStorage.setItem("history", JSON.stringify(record));
}


export async function clearHistory(){
    let record = JSON.parse(localStorage.getItem("history")) || [];
    await createText("Clearing your history");
    record = [];
    localStorage.setItem("history", JSON.stringify(record));
}

export function popInvalidCommand(){
    let record = JSON.parse(localStorage.getItem("history")) || [];
    record.pop();
    localStorage.setItem("history", JSON.stringify(record));
}
