import { Hono } from "hono";
import userRoutes from "./routes/user";
import blogRoutes from "./routes/blog";
const app = new Hono();
app.route("/api/v1/user", userRoutes);
app.route("/api/v1/blog", blogRoutes);

app.get("/", (c) => {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background: linear-gradient(135deg, #000000 0%, #434343 50%, #000000 100%);
                overflow: hidden;
                color: #ffffff;
            }
            .container {
                text-align: center;
                background: rgba(255, 255, 255, 0.1);
                padding: 2em;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
            }
            h1 {
                font-size: 3em;
                color: #ffffff;
                margin-bottom: 0.5em;
            }
            p {
                font-size: 1.2em;
                color: #cccccc;
                margin: 0.5em 0;
            }
            .emoji {
                font-size: 2em;
                animation: float 3s infinite;
                margin-top: 1em;
            }
            .button {
                display: inline-block;
                padding: 0.5em 1em;
                margin-top: 1em;
                font-size: 1em;
                color: #ffffff;
                background-color: #007bff;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                text-decoration: none;
                transition: background-color 0.3s;
            }
            .button:hover {
                background-color: #0056b3;
            }
            @keyframes float {
                0% { transform: translatey(0px); }
                50% { transform: translatey(-20px); }
                100% { transform: translatey(0px); }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Welcome to the Blogging Site API!</h1>
            <p>Explore our API routes:</p>
            <p>/api/v1/user</p>
            <p>/api/v1/blog</p>
            <div class="emoji">🚀✨📚</div>
            <a href="https://github.com" class="button">Visit our GitHub</a>
        </div>
    </body>
    </html>
    `;
    return c.html(html);
});

export default app;