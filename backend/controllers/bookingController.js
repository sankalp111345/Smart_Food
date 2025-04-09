const Warehouse = require('../models/Warehouse');
const Booking = require('../models/Booking');
const Logistics = require('../models/Logistics');
const Notification = require('../models/Notification');


exports.createBooking = async (req, res) => {
  const { warehouseId, capacityRequested } = req.body;
  console.log(capacityRequested);
  try {
    const warehouse = await Warehouse.findById(warehouseId);
    // console.log(warehouse)
    if (!warehouse) {
      return res.status(404).json({ error: "Warehouse not found" });
    }

    if (capacityRequested > warehouse.capacity) {
      return res.status(400).json({ error: "Insufficient warehouse capacity" });
    }

    const booking = new Booking({
      warehouseId,
      farmerId: req.user.id, // Assuming `req.user` contains the logged-in farmer's ID
      capacityRequested,
      bookingDate: new Date()
    });

    await booking.save();
    

    // Update warehouse capacity
    warehouse.capacity -= capacityRequested;
    await warehouse.save();
    console.log(booking._id);
    console.log(warehouse.owner);

    try {
      await Promise.all([
          // Logistics.create({
          //     warehouseId: warehouseId.toString(),
          //     bookingId: booking._id.toString(),
          //     status: "Pending",
          //     deliveryPerson: { name: "", phone: "", vehicleNumber: "" }
          // }),
          Notification.create({
              warehouseOwnerId: warehouse.owner.toString(),
              message: `New logistics request for warehouse: ${warehouse.name}. Please manage logistics.`
          })
      ]);
  } catch (error) {
      console.error("Error creating logistics or notification:", error);
      res.status(500).json({ message: "Error processing request." });
  }
  


    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    // console.log(error)
    res.status(500).json({ error: "Error processing booking request" });
  }
};

exports.getFarmerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ farmerId: req.user.id }).populate('warehouseId');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Error fetching bookings" });
  }
};
