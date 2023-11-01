import express from 'express';
const router = express.Router();

// Import controller modules.
import * as task_controller from "../controllers/taskController.js";

// GET tasks listing.
router.get("/", task_controller.task_list);

// GET request for creating a task.
router.get("/add-task", task_controller.task_create_get);

// POST request for creating a task.
router.post("/add-task", task_controller.task_create_post);

// GET request for deleting a task.
router.get("/:id/delete-task", task_controller.task_delete_get);

// POST request for deleting a task.
router.post("/:id/delete-task", task_controller.task_delete_post);

export default router;