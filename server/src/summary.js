require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


export const createSummary = async (selections)  => {
  let choices = ''

  selections.forEach(choice => {
    choices += `* ${choice.member.name}: `
    choice.selection.forEach((item, index) => {
      choices += `${index+1}. ${item.name} (${item.type}), `
    })
    choices += '\n'
  })

  try {
    const prompt = `
    Here is a list of people and their top 3 meal choices:

    ${choices}

    What is the best meal for this group of people to share?

    Here are some factors to consider:

    * The most popular meal choices
    * The food types that are most popular
    * The meal choices that are most compatible

    Please provide a top choice and a second choice for the meal as well as an explanation why you made that choice based on the user's choices. A meal choice may be either a meal name or a meal type. This app is called "Taste Buds" - it would be nice if your explanation was slightly enthusiastic and made you sound like a buddy. The response needs to be less than 275 characters.

    I 100% need your response to be as a JSON object. It needs to be with these key, value pairs:
    {
      "top_choice": {top meal choice},
      "second_choice": {second meal choice},
      "explanation": {explanation of results},
    }
    `;
  
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "user",
          "content": prompt
        }
      ],
      temperature: 1.2,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
  
    const generatedText = response.data.choices[0].message.content;
    return JSON.parse(generatedText);
  } catch(err) {
    console.log(err)
  }
}