import mongoose from 'mongoose';

const Admin = new mongoose.Schema({
    login: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8
    }
  });

export default mongoose.model('Admin', Admin);