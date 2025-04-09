const Warehouse = require("../models/Warehouse");

// exports.getWarehouses = async (req, res) => {
//   try {
//     const warehouses = await Warehouse.find({ owner: req.user.id });
//     res.json(warehouses);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const Warehouse = require("../models/Warehouse");
const path = require("path");
const fs = require("fs");

exports.addWarehouse = async (req, res) => {
  const { name, location, capacity } = req.body;
  const warehouseImage = req.file; // Access the uploaded file

  if (!name || !location || !capacity) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    let imagePath = ""; // Default empty image path

    if (warehouseImage) {
      imagePath = `/uploads/${warehouseImage.filename}`; // Save image path
    }

    const warehouse = await Warehouse.create({
      name,
      location,
      capacity,
      owner: req.user.id,
      image: imagePath,
    });

    res.status(201).json(warehouse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllWarehouses = async (req, res) => {
  // const page = parseInt(req.query.page) || 1;
  // const limit = parseInt(req.query.limit) || 8;
  // const skip = (page - 1) * limit;

  // try {
  //   const warehouses = await Warehouse.find().skip(skip).limit(limit);
  //   const totalWarehouses = await Warehouse.countDocuments();

  //   res.status(200).json({
  //     warehouses,
  //     totalPages: Math.ceil(totalWarehouses / limit),
  //   });
  // } catch (error) {
  //   res.status(500).json({ message: "Failed to fetch warehouses." });
  // }

  try {
    const warehouses = await Warehouse.find();
    res.status(200).json(warehouses);
} catch (error) {
    res.status(500).json({ message: "Failed to fetch warehouses." });
}
};


exports.getWarehousesForOwner = async (req, res) => {


  try {
      const warehouses = await Warehouse.find({ owner: req.user.id });
      res.status(200).json(warehouses);
  } catch (error) {
      res.status(500).json({ message: "Failed to fetch your warehouses." });
  }

  // const { page = 1, limit = 10 } = req.query; // Default values
  //   const ownerId = req.user.id; // Assuming owner ID comes from token
  //   const skip = (page - 1) * limit;

  //   try {
  //       const warehouses = await Warehouse.find({ ownerId })
  //           .skip(skip)
  //           .limit(parseInt(limit));

  //       const totalWarehouses = await Warehouse.countDocuments({ ownerId });

  //       res.status(200).json({
  //           warehouses,
  //           currentPage: parseInt(page),
  //           totalPages: Math.ceil(totalWarehouses / limit),
  //           totalWarehouses
  //       });
  //   } catch (error) {
  //       res.status(500).json({ message: "Error fetching warehouses", error });
  //   }
};

exports.getWarehouseById = async (req, res) => {
  const { id } = req.params;
  // console.log(req.params);
  try {
      const warehouse = await Warehouse.findById(id);

      if (!warehouse) {
          return res.status(404).json({ message: "Warehouse not found." });
      }

      res.status(200).json(warehouse);
  } catch (error) {
      console.error("Error fetching warehouse by ID:", error);
      res.status(500).json({ message: "Server error. Failed to fetch warehouse details." });
  }
};


// exports.editWarehouse = async (req, res) => {
//   const { id } = req.params;
//   const { name, location, capacity } = req.body;
//   const image = req.file ? req.file.path : null; // Image uploaded via multer
//   console.log(req.file.path);
//   try {
//       const warehouse = await Warehouse.findById(id);

//       if (!warehouse) {
//           return res.status(404).json({ message: "Warehouse not found." });
//       }

//       // Update details
//       warehouse.name = name || warehouse.name;
//       warehouse.location = location || warehouse.location;
//       warehouse.capacity = capacity || warehouse.capacity;
//       if (image) {
//           warehouse.image = image; // Update image if provided
//       }
//       console.log(image);
//       await warehouse.save();
//       res.status(200).json({ message: "Warehouse updated successfully.", warehouse });
//   } catch (error) {
//       res.status(500).json({ message: "Failed to update warehouse.", error });
//   }
// };

exports.editWarehouse = async (req, res) => {
  const { id } = req.params;
  const { name, location, capacity } = req.body;

  // Correctly normalize image path to ensure forward slashes
  const image = req.file ? req.file.path.replace(/\\/g, "/") : null;

  try {
    const warehouse = await Warehouse.findById(id);

    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found." });
    }

    // Update details
    warehouse.name = name || warehouse.name;
    warehouse.location = location || warehouse.location;
    warehouse.capacity = capacity || warehouse.capacity;

    if (image) {
      warehouse.image = `/${image}`; // Ensure correct format with leading `/`
    }
    console.log(warehouse.image);
    await warehouse.save();
    res.status(200).json({ message: "Warehouse updated successfully.", warehouse });
  } catch (error) {
    res.status(500).json({ message: "Failed to update warehouse.", error });
  }
};

// Delete Warehouse
exports.deleteWarehouse = async (req, res) => {
  const { id } = req.params;

  try {
      const warehouse = await Warehouse.findByIdAndDelete(id);

      if (!warehouse) {
          return res.status(404).json({ message: "Warehouse not found." });
      }

      res.status(200).json({ message: "Warehouse deleted successfully." });
  } catch (error) {
      res.status(500).json({ message: "Failed to delete warehouse.", error });
  }
};
