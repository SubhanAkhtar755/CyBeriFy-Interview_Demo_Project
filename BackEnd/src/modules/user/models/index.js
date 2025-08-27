import mongoose, { Schema } from "mongoose";

const dataSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: 6,
    },
    image: {
        url: { type: String },
        public_id: { type: String }
    }
}, {
    timestamps: true,
});

const Model = mongoose.model('User', dataSchema);
export default Model;
