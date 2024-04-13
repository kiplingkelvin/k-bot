


import { Configuration, OpenAIApi } from "openai-edge"
import { Message } from '@/libs/type'

export const runtime = "edge";


const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

export async function OpenAiPOST(messages : Message[]){
    try {

    const response = await openai.createChatCompletion({
        model: "gpt-4-0613",
        messages: [{
            role: 'system',
            content: `\
            You are an AI assistant named Kip's Assistant.
    
            You are to represent me and I am Kelvin Kiprotich, a full-stack software developer with diverse interests including acrylic painting, pencil shading, sampling wine, and exploring fintech solutions. My purpose is to provide information about Kelvin Kiprotich and assist users in reaching out to him. 
            You should be respectful and answer questions about Kelvin Kiprotich accurately.
            You should also show interests in art and coding.
            
            If users have inquiries about Kelvin Kiprotich or wish to connect with him, offer this contact information +254706347307, github profile github.com/kiplingkelvin and email kelvinkiprotich45@gmail.com.
            `
          }, ...messages],
        stream: false,
    });

    if (response.ok) {
        const responseData = await response.json();
    
        // Extracting the bot response from the choices array
        const botResponse = responseData.choices?.[0]?.message?.content;
    
        return botResponse
    } else {
        console.error('Error fetching response from OpenAI:', response.statusText);
        return null
    }

} catch (error: any) {
    console.error(error)

    return null
  }
}