import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        timestamp: {
          type: Number,
        },
      },
    ],
    qrCode: {
      type: String, // Store as SVG string or Data URL
    },
  },
  {
    timestamps: true,
  }
);

const url = mongoose.model("url", urlSchema);

export default url;
