import os
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse, FileResponse
from pydantic import BaseModel
from gemini_handler import get_gemini_response
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load your Gemini API key from environment variables
# api_key = os.getenv('GEMINI_API_KEY')
# openai.api_key = api_key

# Base prompts for each platform
platform_prompts = {
    'Twitter': "Write a short tweet about: {topic}",
    'Instagram': "Create a catchy Instagram caption with hashtags about: {topic}",
    'LinkedIn': "Write a professional LinkedIn post about: {topic}",
    # Add more platforms as needed
}

class ContentRequest(BaseModel):
    topic: str

@app.get("/")
async def index():
    return FileResponse('static/index.html')

@app.post("/generate_content")
async def generate_content(request: ContentRequest):
    topic = request.topic

    if not topic:
        raise HTTPException(status_code=400, detail="Topic is required")

    results = []
    for platform, prompt_template in platform_prompts.items():
        prompt = prompt_template.format(topic=topic)
        generated_content = get_gemini_response(prompt)
        results.append({'name': platform, 'content': generated_content})

    return JSONResponse(results)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, debug=True)
