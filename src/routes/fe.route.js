import express from "express";
import {
  clearFireExtinguisherData,
  exportCsv,
  getFeNos,
  getFireExtinguisherByFeNo,
  updateFireExtinguisherByFeNo,
} from "../controllers/fe.controller.js";

const feRouter = express.Router();

feRouter.route("/").get(getFeNos);

feRouter.route("/export-csv").get(exportCsv);
feRouter.route("/clear-data").patch(clearFireExtinguisherData);

feRouter
  .route("/:fe_no")
  .get(getFireExtinguisherByFeNo)
  .patch(updateFireExtinguisherByFeNo);

export default feRouter;
