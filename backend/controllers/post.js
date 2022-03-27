import expressAsyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Post from '../models/postModel.js';
import User from '../models/userModel.js';

/**
 * @description creates a post of PG
 * @route  GET /api/posts/createpost
 * @param  {name: String*, location: {lat*, long*}, description, address*, types: [{share*: String, price*: Number}], gender*: Boys|Girls|Both,
 * meal: {weekdays*: [Breakfast|Lunch|Dinner], weekends*: [Breakfast|Lunch|Dinner], options*: 'Veg-Only'|'Non-Veg'}, maintenance*: Number,
 * gateOpen: String, gateClose: String, amenities: { laundry: Boolean, refrigerator: Boolean, tv: Boolean, wifi: Boolean, bed: Boolean},
 * contact: [Number]+, media: [String]+,}

 * @returns {name: String, address: String, amenities: Object, photo: String(Link)}
 * @access Verified
 */
const createPost = expressAsyncHandler(async (req, res) => {
  try {
    const userid = req.user._id;
    const user = await User.findById(userid);
    const format = {
      name: req.body.name,
      location: {
        lat: req.body.location.lat,
        long: req.body.location.long,
      },
      description: req.body.description,
      address: req.body.address,
      types: req.body.types,
      gender: req.body.gender,
      meal: {
        weekdays: req.body.meal.weekdays,
        weekends: req.body.meal.weekends,
        options: req.body.meal.options,
      },
      maintenance: req.body.maintenance,
      gateOpen: req.body.gateOpen,
      gateClose: req.body.gateClose,
      amenities: {
        laundry: req.body.amenities.laundry,
        refrigerator: req.body.amenities.refrigerator,
        tv: req.body.amenities.tv,
        wifi: req.body.amenities.wifi,
        bed: req.body.amenities.bed,
      },
      contact: req.body.contact,
      media: req.body.media,
      createdBy: {
        userId: userid,
        userName: user.name,
      },
    };
    const post = await Post.create(format);
    if (post) {
      await User.updateOne(
        { _id: userid },
        {
          $push: {
            posts: {
              postId: post._id,
              postName: post.name,
            },
          },
        }
      );
      res.status(201).json({
        name: post.name,
        address: post.address,
        amenities: post.amenities,
        photo: post.media[0],
      });
    } else {
      res.status(400).send({ message: 'Invalid post data' });
    }
  } catch (error) {
    res.status(400).send({ message: `Something went wrong : \n${error}` });
  }
});

/**
 * @description edit a post of PG
 * @route  PUT /api/posts/:id
 * @param  {name: String*, location: {lat*, long*}, description, address*, types: [{share*: String, price*: Number}], gender*: Boys|Girls|Both,
 * meal: {weekdays*: [Breakfast|Lunch|Dinner], weekends*: [Breakfast|Lunch|Dinner], options*: 'Veg-Only'|'Non-Veg'}, maintenance*: Number,
 * gateOpen: String, gateClose: String, amenities: { laundry: Boolean, refrigerator: Boolean, tv: Boolean, wifi: Boolean, bed: Boolean},
 * contact: [Number]+, media: [String]+,}

 * @returns {name: String, address: String, amenities: Object, photo: String(Link)}
 * @access Verified
 */
const editPost = expressAsyncHandler(async (req, res) => {
  try {
    const postid = req.params.id;
    const userid = req.user._id;
    const post = await Post.findOne({
      id: postid,
      'createdBy.userId': userid,
    });
    if (post) {
      post.name = req.body.name || post.name;
      if (req.body.location) {
        post.location.lat = req.body.location.lat || post.location.lat;
        post.location.long = req.body.location.long || post.location.long;
      }
      post.description = req.body.description || post.description;
      post.address = req.body.address || post.address;
      post.types = req.body.types || post.types;
      post.gender = req.body.gender || post.gender;
      if (req.body.meal) {
        post.meal.weekdays = req.body.meal.weekdays || post.meal.weekdays;
        post.meal.weekends = req.body.meal.weekends || post.meal.weekends;
        post.meal.options = req.body.meal.options || post.meal.options;
      }
      post.maintenance = req.body.maintenance || post.maintenance;
      post.gateTimings = req.body.gateTimings || post.gateTimings;
      if (req.body.gateOpen) {
        post.gateOpen = '00:00';
      } else {
        post.gateOpen = req.body.gateOpen || post.gateOpen;
      }
      if (req.body.gateClose) {
        post.gateClose = '23:59';
      } else {
        post.gateClose = req.body.gateClose || post.gateClose;
      }
      if (req.body.amenities) {
        post.amenities.laundry =
          req.body.amenities.laundry || post.amenities.laundry;
        post.amenities.refrigerator =
          req.body.amenities.refrigerator || post.amenities.refrigerator;
        post.amenities.tv = req.body.amenities.tv || post.amenities.tv;
        post.amenities.wifi = req.body.amenities.wifi || post.amenities.wifi;
        post.amenities.bed = req.body.amenities.bed || post.amenities.bed;
      }
      if (req.body.contact && req.body.contact.length > 0) {
        post.contact = req.body.contact || post.contact;
      }
      post.media = req.body.media || post.media;
    } else {
      res.status(400).send({ message: 'Post not found' });
    }
    Post.findByIdAndUpdate(
      { _id: post._id },
      { $set: post },
      { new: true },
      (err, postRes) => {
        if (err) {
          res.status(400).send({ message: 'Update unsuccessful!' });
        }
        res.json({
          name: postRes.name,
          address: postRes.address,
          amenities: postRes.amenities,
          photo: postRes.media[0],
        });
      }
    );
  } catch (error) {
    res.status(400).send({ message: `Something went wrong : \n${error}` });
  }
});

/**
 * @description deletes a post of PG
 * @route  DELETE /api/posts/:id
 * @param {}
 * @returns [{postId: ObjectId, postName: String}]
 * @access Verified
 */
const removePost = expressAsyncHandler(async (req, res) => {
  try {
    const postid = req.params.id;
    const userid = req.user._id;
    const post = await Post.findOne({ id: postid, 'createdBy.userId': userid });
    if (post) {
      await Post.deleteOne({ _id: postid });
      User.findByIdAndUpdate(
        userid,
        { $pull: { posts: { postId: postid } } },
        { new: true },
        (err, userRes) => {
          if (err) {
            res.status(400).send(`Deletion unsuccessful!`);
          }
          res.json(userRes.posts);
        }
      );
    } else {
      res.status(404).send({ message: 'post not found' });
    }
  } catch (error) {
    res.status(400).send({ message: `Something went wrong` });
  }
});

/**
 * @description View a certain post of PG
 * @route  GET /api/posts/:id
 * @param  {}
 * @returns {name: String,
        location: Object,
        description: String,
        address: String,
        types: [Object],
        gender: String,
        meal: {weekdays*: [Breakfast|Lunch|Dinner], weekends*: [Breakfast|Lunch|Dinner], options*: 'Veg-Only'|'Non-Veg'},
        maintenance: Number,
        gateOpen: String,
        gateClose: String,
        amenities: Object(Boolean - laundry, refrigerator, tv, wifi, bed),
        media: [String]+,
        contact: [Number]+,
        createdBy: {userId: ObjectId, userName: String},
        createdAt: Timestamp,}
 * @access Verified
 */
const viewPost = expressAsyncHandler(async (req, res) => {
  try {
    const postid = req.params.id;
    const post = await Post.findById(postid);
    if (post) {
      res.json({
        name: post.name,
        location: post.location,
        description: post.description,
        address: post.address,
        types: post.types,
        gender: post.gender,
        meal: post.meal,
        maintenance: post.maintenance,
        gateOpen: post.gateOpen,
        gateClose: post.gateClose,
        amenities: post.amenities,
        media: post.media,
        contact: post.contact,
        createdBy: post.createdBy,
        createdAt: post.createdAt,
      });
    } else {
      res.status(400).send({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(400).send({ message: `Something went wrong : \n${error}` });
  }
});

/**
 * @description View all posts of PGs by a host
 * @route  GET /api/posts/
 * @param  {}
 * @returns [{name: String,
        address: String,
        photo: String,}]
 * @access Verified
 */
const viewPosts = expressAsyncHandler(async (req, res) => {
  try {
    const userid = req.user._id;
    const user = await User.findById(userid);
    const posts = await Post.find({ 'createdBy.userId': user._id });
    const postList = [];
    posts.forEach((post) => {
      postList.push({
        postid: post.id,
        name: post.name,
        address: post.address,
        photo: post.media[0],
      });
    });
    res.json(postList);
  } catch (error) {
    res.status(400).send({ message: `Something went wrong : \n${error}` });
  }
});

/**
 * @description View all posts of PGs within 500km from a given location
 * @route  POST /api/posts/search
 * @param  {{location: String, searchText: String,}}
 * @returns [{name: String,
        address: String,
        photo: String,}]
 * @access Verified
 */
const searchPosts = expressAsyncHandler(async (req, res) => {
  try {
    const postList = [];
    const searchText = req.body.searchText;
    const posts = await Post.find({
      $or: [
        { address: { $regex: new RegExp(searchText, 'i') } },
        { name: { $regex: new RegExp(searchText, 'i') } },
      ],
    });
    posts.forEach((post) => {
      postList.push({
        postid: post.id,
        name: post.name,
        address: post.address,
        photo: post.media[0],
      });
    });
    res.json(postList);
  } catch (error) {
    res.status(400).send({ message: `Something went wrong : \n${error}` });
  }
});

export { createPost, editPost, removePost, viewPost, viewPosts, searchPosts };
