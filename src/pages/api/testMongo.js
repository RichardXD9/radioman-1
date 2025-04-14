import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('radioman-1'); // Use your database name

    // Example: Insert a document into a collection
    const collection = db.collection('testCollection');
    await collection.insertOne({ message: 'Hello from MongoDB!' });

    // Example: Fetch documents
    const data = await collection.find({}).toArray();

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}