import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    title: String,
    price: String,
    make: String,
    model: String,
    year: Number,
    mileage: String,
    itemCondition: String,
    availability: String,
    vin: String,
    bodyType: String,
    color: String,
    driveWheelConfiguration: String,
    numberOfDoors: Number,
    fuelType: String,
    vehicleEngine: String,
    vehicleSeatingCapacity: Number,
    vehicleTransmission: String,
    cylinders: Number,
    carFeature: [String],
    carSafetyFeature: [String],
    description: String,
    email: String,
    image: String,
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Check if the model exists before compiling
const bookingModel = mongoose.models["bookings"] || mongoose.model("bookings", bookingSchema);


export default bookingModel;
