const express = require('express');
const cors= require('cors');
const db=require('./config/db');
const app=express();
const userRoutes=require('./Routes/userRoute');
const propertyRoutes=require('./Routes/propertyroutes')
const path = require('path'); app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(express.json());
app.use('/users',userRoutes);
app.use('/properties',propertyRoutes)
async function sampledb(){
   const sql=` SELECT 
        p.property_id,
        p.addressline,
        p.price,
        l.city,   
        type.type_name,
        sts.status_name
      FROM properties p
      JOIN locations l ON p.location_id = l.location_id
      JOIN property_type type ON p.type_id = type.type_id
      JOIN property_status sts ON p.status_id = sts.status_id
      
      `;
      const sql1=`show databases`
      const [rows]=await db.query(sql);
      console.log(rows[1].property_id);
}
app.listen(5000,()=>{ 
    console.log("server is running");
    sampledb();
})