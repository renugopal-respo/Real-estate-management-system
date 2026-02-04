export const filterIsEmpty=(input)=>{
    let length=Object.keys(input).length;
    let count=0;
    Object.keys(input).forEach(key=>{
        if(input[key]===''){
            count++;
        }
    })
   if(count===length){
     return true;
   }
   else{
    return false;
   }
}