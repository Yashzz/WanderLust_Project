const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let id = req.params.id.trim();
    const listing = await Listing.findById(id).populate({path: "reviews", populate:{path: "author"}}).populate("owner");
    if(!listing) {
        req.flash("error", "Listing does not exist!!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
};

module.exports.createListing = async (req,res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    await newListing.save();
    req.flash("success", "New listing created!!");
    res.redirect("/listings");
};

module.exports.editListing = async (req, res) => {
    let id = req.params.id.trim();
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Listing does not exist!!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", {listing});
};

module.exports.updateListing = async (req, res) => {
    let id = req.params.id.trim();
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    if(typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }
    req.flash("success", "Listing Updated!!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req,res) => {
    let id = req.params.id.trim();
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!!");
    res.redirect("/listings");
};