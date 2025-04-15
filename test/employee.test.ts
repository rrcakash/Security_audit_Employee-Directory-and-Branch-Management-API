import request from "supertest";
import express from "express";
import employeeRouter from "../src/api/v1/routes/employeesRouter";

const app = express();
app.use(express.json());
app.use("/api/v1/employees", employeeRouter);

describe("Employee API", () => {
  let employeeId: string;

  const validEmployeeData = {
    name: "Michael Johnson",
    position: "HR Manager",
    department: "Human Resources",
    email: "michael.johnson@example.com",
    phone: "4561237890",
    "branchId": 3,
  };
  

  it("should create a new employee", async () => {
    const response = await request(app)
      .post("/api/v1/employees")
      .send(validEmployeeData);
  
    console.log(response.body); // Log the response body for debugging
  
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Employee added");
    expect(response.body.data).toHaveProperty("id");
  
    employeeId = response.body.data.id; // Store employee ID for later tests
  });
  
  

  it("should retrieve the created employee", async () => {
    const response = await request(app).get(`/api/v1/employees/${employeeId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Employee retrieved");
    expect(response.body.data).toHaveProperty("id", employeeId); // Ensure 'id' is returned as part of the data
}); 

  it("should retrieve all employees", async () => {
    const response = await request(app).get("/api/v1/employees");
    console.log("Response body:", response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Employees retrieved");
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should update the created employee", async () => {
    const updatedData = {
      position: "Senior Software Engineer",
    };
  
    const response = await request(app)
      .put(`/api/v1/employees/${employeeId}`)
      .send(updatedData);
  
    console.log("Update Response:", response.body);
  
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Employee updated");
  
    // Ensure response contains 'data' before checking 'position'
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("position", "Senior Software Engineer");
  });
  
  

  it("should delete the created employee", async () => {
    const response = await request(app).delete(`/api/v1/employees/${employeeId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Employee deleted");
  });

  it("should return validation errors for an invalid employee", async () => {
    const invalidEmployee = {
      name: "",
      position: "",
      department: "",
      email: "invalid-email",
      phone: "123",
      branchId: "abc",
    };

    const response = await request(app)
      .post("/api/v1/employees")
      .send(invalidEmployee);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation error");
    expect(Array.isArray(response.body.errors)).toBe(true);
  });
});
