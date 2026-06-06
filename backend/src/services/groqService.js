const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateCompatibility = async (
  profileA,
  profileB
) => {
  const prompt = `
Analyze compatibility between these two Indian dating profiles.

Consider:

- Shared interests
- City compatibility
- Children preferences
- Relocation preferences
- Family preferences
- Profession compatibility

Profile A:
${JSON.stringify(profileA)}

Profile B:
${JSON.stringify(profileB)}

Return ONLY valid JSON.

Do not use markdown.
Do not use json.
Do not add explanations outside JSON.

Example:

{
  "score": 85,
  "reason": "Shared interests",
  "greenFlags": ["Travel"],
  "yellowFlags": ["Different sleep schedules"]
}
`;

  const completion =
    await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

  return completion.choices[0].message.content;
};

const generateIntroMessage = async (
  profileA,
  profileB
) => {

  const prompt = `
Generate a personalized first introduction message.

Profile A:
${JSON.stringify(profileA)}

Profile B:
${JSON.stringify(profileB)}

Requirements:
- Friendly
- Respectful
- Under 60 words
- Mention shared interests if possible

Return ONLY JSON

{
  "message":"..."
}
`;

  const completion =
    await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8,
    });

  return completion.choices[0].message.content;
};

const getCompatibilityScore = async (
  profileA,
  profileB
) => {

  const prompt = `
Analyze compatibility between
two Indian matrimonial profiles.

Return ONLY JSON

{
  "score": 0-100
}

Profile A:
${JSON.stringify(profileA)}

Profile B:
${JSON.stringify(profileB)}
`;

  const completion =
    await groq.chat.completions.create({
      model:
        "llama-3.3-70b-versatile",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

  const result =
    completion.choices[0]
      .message.content;

  const cleaned = result
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
};

module.exports = {
  generateCompatibility,
  generateIntroMessage,
  getCompatibilityScore,
};