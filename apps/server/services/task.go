package services

import (
	"errors"
	"server/models"
	"sync"
	"time"
)

type TaskService struct {
	Tasks  []models.Task
	mu     sync.Mutex
	NextID int
}

func NewTaskService() *TaskService {
	return &TaskService{
		Tasks:  []models.Task{},
		NextID: 1,
	}
}

func (s *TaskService) CreateTask(title string) models.Task {
	s.mu.Lock()
	defer s.mu.Unlock()

	newTask := models.Task{
		ID:        s.NextID,
		Title:     title,
		Completed: false,
		CreatedAt: time.Now(),
	}

	s.Tasks = append(s.Tasks, newTask)
	s.NextID++
	return newTask
}

func (s *TaskService) GetTasks() []models.Task {
	s.mu.Lock()
	defer s.mu.Unlock()
	return s.Tasks
}

func (s *TaskService) GetTask(id int) (models.Task, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	for i, task := range s.Tasks {
		if task.ID == id {
			return s.Tasks[i], nil
		}
	}

	return models.Task{}, errors.New("task not found")
}

func (s *TaskService) UpdateTask(id int) (models.Task, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	for i, task := range s.Tasks {
		if task.ID == id {
			s.Tasks[i].Completed = !task.Completed
			return s.Tasks[i], nil
		}
	}

	return models.Task{}, errors.New("task not found")
}

func (s *TaskService) DeleteTask(id int) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	for i, task := range s.Tasks {
		if task.ID == id {
			s.Tasks = append(s.Tasks[:i], s.Tasks[i+1:]...)
			return nil
		}
	}
	return errors.New("task not found")
}
