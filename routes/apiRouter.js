import express from 'express';
const router = express.Router();

// Import controller modules.
import * as api_controller from "../controllers/apiController.js";

// GET tasks listing.
router.get("/get-tasks", api_controller.task_list);

// GET request for creating a task.
router.get("/add-task", api_controller.task_create_get);

// POST request for creating a task.
router.post("/add-task", api_controller.task_create_post);

// GET request for deleting a task.
router.get("/:id/delete-task", api_controller.task_delete_get);

// POST request for deleting a task.
router.post("/:id/delete-task", api_controller.task_delete_post);

export default router;