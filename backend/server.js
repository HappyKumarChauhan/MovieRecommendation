require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');
const { OpenAI } = require('openai');
const db = require('./db');

const openai = new OpenAI({ 
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
});

// Enable CORS so our React frontend can talk to this backend
fastify.register(cors, { origin: '*' });

fastify.post('/recommend', async (request, reply) => {
    const { preference } = request.body;

    if (!preference) {
        return reply.status(400).send({ error: 'Preference is required' });
    }

    try {
        // 1. Call OpenAI
        const completion = await openai.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                { 
                    role: "system", 
                    content: "You are a movie recommendation assistant. Provide 3-5 movie recommendations based on the user's input. Return ONLY a valid JSON array of objects, where each object has a 'title' and a 'description' string." 
                },
                { role: "user", content: preference }
            ]
        });

        const moviesJsonString = completion.choices[0].message.content;
        
        // 2. Save to SQLite
        const insertQuery = `INSERT INTO recommendations (user_input, recommended_movies) VALUES (?, ?)`;
        db.run(insertQuery, [preference, moviesJsonString], function(err) {
            if (err) console.error("DB Insert Error:", err);
        });

        // 3. Return JSON to Frontend
        return reply.send(JSON.parse(moviesJsonString));

    } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send({ error: 'Failed to fetch recommendations' });
    }
});

// Start the server
const start = async () => {
    try {
        await fastify.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' });
        console.log(`Server running at http://localhost:${process.env.PORT || 3000}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();