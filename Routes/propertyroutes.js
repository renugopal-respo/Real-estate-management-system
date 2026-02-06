import express from 'express';
import { getPropertyForCard,
    addToFavourites,
getUsersFavourites,
removeFromFavorites ,
getPropertiesDetails} from '../controllers/Propertycontroller.js';
const router=express.Router();
router.get('/getPropertiesForCard',getPropertyForCard);
router.get('/addToFavourites',addToFavourites);
router.get('/getUsersFavourites',getUsersFavourites);
router.get('/getDetailsView',getPropertiesDetails)
router.delete('/removeFromFavorites',removeFromFavorites);
export default router;