export const Authorization=async(req,res,next)=>{
    const routes={
        admin:['addstaff','removestaff'],
        staff:[]  
    } 
    const message="Sorry, you don't have access to this page"
    const role=req?.user?.user_role?.toLowerCase();
    const url=req.url.replace('/','').toLowerCase();
  
  if(!role){
        return res.status(400).
        json({message:"Missing Role in request "});
    }

  if(role!=='admin' && role!=='staff'){
     return res.status(401).
   json({message:message});
  }

  if(routes.admin.includes(url)&&
     role==='admin'){
    return next();  
}

  if(routes.admin.includes(url)&& role==='staff'){
     return res.status(401).
   json({message:message})
  }  

  return next();
};

export const roleBasedAuthorization=(req,res,next)=>{
    const routes={
        admin:['addstaff','removestaff'],
        staff:[]  
    }
    const url=url.toLowerCase();
    const role=req?.user?.user_role?.toLowerCase();
      
    if(!role){
        return res.status(400).
        json({message:"Missing Role in request "});
    }
    if(role==='admin' )
     {
        next();
    }
    else {
         return res.status(401).
        json({message:"Sorry, you don't have access to this page"})
    }
   
}