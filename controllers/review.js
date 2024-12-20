const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async(req, res) => {
    let id = req.params.id.trim();
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "Review added successfully!!");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req,res) => {
    let id = req.params.id.trim();
    let reviewId = req.params.reviewId.trim();
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!!");
    res.redirect(`/listings/${id}`);
};