// Purpose: This file handles all calls to the SpaceX REST API.
// Keeping API code isolated like this ensures:
// - Clean separation of concerns
// - Reusable API functions
// - Easier testing
// - Clear architecture (frontend service layer)

import axios from "axios";

const API = axios.create({
  baseURL: "https://api.spacexdata.com/v4",
});

// Fetch all launches
export const fetchLaunches = () => API.get("/launches");

// Fetch rockets
export const fetchRockets = () => API.get("/rockets");

// Fetch a single launch by ID
export const fetchLaunchById = (id) => API.get(`/launches/${id}`);