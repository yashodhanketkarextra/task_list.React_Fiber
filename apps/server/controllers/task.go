package controllers

import (
	"server/services"

	"github.com/gofiber/fiber/v3"
)

type TaskController struct {
	Svc *services.TaskService
}

func NewTaskController(svc *services.TaskService) *TaskController {
	return &TaskController{Svc: svc}
}

func (h *TaskController) CreateTask(c fiber.Ctx) error {
	var body struct {
		Title string `json:"title"`
	}

	if err := c.Bind().JSON(&body); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Title is required"})
	}

	newTask := h.Svc.CreateTask(body.Title)
	return c.Status(201).JSON(newTask)
}

func (h *TaskController) UpdateTask(c fiber.Ctx) error {
	id := fiber.Params[int](c, "id")

	updatedTask, err := h.Svc.UpdateTask(id)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(200).JSON(updatedTask)
}

func (h *TaskController) GetTasks(c fiber.Ctx) error {
	return c.JSON(h.Svc.GetTasks())
}

func (h *TaskController) GetTask(c fiber.Ctx) error {
	id := fiber.Params[int](c, "id")

	task, err := h.Svc.GetTask(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(task)
}

func (h *TaskController) DeleteTask(c fiber.Ctx) error {
	id := fiber.Params[int](c, "id")

	err := h.Svc.DeleteTask(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(204).SendString("Task deleted")
}
