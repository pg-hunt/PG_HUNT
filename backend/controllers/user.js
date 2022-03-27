/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';
import Post from '../models/postModel.js';
import User from '../models/userModel.js';

/**
 * @description returns profile details of the user currently loggedin
 * @access Private
 * @route  GET api/users/profile
 * @param  {}
 * @returns {email,name,phone,isAdmin,isVerified}
 */
const getMyProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      email: user.email,
      name: user.name,
      phone: user.phone,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
    });
  } else {
    res.status(404).send({ message: 'User not found' });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const postid = req.params.id;
    const user = await User.findById(req.user._id);
    const post = await Post.findById(postid);
    if (user && post) {
      const posts = await User.find(
        { _id: user._id },
        { wishlist: { $elemMatch: { pgId: post._id } } }
      );
      if (posts[0]?.wishlist && posts[0]?.wishlist?.length > 0) {
        res.status(400).send({ message: 'Already in wishlist' });
        return;
      }
      User.findByIdAndUpdate(
        user._id,
        {
          $push: {
            wishlist: {
              pgId: post._id,
              pgName: post.name,
              pgAddress: post.address,
              pgAmenities: post.amenities,
              pgPhoto: post.media[0],
            },
          },
        },
        { new: true },
        (err, userRes) => {
          if (err) {
            res.status(400).send(`Operation failed!`);
            return;
          }
          res.json(userRes.wishlist);
        }
      );
    } else if (!user) {
      res.status(404).send({ message: 'User not found' });
    } else {
      res.status(404).send({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(400).send({ message: `Something went wrong ${error}` });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const postid = req.params.id;
    const user = await User.findById(req.user._id);
    const post = await Post.findById(postid);
    if (user && post) {
      User.findByIdAndUpdate(
        user._id,
        { $pull: { wishlist: { pgId: post._id } } },
        { new: true },
        (err, userRes) => {
          if (err) {
            res.status(400).send(`Operation failed!`);
            return;
          }
          res.json(userRes.wishlist);
        }
      );
    } else if (!user) {
      res.status(404).send({ message: 'User not found' });
    } else {
      res.status(404).send({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(400).send({ message: `Something went wrong ${error}` });
  }
};

const viewWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json(user.wishlist);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).send({ message: `Something went wrong ${error}` });
  }
};

export { getMyProfile, addToWishlist, removeFromWishlist, viewWishlist };
