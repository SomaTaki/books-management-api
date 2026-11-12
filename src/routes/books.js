const express = require("express");

const db = require("../db/db");
const { books } = require("../db/schema");
const { eq } = require("drizzle-orm");
const renderErrorHandler = require("../utilities/renderErrorHandler");

const router = express.Router();

router.get("/", async (req, res) =>{
    try{
        const entries = await db.select().from(books);

        return res.status(200).json(entries)
    }
    catch (err){
        return renderErrorHandler = (err, res)
    }
})

router.get("/:id", async (req, res) => {
    try{
        const [entry] = await db.select().from(books).where(eq(books.id, +req.params.id));
        if(!entry){
            return res.status(404).json({
                message: "books not found!",
            })
        }

        return res.status(200).json(entry)
    }catch (err){

    }
})



router.put("/:id", async (req,res) => {
    try{
        const [entry] = await db.select().from(books).where(eq(books.id, +req.params.id))
        if(!entry){
            return res.status(404).json({
                message: "book not found",
            });
        }
        const  {title, author, year} = req.body;

        await db.update(books).set({title: title, author: author, year: year}).where(eq(books.id, +req.params.id))

        return res.status(200).json({
            message: "Book updated succesfully!",
        })
    }
    catch{
        return renderErrorHandler(err, res);
    }
}) 

module.exports = router;