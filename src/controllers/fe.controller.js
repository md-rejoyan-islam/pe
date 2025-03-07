import asyncHandler from "express-async-handler";
import { successResponse } from "../helper/responseHandler.js";
import FireExtinguisherModel from "../models/fe.model.js";

/**
 * @method GET
 * @description Fetch all Fire Extinguisher numbers (FE No.)
 */

export const getFeNos = asyncHandler(async (req, res) => {
  const fenos = await FireExtinguisherModel.find({}).select("feNo");

  successResponse(res, {
    statusCode: 200,
    message: "Fire Extinguisher numbers fetched successfully",
    payload: { data: fenos || [] },
  });
});

/**
 * @method GET
 * @description Fetch Fire Extinguisher details by FE No.
 * @param {string} fe_no - Fire Extinguisher number
 */

export const getFireExtinguisherByFeNo = asyncHandler(async (req, res) => {
  const { fe_no } = req.params;
  const feDetails = await FireExtinguisherModel.findOne({ feNo: fe_no });

  successResponse(res, {
    statusCode: 200,
    message: "Fire Extinguisher details fetched successfully",
    payload: { data: feDetails || {} },
  });
});

/**
 * @method PATCH
 * @description Update Fire Extinguisher details by FE No.
 * @param {string} fe_no - Fire Extinguisher number
 */

export const updateFireExtinguisherByFeNo = asyncHandler(async (req, res) => {
  const { fe_no } = req.params;

  // check if the fire extinguisher exists
  const feExists = await FireExtinguisherModel.exists({ feNo: fe_no });
  if (!feExists) {
    return errorResponse(res, {
      statusCode: 404,
      message: `Fire Extinguisher not found with the provided FE No.= ${fe_no}`,
    });
  }

  const feDetails = await FireExtinguisherModel.findOneAndUpdate(
    { feNo: fe_no },
    {
      ...req.body,
    },
    { new: true }
  );

  successResponse(res, {
    statusCode: 200,
    message: "Fire Extinguisher details updated successfully",
    payload: { data: feDetails || {} },
  });
});

/**
 * @method GET
 * @description Export Fire Extinguisher database as a CSV file
 */

export const exportCsv = asyncHandler(async (req, res) => {
  const feData = await FireExtinguisherModel.find({});

  const csvData = jsonToCSV(
    feData.map((data) => {
      return {
        "FE No.": data.feNo,
        Area: data.area,
        Location: data.location,
        "FE Type": data.feType,
        Capacity: data.capacity,
        "Pressure Condition (Green area)": data.pressureCondition,
        "Safety seal / Pin": data.safetySeal,
        "Maintained free of obstruction": data.maintainedFreeOfObstruction,
        "Clear Tags": data.clearTags,
        "No Physical Damage": data.physicalDamage,
        "Refill Date": data.refillDate,
        "Next refill date": data.nextRefillDate,
        "Date of Inspection": data.inspectionDate,
        Remarks: data.remarks,
      };
    })
  );

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", 'attachment; filename="output.csv"');

  // Send the CSV data as the response
  res.send(csvData);
});

/**
 * @method PATCH
 * @description Clear Fire Extinguisher details
 */

export const clearFireExtinguisherData = asyncHandler(async (req, res) => {
  const query = {
    pressureCondition: null,
    safetySeal: null,
    maintainedFreeOfObstruction: null,
    clearTags: null,
    physicalDamage: null,
    refillDate: null,
    nextRefillDate: null,
    inspectionDate: null,
    remarks: null,
  };

  await FireExtinguisherModel.updateMany({}, query);

  successResponse(res, {
    statusCode: 200,
    message: "Fire Extinguisher details cleared successfully",
  });
});

/**
 * @description Convert JSON data to CSV format
 */

function jsonToCSV(jsonData) {
  // Extract the headers (keys of the first object)
  const headers = Object.keys(jsonData[0]);

  // Create the CSV rows by joining the values of each object
  const rows = jsonData.map((row) =>
    headers.map((header) => row[header]).join(",")
  );

  // Combine headers and rows
  const csv = [headers.join(","), ...rows].join("\n");

  return csv;
}
