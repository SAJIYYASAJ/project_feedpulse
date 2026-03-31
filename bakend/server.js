// 1️⃣ Imports
const express = require("express");
const cors = require("cors");

const app = express();

// 2️⃣ Middleware
app.use(cors());
app.use(express.json());

// 3️⃣ Temporary data store
let feedbacks = [];

// 4️⃣ POST (create feedback)
app.post("/api/feedback", (req, res) => {
  const { title, description, category } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ success: false, message: "Title is required" });
  }

  if (!description || description.trim().length < 20) {
    return res.status(400).json({ success: false, message: "Description must be at least 20 characters" });
  }

  const newFeedback = {
    id: Date.now(),
    title,
    description,
    category: category || "Other",
    status: "New"
  };

  feedbacks.push(newFeedback);

  res.json({ success: true, data: newFeedback });
});

// 5️⃣ GET all feedbacks
app.get("/api/feedback", (req, res) => {
  res.json({ success: true, data: feedbacks });
});

// 6️⃣ GET single feedback
app.get("/api/feedback/:id", (req, res) => {
  const item = feedbacks.find(f => f.id == req.params.id);

  if (!item) {
    return res.status(404).json({ success: false, message: "Feedback not found" });
  }

  res.json({ success: true, data: item });
});

// 7️⃣ PATCH (update status)
app.patch("/api/feedback/:id", (req, res) => {
  const item = feedbacks.find(f => f.id == req.params.id);

  if (!item) {
    return res.status(404).json({ success: false, message: "Feedback not found" });
  }

  item.status = req.body.status || item.status;

  res.json({ success: true, data: item });
});

// 8️⃣ Server start (LAST)
app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});