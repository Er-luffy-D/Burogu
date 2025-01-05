import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@piyush_007/medium_cl";
const blogRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRoutes.use(async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
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
      c.set("userId", response.id as string);
      await next();
    } else {
      return c.json({ message: "unauthorized" }, 403);
    }
  } catch (e) {
    return c.json({ message: "unauthorized" }, 403);
  }
});

blogRoutes.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
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

    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: c.get("userId"),
      },
    });
    return c.json(
      {
        id: blog.id,
      },
      200
    );
  } catch (e) {
    return c.json({ message: "Something Unexpected Occur" }, 500);
  }
});

blogRoutes.put("/", async (c) => {
  try {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
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

    const blog = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
        edited: true,
      },
    });
    return c.json(
      {
        id: blog.id,
      },
      200
    );
  } catch (e) {
    return c.json({ message: "Something Unexpected Occur" }, 500);
  }
});

// add pagination
blogRoutes.get("/bulk", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany();
    return c.json({ blogs }, 200);
  } catch (e) {
    return c.json({ message: "Something Unexpected Occur" }, 500);
  }
});

blogRoutes.get("/total", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const totalEntries = await prisma.post.count();
    return c.json(
      {
        count: totalEntries,
      },
      200
    );
  } catch (e) {
    return c.json({ message: "Something Unexpected Occur" }, 500);
  }
});

blogRoutes.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.findFirst({
      where: {
        id: id,
      },
    });
    return c.json(
      {
        blog,
      },
      200
    );
  } catch (e) {
    return c.json({ message: "Something Unexpected Occur" }, 500);
  }
});

export default blogRoutes;
