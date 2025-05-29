import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5174' }));

// MongoDB setup
const client = new MongoClient(process.env.MONGO_URI);
let db;
client.connect().then(() => {
  db = client.db(process.env.DB_NAME);
    console.log('Connected to MongoDB');
    console.log('Database name:', process.env.DB_NAME);
});

//add something to test the connection
app.get('/test', (req, res) => {
    res.json({ message: 'MongoDB connection is working!' });
});

//add to my database to test the connection
app.get('/testdb', async (req, res) => {
    if (!db) {
        return res.status(500).json({ error: 'Database not initialized yet' });
    }
    try {
        const testCollection = db.collection('users');
        const result = await testCollection.insertOne({ message: 'Hello, MongoDB!', createdAt: new Date(), name: 'Test User', email: 'bfghfghfgh' });
        console.log(testCollection.find())
        console.log('Test document inserted:', result.insertedId);

        // Return the inserted document ID
        //verify that the document was inserted

        res.json({ message: 'Test document inserted', id: result.insertedId});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Nodemailer transporter (email OTP)
const transporter = nodemailer.createTransport({

  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});

// Twilio client (SMS OTP)
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

// Helper: generate 6-digit OTP
 function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Store OTP in collection with 5-min expiration
async function saveOTP(userId, code) {
  await db.collection('otps').insertOne({
    userId: new ObjectId(userId),
    code,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 5 * 60 * 1000)
  });
}

// Signup route
app.post('/auth/signup', async (req, res) => {
  const { name, email, phone, password } = req.body;
  console.log("Received signup request:", req.body, password);
  if (!name || (!email && !phone))
    return res.status(400).json({ error: 'Name and email or phone required' });
  const users = db.collection('users');
  const existing = await users.findOne({ $or: [{ email }, { phone }] });
  if (existing) return res.status(409).json({ error: 'User already exists' });

  const result = await users.insertOne({ name, email, phone, verified: false });
//   const otp = generateOTP();
//   await saveOTP(result.insertedId, otp);

  // send OTP
//   if (email) {
//     await transporter.sendMail({
//       from: 'no-reply@asyouliketours.com',
//       to: email,
//       subject: 'Your OTP Code',
//       text: `Your OTP is ${otp}`
//     });
//   }
//   if (phone) {
//     await twilioClient.messages.create({
//       to: phone,
//       from: process.env.TWILIO_PHONE,
//       body: `Your OTP is ${otp}`
//     });
//   }

  res.status(201).json({ message: 'OTP sent' });
});

// Login route (request OTP)
app.post('/auth/login', async (req, res) => {
  const { email, phone } = req.body;
  if (!email && !phone)
    return res.status(400).json({ error: 'Email or phone required' });

  const users = db.collection('users');
  const user = await users.findOne({ $or: [{ email }, { phone }] });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const otp = generateOTP();
  await saveOTP(user._id, otp);

  if (user.email) {
    await transporter.sendMail({ from: 'no-reply@asyouliketours.com', to: user.email, subject: 'Your OTP Code', text: `Your OTP is ${otp}` });
  }
  if (user.phone) {
    await twilioClient.messages.create({ to: user.phone, from: process.env.TWILIO_PHONE, body: `Your OTP is ${otp}` });
  }

  res.json({ message: 'OTP sent' });
});

// Verify OTP route
app.post('/auth/verify-otp', async (req, res) => {
  const { userId, code } = req.body;
  if (!userId || !code) return res.status(400).json({ error: 'userId and code required' });

  const otps = db.collection('otps');
  const record = await otps.findOne({ userId: new ObjectId(userId), code });
  if (!record) return res.status(400).json({ error: 'Invalid OTP' });
  if (new Date() > record.expiresAt)
    return res.status(400).json({ error: 'OTP expired' });

  await db.collection('users').updateOne({ _id: new ObjectId(userId) }, { $set: { verified: true } });
  await otps.deleteMany({ userId: new ObjectId(userId) });

  res.json({ message: 'User verified', userId });
});

app.listen(process.env.PORT || 3000, () => console.log('Server running'));
