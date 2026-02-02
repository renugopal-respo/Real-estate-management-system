import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

//  Handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure data folder exists
const dataFolder = path.join(__dirname, "data");
if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder);
}

//  Set up db file
const file = path.join(dataFolder, "lowdb.json");
const adapter = new JSONFile(file);

//  Initialize with defaults
const Lowdb = new Low(adapter, {bookingListFilterCache:{},
    propertyFilterCache:{} });

export async function initDB() {
  await Lowdb.read();
  Lowdb.data ||= { bookingListFilterCache:{},
    propertyFilterCache:{}
  };
}

export async function saveDB() {
  await Lowdb.write();
}

export const getCache=()=>{
    return Lowdb.data;
}

export const generateCacheKeyValue=(filters,totalPages)=>{
    let key='';
    try {
        if(typeof filters==="object"){
            Object.keys(filters).forEach(keys=>{
                 key=key+filters[keys];
            });
            return {key,totalPages};
        }
        else{
            throw new Error("TYPE MUST BE OBJECT");
        }
    } catch (error) {
        console.log( "ERROR FROM GENERATE KEY AT STORE:",error.message);
    }
}
export default Lowdb;
