export const generateFilters=(filters,current,previous)=>{
    let currentFilter='';
    let PreviousFilter='';
      if(current==='' && previous===''){
        
         Object.keys(filters).forEach(key=>{
             currentFilter=currentFilter+filters[key];
             
         })
         PreviousFilter=currentFilter;
         return {currentFilter,PreviousFilter}
      }
      else if(current===previous){
        
      }
}