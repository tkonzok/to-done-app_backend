import Task from "../models/tasks.js";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import Debug from "debug";
const debug = Debug("tasks")

// Display list of all tasks.
export const task_list = asyncHandler(async (req, res, next) => {
    const allTasks = await Task.find()
      .limit(10)
      .sort({ lastDone: -1 })
      .exec();
  
    res.json( allTasks );
  });

// render add task page GET
export const task_create_get = (req, res) => res.render("task-form", {title: "Create a new Task"});

// render add task page POST
export const task_create_post = [
  // Validate and sanitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("area", "Area must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("interval", "Interval must be a number and not be empty.")
    .trim()
    .isInt({ min: 1 }),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
  // Extract the validation errors from a request.
    const errors = validationResult(req);

    const task = new Task({
      title: req.body.title,
      area: req.body.area,
      interval: req.body.interval,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error tasks.

      res.render("task-form", {
        title: "Create a new Task",
        task: task,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid. Save task.
      await task.save();
      res.redirect("/tasks");
    }
}),
];

// render delete task page GET
export const task_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of task
  const task = await Task.findById(req.params.id).exec();

  if (task === null) {
    // No results
    debug(`id not found: ${req.params.id}`);
    res.redirect("/tasks");
  }

  res.render("task-delete", {
    task: task
  });
});

// Handle task delete on POST.
export const task_delete_post = asyncHandler(async (req, res, next) => {
  // Delete object and redirect to the list of tasks.
  await Task.findByIdAndRemove(req.body.taskid);
  res.redirect("/tasks");
});