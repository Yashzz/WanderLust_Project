const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

const listingController = require("../controllers/listing.js");

//Listing index route
router.get("/", wrapAsync(listingController.index));

//New route
router.get("/new",isLoggedIn, listingController.renderNewForm);

//Listing show route
router.get("/:id",isLoggedIn, wrapAsync(listingController.showListing)); 

//New route update path - Create route
router.post("/",isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing));

//Edit route
router.get("/:id/edit",isLoggedIn, isOwner, wrapAsync(listingController.editListing));

//Update route
router.put("/:id",isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing));

//Destroy rpute
router.delete("/:id",isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;