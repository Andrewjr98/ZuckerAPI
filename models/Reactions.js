const { Schema, Types } = require('mongoose');


const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 25,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      username: {
        type: String
      }
    },
    {
      toJSON: {
        getters: true,
      },
      id: false,
    }
  );
  
  module.exports = reactionSchema;