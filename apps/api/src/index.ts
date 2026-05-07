import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import * as dotenv from "dotenv";
import { db } from "./db";
import { users } from "@tempexpo/db";
import { eq } from "drizzle-orm";
import { z } from "zod";

dotenv.config();

const fastify = Fastify({ logger: true });

fastify.register(cors, { origin: "*" });
fastify.register(jwt, { secret: process.env.JWT_SECRET || "supersecret" });

fastify.get("/health", async (request, reply) => {
  return { status: "ok", db: db ? "connected" : "disconnected" };
});

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

fastify.post("/auth/register", async (request, reply) => {
  const { email, password } = authSchema.parse(request.body);
  
  // Note: in a real app, hash the password using bcrypt/argon2
  const [user] = await db.insert(users).values({
    email,
    passwordHash: password, // Simplified for template
  }).returning();

  const token = fastify.jwt.sign({ id: user.id });
  return { token, user: { id: user.id, email: user.email } };
});

fastify.post("/auth/login", async (request, reply) => {
  const { email, password } = authSchema.parse(request.body);
  
  const [user] = await db.select().from(users).where(eq(users.email, email));
  if (!user || user.passwordHash !== password) {
    return reply.status(401).send({ error: "Invalid credentials" });
  }

  const token = fastify.jwt.sign({ id: user.id });
  return { token, user: { id: user.id, email: user.email } };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    console.log("Server running at http://localhost:3000/");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
