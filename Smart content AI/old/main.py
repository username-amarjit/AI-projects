# main.py
from fastapi import FastAPI, HTTPException

from pydantic import BaseModel
import os

from gemini_handler import get_gemini_response
# Set OpenAI API key
openai.api_key = 'your-openai-api-key-here'

app = FastAPI()

# Define the input model for the social media platform
class SocialMediaRequest(BaseModel):
    platform: str
    content: str

@app.post("/generate-content/")
async def generate_content(request: SocialMediaRequest):
    try:
        # Logic to call ChatGPT based on the platform
        platform = request.platform.lower()
        content = request.content

        if platform == 'twitter':
            prompt = f"Create a catchy tweet based on this content: {content}"
        elif platform == 'instagram':
            prompt = f"Create an engaging Instagram post based on this content: {content}"
        elif platform == 'linkedin':
            prompt = f"Create a professional LinkedIn post based on this content: {content}"
        else:
            raise HTTPException(status_code=400, detail="Unsupported platform")

        # Make API call to OpenAI's GPT-3/4
        response = openai.Completion.create(
            engine="text-davinci-003",  # You can use a different model like GPT-4 if you want
            prompt=prompt,
            max_tokens=100
        )

        generated_text = response.choices[0].text.strip()
        return {"generated_content": generated_text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating content: {e}")

