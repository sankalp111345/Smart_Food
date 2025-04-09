const mongoose = require("mongoose");

const warehouseSchema = mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  image: {
    type: String, // URL or file path for the uploaded image
    required: false, // Optional, since some warehouses may not have images
  },
}, { timestamps: true });

module.exports = mongoose.model("Warehouse", warehouseSchema);
