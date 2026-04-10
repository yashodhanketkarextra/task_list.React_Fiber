package main

import (
	"server/controllers"
	"server/services"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
)

func main() {
	app := fiber.New()
	app.Use(cors.New())
	handleTask(app)

	app.Listen(":5000")
}

func handleTask(app *fiber.App) *controllers.TaskController {
	taskSvc := services.NewTaskService()
	taskCtrl := controllers.NewTaskController(taskSvc)

	app.Post("/tasks", taskCtrl.CreateTask)
	app.Put("/tasks/:id", taskCtrl.UpdateTask)
	app.Get("/tasks", taskCtrl.GetTasks)
	app.Get("/tasks/:id", taskCtrl.GetTask)
	app.Delete("/tasks/:id", taskCtrl.DeleteTask)

	return taskCtrl
}
