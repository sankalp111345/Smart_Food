// const mongoose = require("mongoose");

// const logisticsSchema = mongoose.Schema({
//   name: { type: String, required: true },
//   serviceArea: { type: String, required: true },
//   contact: { type: String, required: true },
//   owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
// }, { timestamps: true });

// module.exports = mongoose.model("Logistics", logisticsSchema);


const mongoose = require("mongoose");

const logisticsSchema = new mongoose.Schema({
  warehouseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Warehouse",
    required: true,
  },
  deliveryPerson: {
    name: { type: String, required: false },
    phone: { type: String, required: false },
    vehicleNumber: { type: String, required: false },
  },
  status: {
    type: String,
    enum: ["Pending", "In Transit", "Delivered"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Logistics", logisticsSchema);