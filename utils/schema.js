import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const MockInterview=pgTable('mockInterview',{
    id:serial('id').primaryKey(),
    jsonMockResp:text('jsonMockResp').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDesc:varchar('jobDesc').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt'),
    mockId:varchar('mockId').notNull()
})

export const UserAnswer=pgTable('userAnswer',{
    id:serial('id').primaryKey(),
    mockIdRef:varchar('mockId').notNull(),
    question:varchar('question').notNull(),
    correctAns:text('correctAns'),
    userAns:text('userAns'),
    feedback:text('feedback'),
    rating:varchar('rating'),
    userEmail:varchar('userEmail'),
    createdAt:varchar('createdAt'),

})

export const Feedback = pgTable("feedbacks", {
    id: serial("id").primaryKey(),
    userEmail: varchar("userEmail").notNull(),
    userName: varchar("userName").notNull(),
    message: text("message").notNull(),
    rating: varchar("rating"),
    createdAt: timestamp("createdAt").defaultNow(),
  });
  
  export const ContactMessage = pgTable("contact_messages", {
    id: serial("id").primaryKey(),
    userEmail: varchar("userEmail").notNull(),
    userName: varchar("userName").notNull(),
    subject: varchar("subject").notNull(),
    message: text("message").notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
  });

