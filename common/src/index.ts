import z from "zod";

// user

export const signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
});

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const updateInput = z.object({
  name: z.string().optional(),
  funFact: z.string().optional(),
  password: z.string().min(6).optional(),
});

export type SignupInput = z.infer<typeof signupInput>;

export type SigninInput = z.infer<typeof signinInput>;

export type UpdateInput = z.infer<typeof updateInput>;

// Blogs

export const createBlogInput = z.object({
  title: z.string(),
  content: z.string(),
});

export const updateBlogInput = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
});

export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
