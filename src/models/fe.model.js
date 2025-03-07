import mongoose from "mongoose";

const fireExtinguisherSchema = new mongoose.Schema(
  {
    feNo: { type: String, required: true, unique: true },
    area: { type: String, required: true },
    location: { type: String, required: true },
    feType: { type: String, required: true },
    capacity: { type: String, required: true },
    pressureCondition: { type: String },
    safetySeal: { type: String, default: null },
    maintainedFreeOfObstruction: { type: String, default: null },
    clearTags: { type: String, default: null },
    physicalDamage: { type: String, default: null },
    refillDate: { type: String, default: null },
    nextRefillDate: { type: String, default: null },
    inspectionDate: { type: String, default: null },
    remarks: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

const FireExtinguisherModel = mongoose.model(
  "FireExtinguisher",
  fireExtinguisherSchema
);

export default FireExtinguisherModel;
