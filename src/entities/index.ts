import { superdevClient } from "@/lib/superdev/client";

export const Contact = superdevClient.entity("Contact");
export const Experience = superdevClient.entity("Experience");
export const Project = superdevClient.entity("Project");
export const Skill = superdevClient.entity("Skill");
export const User = superdevClient.auth;
