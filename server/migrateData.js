import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const migrate = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const result = await mongoose.connection.db.collection('folders').updateMany(
            {},
            [
                {
                    $set: {
                        files: {
                            $map: {
                                input: "$files",
                                as: "file",
                                in: {
                                    $mergeObjects: [
                                        "$$file",
                                        {
                                            content: {
                                                $ifNull: ["$$file.content", "$$file.url", "No content provided"]
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }
            ]
        );

        console.log(`✅ Migration complete. Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
};

migrate();
