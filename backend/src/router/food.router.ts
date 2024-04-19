import {Router} from 'express';
import { sample_foods, sample_tags } from '../data';
import asyncHandler from 'express-async-handler';
import { FoodModel } from '../models/food.models';

const router = Router();

router.get("/", asyncHandler(
   async (req,res) => {
        const foods = await FoodModel.find();
        res.send(foods)
    }
))

router.get("/seed", asyncHandler(
    async (req,res) => {
        const foodsCount = await FoodModel.countDocuments();
        if(foodsCount>0)
            {
                res.send("Seed is already done !");
                return;
            }

            await FoodModel.create(sample_foods);
        res.send("Seed is Done!");
    }
) );



router.get('/search/:searchTerm', asyncHandler(
    async (req,res) => {
        const serachRegex = new RegExp(req.params.searchTerm,'i');
        const foods = await FoodModel.find({name:{$regex:serachRegex}})
       
        res.send(foods)
    }
))



// router.get("/api/foods/tags", (req,res) => {
//     res.send(sample_tags)
// })


router.get("/tag/:tagName" , asyncHandler(
    async (req, res) => {
      const foods = await FoodModel.find({tags: req.params.tagName})
      res.send(foods);
    }
  ))

router.get("/tags", asyncHandler(
    
    async (req,res) => {
        console.log("Calling Tags")
        console.log("The id field is - ");
        console.log(req.params._id)
        
        const tags = await FoodModel.aggregate([
           { 
            $unwind:'$tags'
            },
            {
                $group:{
                     _id: '$tags',
                    count:{$sum:1}
                }
            },
            {
                $project:{
                    _id:0,
                    name:'$_id',
                    count: '$count'
                }
            }
        ]).sort({count:-1})
        const all = {
            name:'All',
            count:await FoodModel.countDocuments()
        }

        tags.unshift(all); // Unshift adds all the items to the beginneing of the array , unlike push which adds everything to the end of the array

        res.send(tags);
    }
) )


router.get("/:foodId" , asyncHandler(
    async (req, res) => {
      const food = await FoodModel.findById(req.params.foodId);
      res.send(food);
    }
  ))






export default router;