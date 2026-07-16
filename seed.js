import { WaecQuestion } from "./models/WaecQuestion.js";
import { JambQuestion } from "./models/JambQuestion.js";
import { DailyQuiz } from "./models/DailyQuiz.js";
import { waecQuestions, jambQuestions, dailyQuiz } from "./data.js";

export async function seedDatabase() {
  try {
    const waecCount = await WaecQuestion.estimatedDocumentCount();
    const jambCount = await JambQuestion.estimatedDocumentCount();
    const dailyCount = await DailyQuiz.estimatedDocumentCount();

    if (waecCount === 0 && waecQuestions.length > 0) {
      await WaecQuestion.insertMany(waecQuestions);
      console.log("Seeded WAEC questions.");
    }

    if (jambCount === 0 && jambQuestions.length > 0) {
      await JambQuestion.insertMany(jambQuestions);
      console.log("Seeded JAMB questions.");
    }

    if (dailyCount === 0 && dailyQuiz.length > 0) {
      const dailyWithoutId = dailyQuiz.map(({ id, ...q }) => q);
      await DailyQuiz.insertMany(dailyWithoutId);
      console.log("Seeded daily quiz items.");
    }
  } catch (error) {
    console.error("Seeding failed:", error.message);
    // Don't exit, just log and continue
  }
}
