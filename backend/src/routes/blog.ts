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
  if (parts.length < 2 || parts[0] !== "Bearer" || parts.length > 2) {
    return c.json({ message: "Invalid token" }, 403);
  }
  const token = parts[1];
  try {
    const response = await verify(token, c.env.JWT_SECRET);
    if (response.id) {
      c.set("userId", response.id as string);
      await next();
    } else {
      return c.json({ message: "Unauthorized" }, 403);
    }
  } catch (e) {
    return c.json({ message: "Unauthorized" }, 403);
  }
});

blogRoutes.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
      return c.json({ message: "Inputs not correct" }, 411);
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: c.get("userId"),
        published: true,
      },
    });
    return c.json({ id: blog.id }, 200);
  } catch (e) {
    console.log(e);
    return c.json({ message: e }, 500);
  }
});

blogRoutes.put("/", async (c) => {
  try {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
      return c.json({ message: "Inputs not correct" }, 411);
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.update({
      where: { id: body.id },
      data: {
        title: body.title,
        content: body.content,
        edited: true,
      },
    });
    return c.json({ id: blog.id }, 200);
  } catch (e) {
    return c.json({ message: "Something unexpected occurred" }, 500);
  }
});

blogRoutes.get("/bulk", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany({
      select: {
        title: true,
        id: true,
        published: true,
        content: true,
        date: true,
        edited: true,
        author: {
          select: { name: true },
        },
      },
    });
    return c.json({ blogs }, 200);
  } catch (e) {
    return c.json({ message: "Something unexpected occurred" }, 500);
  }
});

blogRoutes.get("/total", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const totalEntries = await prisma.post.count();
    return c.json({ count: totalEntries }, 200);
  } catch (e) {
    return c.json({ message: "Something unexpected occurred" }, 500);
  }
});

blogRoutes.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.findFirst({
      where: { id: id },
      select: {
        title: true,
        id: true,
        published: true,
        content: true,
        date: true,
        edited: true,
        author: {
          select: { name: true 
            ,fun_fact: true
          },
        },
      },
    });
    return c.json({ blog }, 200);
  } catch (e) {
    return c.json({ message: "Something unexpected occurred" }, 500);
  }
});

export default blogRoutes;
