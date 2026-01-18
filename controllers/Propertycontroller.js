const propertyModel = require('../Models/PropertyModel');

const getInitialProperties = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const properties = await propertyModel.getInitialProperties(limit, offset);

    res.status(200).json({
      success: true,
      page,
      limit,
      total: properties.length,
      data: properties,
    });
  } catch (error) {
    console.error("Error in getInitialProperties:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch properties",
      error: error.message,
    });
  }
};
const getExclusiveProperties=async(req,res)=>{
    console.log(req);
    const page=parseInt(req.query.page) || 1;
    const limit=parseInt(req.query.limit);
    const offset=(page-1)*limit;
    try {
        const rows=propertyModel.getExclusiveProperties(limit,offset)
    } catch (error) {
        
    }
}
module.exports = { getInitialProperties ,getExclusiveProperties};
