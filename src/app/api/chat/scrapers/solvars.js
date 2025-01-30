// /app/api/chat/scrapers/solvars.js

import axios from "axios";
import cheerio from "cheerio";

// Function to scrape Solvars.com data
export const fetchSolvarsData = async () => {
  try {
    const { data } = await axios.get("https://solvars.com/"); // Request Solvars homepage
    const $ = cheerio.load(data); // Load HTML into Cheerio

    // Extract relevant sections, adjust based on actual website structure
    const aboutText = $("section.about").text().trim(); // Adjust selector as needed
    const servicesText = $("section.services").text().trim(); // Adjust selector as needed

    return { aboutText, servicesText }; // Return extracted data
  } catch (error) {
    console.error("Error scraping Solvars website:", error);
    return null;
  }
};
