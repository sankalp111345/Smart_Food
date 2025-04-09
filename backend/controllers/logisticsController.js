const Logistics = require("../models/Logistics");
const Warehouse = require("../models/Warehouse");

// Create Logistics
exports.createLogistics = async (req, res) => {
  const { warehouseId, deliveryPerson, status } = req.body;

  try {
    const warehouse = await Warehouse.findById(warehouseId);
    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    const newLogistics = new Logistics({
      warehouseId,
      deliveryPerson,
      status,
    });

    await newLogistics.save();
    res.status(201).json({ message: "Logistics created successfully", newLogistics });
  } catch (error) {
    res.status(500).json({ error: "Error creating logistics" });
  }
};

// Get Logistics for a Specific Warehouse Owner
exports.getWarehouseLogistics = async (req, res) => {
  // console.log(req.body.)
  // const { warehouseId } = req.params;

  try {
    const userId = req.user.id;

    // Find warehouses owned by this user
    const warehouses = await Warehouse.find({ owner: userId });

    if (!warehouses.length) {
      return res.status(404).json({ message: "No warehouses found for this user." });
    }
    // const warehouses = await Warehouse.find({ owner: warehouseId });
    // console.log(warehouses)
    const logistics = await Logistics.find({
      warehouseId: { $in: warehouses.map((wh) => wh._id) },
    }).populate("warehouseId");

    res.status(200).json(logistics);
  } catch (error) {
    res.status(500).json({ error: "Error fetching logistics" });
  }
};

// Update Logistics Status
exports.updateLogisticsStatus = async (req, res) => {
  const { logisticsId } = req.params;
  const { status } = req.body;

  try {
    const updatedLogistics = await Logistics.findByIdAndUpdate(
      logisticsId,
      { status },
      { new: true }
    );

    if (!updatedLogistics) {
      return res.status(404).json({ message: "Logistics not found" });
    }

    res.status(200).json(updatedLogistics);
  } catch (error) {
    res.status(500).json({ error: "Error updating logistics status" });
  }
};
