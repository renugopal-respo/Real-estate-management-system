const tablemodel=require('../Models/Tablemodel');
const getAlltables=async()=>{
    try {
         const[tables]=await tablemodel.getAlltables();
         tables.forEach(element => {
            console.log(element);
         });
    } catch (error) {
        console.log('error',error);
    }
}