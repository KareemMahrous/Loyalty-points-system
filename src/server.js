import { createApp } from "./app.js";
import { env } from "./infrastructure/config/env.js";

const app = createApp();

app.listen(env.port, () => {
  console.log(`Server running on http://localhost:${env.port}`);
  console.log(`Swagger docs available at http://localhost:${env.port}/api-docs`);
});
