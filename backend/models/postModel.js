import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        location: {
            lat: {
                type: String,
            },
            long: {
                type: String,
            },
        },
        description: {
            type: String,
            required: true,
        },
        address: {
            type: String,
        },
        types: [
            {
                share: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                required: true,
            },
        ],
        gender: {
            type: String,
            enum: ["Boys", "Girls", "Both"],
            required: true,
        },
        meal: {
            weekdays: [{
                type: String,
                enum: ["Breakfast", "Lunch", "Dinner"],
                required: true,
            }],
            weekends: [{
                type: String,
                required: true,
            }],
            options: {
                type: String,
                enum: ["Veg Only", "Non-Veg"],
                required: true,
            }
        },
        maintenance: {
            type: Number,
            required: true,
        },
        gateTimings: {
            type: Boolean,
            required: true,
        },
        gateOpen: {
            type: String, 
        },
        gateClose: {
            type: String,
        },
        amenities: {
            laundry: {
                type: Boolean,
                default: false,
            },
            refrigerator: {
                type: Boolean,
                default: false,
            },
            tv: {
                type: Boolean,
                default: false,
            },
            wifi: {
                type: Boolean,
                default: false,
            },
            bed: {
                type: Boolean,
                default: false,
            },
        },
        contact: [{ type: Number, required: true }],
        media: [
            {
                link: {
                    type: String,
                    required: true,
                },
                mediaType: {
                    type: String,
                    enum: ["image", "video"],
                    required: true,
                },
            }
        ],
        verified: {
            type: Boolean,
            default: false,
        },
    }
);