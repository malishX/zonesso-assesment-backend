const express = require("express");
const app = express();
const db = require("./config/db");

// Import routes
const userRoutes = require("./routes/userRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const showroomRoutes = require("./routes/showroomRoutes");
const filterRoutes = require("./routes/filterRoutes");
const vehicleFilterRoutes = require("./routes/vehicleFilterRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/showrooms", showroomRoutes);
app.use("/api/filters", filterRoutes);
app.use("/api/vehicleFilters", vehicleFilterRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

// GET all users
app.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

// Mock data for messages
let messages = [
  { id: 1, chatId: 1, text: "How are you?" },
  { id: 2, chatId: 2, text: "Fine, thank you" }
];
// Mock database
let users = [
  { id: 1, name: "User 1", email: "user1@example.com" },
  { id: 2, name: "User 2", email: "user2@example.com" }
];

// Mock data
let vehicles = [
  { id: 1, make: "Toyota", model: "Corolla" },
  { id: 2, make: "Honda", model: "Civic" }
];

let categories = [
  { id: 1, name: "Sedan" },
  { id: 2, name: "SUV" }
];

let showrooms = [
  { id: 1, name: "Showroom 1", location: "Location 1" },
  { id: 2, name: "Showroom 2", location: "Location 2" }
];

let filters = [
  { id: 1, name: "Color" },
  { id: 2, name: "Price" }
];

let vehicleFilters = [
  { id: 1, vehicleId: 1, filterId: 1 },
  { id: 2, vehicleId: 2, filterId: 2 }
];

let chats = [
  { id: 1, userId: 1, message: "Hello" },
  { id: 2, userId: 2, message: "Hi" }
];




// GET user by ID
app.get("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((user) => user.id === userId);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// POST a new user
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user by ID
app.put("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex !== -1) {
    users[userIndex] = { id: userId, name, email };
    res.status(200).json(users[userIndex]);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// DELETE user by ID
app.delete("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "User not found" });
  }
});
// Vehicle routes
app.get("/api/vehicles", (req, res) => {
  res.status(200).json(vehicles);
});

app.post("/api/vehicles", (req, res) => {
  const { make, model } = req.body;
  const newVehicle = { id: vehicles.length + 1, make, model };
  vehicles.push(newVehicle);
  res.status(201).json(newVehicle);
});

app.put("/api/vehicles/:id", (req, res) => {
  const vehicleId = parseInt(req.params.id);
  const { make, model } = req.body;
  const vehicleIndex = vehicles.findIndex(
    (vehicle) => vehicle.id === vehicleId
  );
  if (vehicleIndex !== -1) {
    vehicles[vehicleIndex] = { id: vehicleId, make, model };
    res.status(200).json(vehicles[vehicleIndex]);
  } else {
    res.status(404).json({ message: "Vehicle not found" });
  }
});

app.delete("/api/vehicles/:id", (req, res) => {
  const vehicleId = parseInt(req.params.id);
  const vehicleIndex = vehicles.findIndex(
    (vehicle) => vehicle.id === vehicleId
  );
  if (vehicleIndex !== -1) {
    vehicles.splice(vehicleIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Vehicle not found" });
  }
});
app.get("/", (req, res) => {
  res.render("index.html");
});

// GET all categories
app.get("/api/categories", (req, res) => {
  res.status(200).json(categories);
});

// GET category by ID
app.get("/api/categories/:id", (req, res) => {
  const categoryId = parseInt(req.params.id);
  const category = categories.find((category) => category.id === categoryId);
  if (category) {
    res.status(200).json(category);
  } else {
    res.status(404).json({ message: "Category not found" });
  }
});

// POST a new category
app.post("/api/categories", (req, res) => {
  const { name } = req.body;
  const newCategory = { id: categories.length + 1, name };
  categories.push(newCategory);
  res.status(201).json(newCategory);
});

// PUT update category by ID
app.put("/api/categories/:id", (req, res) => {
  const categoryId = parseInt(req.params.id);
  const { name } = req.body;
  const categoryIndex = categories.findIndex(
    (category) => category.id === categoryId
  );
  if (categoryIndex !== -1) {
    categories[categoryIndex] = { id: categoryId, name };
    res.status(200).json(categories[categoryIndex]);
  } else {
    res.status(404).json({ message: "Category not found" });
  }
});

// DELETE category by ID
app.delete("/api/categories/:id", (req, res) => {
  const categoryId = parseInt(req.params.id);
  const categoryIndex = categories.findIndex(
    (category) => category.id === categoryId
  );
  if (categoryIndex !== -1) {
    categories.splice(categoryIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Category not found" });
  }
});

// GET all showrooms
app.get("/api/showrooms", (req, res) => {
  res.status(200).json(showrooms);
});

// GET showroom by ID
app.get("/api/showrooms/:id", (req, res) => {
  const showroomId = parseInt(req.params.id);
  const showroom = showrooms.find((showroom) => showroom.id === showroomId);
  if (showroom) {
    res.status(200).json(showroom);
  } else {
    res.status(404).json({ message: "Showroom not found" });
  }
});

// POST a new showroom
app.post("/api/showrooms", (req, res) => {
  const { name, location } = req.body;
  const newShowroom = { id: showrooms.length + 1, name, location };
  showrooms.push(newShowroom);
  res.status(201).json(newShowroom);
});

// PUT update showroom by ID
app.put("/api/showrooms/:id", (req, res) => {
  const showroomId = parseInt(req.params.id);
  const { name, location } = req.body;
  const showroomIndex = showrooms.findIndex(
    (showroom) => showroom.id === showroomId
  );
  if (showroomIndex !== -1) {
    showrooms[showroomIndex] = { id: showroomId, name, location };
    res.status(200).json(showrooms[showroomIndex]);
  } else {
    res.status(404).json({ message: "Showroom not found" });
  }
});

// DELETE showroom by ID
app.delete("/api/showrooms/:id", (req, res) => {
  const showroomId = parseInt(req.params.id);
  const showroomIndex = showrooms.findIndex(
    (showroom) => showroom.id === showroomId
  );
  if (showroomIndex !== -1) {
    showrooms.splice(showroomIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Showroom not found" });
  }
});

// GET all filters
app.get("/api/filters", (req, res) => {
  res.status(200).json(filters);
});

// GET filter by ID
app.get("/api/filters/:id", (req, res) => {
  const filterId = parseInt(req.params.id);
  const filter = filters.find((filter) => filter.id === filterId);
  if (filter) {
    res.status(200).json(filter);
  } else {
    res.status(404).json({ message: "Filter not found" });
  }
});

// POST a new filter
app.post("/api/filters", (req, res) => {
  const { name } = req.body;
  const newFilter = { id: filters.length + 1, name };
  filters.push(newFilter);
  res.status(201).json(newFilter);
});

// PUT update filter by ID
app.put("/api/filters/:id", (req, res) => {
  const filterId = parseInt(req.params.id);
  const { name } = req.body;
  const filterIndex = filters.findIndex((filter) => filter.id === filterId);
  if (filterIndex !== -1) {
    filters[filterIndex] = { id: filterId, name };
    res.status(200).json(filters[filterIndex]);
  } else {
    res.status(404).json({ message: "Filter not found" });
  }
});

// DELETE filter by ID
app.delete("/api/filters/:id", (req, res) => {
  const filterId = parseInt(req.params.id);
  const filterIndex = filters.findIndex((filter) => filter.id === filterId);
  if (filterIndex !== -1) {
    filters.splice(filterIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Filter not found" });
  }
});

// GET all vehicle filters
app.get("/api/vehicleFilters", (req, res) => {
  res.status(200).json(vehicleFilters);
});

// GET vehicle filter by ID
app.get("/api/vehicleFilters/:id", (req, res) => {
  const vehicleFilterId = parseInt(req.params.id);
  const vehicleFilter = vehicleFilters.find(
    (filter) => filter.id === vehicleFilterId
  );
  if (vehicleFilter) {
    res.status(200).json(vehicleFilter);
  } else {
    res.status(404).json({ message: "Vehicle filter not found" });
  }
});

// POST a new vehicle filter
app.post("/api/vehicleFilters", (req, res) => {
  const { vehicleId, filterId } = req.body;
  const newVehicleFilter = {
    id: vehicleFilters.length + 1,
    vehicleId,
    filterId,
  };
  vehicleFilters.push(newVehicleFilter);
  res.status(201).json(newVehicleFilter);
});

// PUT update vehicle filter by ID
app.put("/api/vehicleFilters/:id", (req, res) => {
  const vehicleFilterId = parseInt(req.params.id);
  const { vehicleId, filterId } = req.body;
  const vehicleFilterIndex = vehicleFilters.findIndex(
    (filter) => filter.id === vehicleFilterId
  );
  if (vehicleFilterIndex !== -1) {
    vehicleFilters[vehicleFilterIndex] = {
      id: vehicleFilterId,
      vehicleId,
      filterId,
    };
    res.status(200).json(vehicleFilters[vehicleFilterIndex]);
  } else {
    res.status(404).json({ message: "Vehicle filter not found" });
  }
});

// DELETE vehicle filter by ID
app.delete("/api/vehicleFilters/:id", (req, res) => {
  const vehicleFilterId = parseInt(req.params.id);
  const vehicleFilterIndex = vehicleFilters.findIndex(
    (filter) => filter.id === vehicleFilterId
  );
  if (vehicleFilterIndex !== -1) {
    vehicleFilters.splice(vehicleFilterIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Vehicle filter not found" });
  }
});

//chat endpoints

// GET all chats
app.get("/api/chats", (req, res) => {
  res.status(200).json(chats);
});

// GET chat by ID
app.get("/api/chats/:id", (req, res) => {
  const chatId = parseInt(req.params.id);
  const chat = chats.find((chat) => chat.id === chatId);
  if (chat) {
    res.status(200).json(chat);
  } else {
    res.status(404).json({ message: "Chat not found" });
  }
});

// POST a new chat
app.post("/api/chats", (req, res) => {
  const { userId, message } = req.body;
  const newChat = { id: chats.length + 1, userId, message };
  chats.push(newChat);
  res.status(201).json(newChat);
});

// PUT update chat by ID
app.put("/api/chats/:id", (req, res) => {
  const chatId = parseInt(req.params.id);
  const { userId, message } = req.body;
  const chatIndex = chats.findIndex((chat) => chat.id === chatId);
  if (chatIndex !== -1) {
    chats[chatIndex] = { id: chatId, userId, message };
    res.status(200).json(chats[chatIndex]);
  } else {
    res.status(404).json({ message: "Chat not found" });
  }
});

// DELETE chat by ID
app.delete("/api/chats/:id", (req, res) => {
  const chatId = parseInt(req.params.id);
  const chatIndex = chats.findIndex((chat) => chat.id === chatId);
  if (chatIndex !== -1) {
    chats.splice(chatIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Chat not found" });
  }
});

//meesages endpoints

// GET all messages
app.get("/api/messages", (req, res) => {
  res.status(200).json(messages);
});

// GET message by ID
app.get("/api/messages/:id", (req, res) => {
  const messageId = parseInt(req.params.id);
  const message = messages.find((message) => message.id === messageId);
  if (message) {
    res.status(200).json(message);
  } else {
    res.status(404).json({ message: "Message not found" });
  }
});

// POST a new message
app.post("/api/messages", (req, res) => {
  const { chatId, text } = req.body;
  const newMessage = { id: messages.length + 1, chatId, text };
  messages.push(newMessage);
  res.status(201).json(newMessage);
});

// PUT update message by ID
app.put("/api/messages/:id", (req, res) => {
  const messageId = parseInt(req.params.id);
  const { chatId, text } = req.body;
  const messageIndex = messages.findIndex(
    (message) => message.id === messageId
  );
  if (messageIndex !== -1) {
    messages[messageIndex] = { id: messageId, chatId, text };
    res.status(200).json(messages[messageIndex]);
  } else {
    res.status(404).json({ message: "Message not found" });
  }
});

// DELETE message by ID
app.delete("/api/messages/:id", (req, res) => {
  const messageId = parseInt(req.params.id);
  const messageIndex = messages.findIndex(
    (message) => message.id === messageId
  );
  if (messageIndex !== -1) {
    messages.splice(messageIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Message not found" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
