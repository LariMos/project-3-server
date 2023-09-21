import { connection } from 'mongoose';
import CarListing from '../models/CarListing';
import { results } from './Car_info.json';
import connectToMongoDB from './connection';
import fs from 'fs';

async function seedData() {
  try {
    const carListings = results; // Access the car listings from the "results" key

    for (let i = 0; i < carListings.length; i++) {
      const carListing = new CarListing(carListings[i]);
      await carListing.save();
      console.log('Inserted car listing:', carListing);
    }

    console.log('Data seeded successfully');
    connection.close();
  } catch (error) {
    console.error('Error seeding data:', error);
    connection.close();
  }
}

async function seed() {
  try {
    await connectToMongoDB(); // Call the connectToMongoDB function to establish the database connection
    await seedData(); // Call the seedData function to seed the data
  } catch (error) {
    console.error('Error:', error);
  }
}

seed();