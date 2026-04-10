const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) throw new Error("VITE_API_URL is not set");

export class APIClass {
  async getData() {
    return fetch(API_URL + "/tasks").then((res) => res.json());
  }

  async addTask(title: string) {
    return fetch(API_URL + "/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
  }

  async udpateTask(id: number, completed: boolean) {
    return fetch(API_URL + "/tasks/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
  }

  async deleteTask(id: number) {
    return fetch(API_URL + "/tasks/" + id, {
      method: "DELETE",
    });
  }
}
