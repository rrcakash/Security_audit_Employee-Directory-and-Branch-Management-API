import request from "supertest";
import express from "express";
import branchRouter from "../src/api/v1/routes/branchRouter";

const app = express();
app.use(express.json());
app.use("/api/v1/branches", branchRouter);

describe("Branch API", () => {
  let branchId: string;

  it("should create a new branch", async () => {
    const newBranch = {
      name: "Vancouver Branch",
      address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
      phone: "6044560022",
    };

    const response = await request(app).post("/api/v1/branches").send(newBranch);

    console.log("Response status:", response.status); // Log response status
    console.log("Response body:", response.body); // Log response body

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("id");
    branchId = response.body.data.id;
  });

  it("should get a branch by ID", async () => {
    const response = await request(app).get(`/api/v1/branches/${branchId}`);
    console.log("Get Branch Response:", response.body); // Log to check the response structure
  
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(branchId); // Check if the ID is correctly returned
  });
  

  it("should update a branch", async () => {
    const updatedBranch = { address: "456 New Address", phone: "6045551234" }; // Valid phone number format
    const response = await request(app).put(`/api/v1/branches/${branchId}`).send(updatedBranch);

    expect(response.status).toBe(200);
    expect(response.body.data.address).toBe("456 New Address");
  });

  it("should delete a branch", async () => {
    const response = await request(app).delete(`/api/v1/branches/${branchId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Branch deleted");
  });

  it("should return validation errors for an invalid branch", async () => {
    const invalidBranch = { name: "", address: "", phone: "123" };

    const response = await request(app).post("/api/v1/branches").send(invalidBranch);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation error");
    expect(response.body.errors).toBeInstanceOf(Array);
  });
});
