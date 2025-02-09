import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { signinInput, signupInput, updateInput } from "@piyush_007/medium_cl";

const userRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    email: string;
  };
}>();

userRoutes.post("/signup", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
      return c.json(
        {
          message: "Inputs not Correct",
        },
        411
      );
    }
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });
    if (!user) {
      return c.json({ message: "User not created" }, 500);
    }
    const token = await sign(
      {
        id: user.id,
        email: user.email,
      },
      c.env.JWT_SECRET
    );

    return c.json({ jwt: `Bearer ${token}` }, 200);
  } catch (e) {
    console.log(e);
    return c.json({ message: "Something Unexpected Occur" }, 500);
  }
});

userRoutes.post("/signin", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
      return c.json(
        {
          message: "Inputs not Correct",
        },
        411
      );
    } else {
      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
          password: body.password,
        },
      });
      if (!user) {
        return c.json({ message: "Incorrect Credentials" }, 403);
      }
      const token = await sign(
        {
          id: user.id,
          email: user.email,
        },
        c.env.JWT_SECRET
      );

      return c.json(
        {
          jwt: `Bearer ${token}`,
        },
        200
      );
    }
  } catch (e: any) {
    return c.json(
      {
        message: "Something Unexpected Occur",
      },
      500
    );
  }
});

userRoutes.put(
  "/edit",
  async (c, next) => {
    const authHeader = c.req.header("Authorization") || "";
    if (!authHeader) {
      return c.json({ message: "Authorization header not found" }, 403);
    }
    const parts = authHeader.split(" ");
    if (parts.length < 2) {
      return c.json({ message: "Invalid token" }, 403);
    }
    const token = parts[1];
    try {
      const response = await verify(token, c.env.JWT_SECRET);
      if (response.id) {
        c.set("email", response.email as string);
        await next();
      } else {
        return c.json({ message: "unauthorized" }, 403);
      }
    } catch (e) {
      return c.json({ message: "unauthorized" }, 403);
    }
  },
  async (c) => {
    const body = await c.req.json();
    const { success } = updateInput.safeParse(body);
    if (!success) {
      return c.json(
        {
          message: "Inputs not Correct",
        },
        411
      );
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
      const user = await prisma.user.update({
        where: {
          email: c.get("email"),
        },
        data: {
          name: body.name,
        },
      });
      return c.json(
        {
          message: "Changes Saved",
        },
        200
      );
    } catch (e) {
      return c.json(
        {
          message: "Something Unexpected Occur",
        },
        500
      );
    }
  }
);

userRoutes.get("/me", async (c) => {
  const authHeader = c.req.header("Authorization") || "";
  if (!authHeader) {
    return c.json({ message: "Authorization header not found" }, 403);
  }
  const parts = authHeader.split(" ");
  if (parts.length < 2) {
    return c.json({ message: "Invalid token" }, 403);
  }
  const token = parts[1];
  try {
    const response = await verify(token, c.env.JWT_SECRET);
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = await prisma.user.findFirst({
      where: {
        email: response.email as string,
      },
      select: {
        email: true,
        name: true,
        id: true,
      },
    });
    return c.json(
      {
        user,
      },
      200
    );
  } catch (e) {
    return c.json({ message: "unauthorized" }, 403);
  }
});

export default userRoutes;
