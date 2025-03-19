import os
from dotenv import load_dotenv
load_dotenv()
import google.generativeai as genai
genai.configure(api_key=os.environ['GEMINI_API_KEY'])
model = genai.GenerativeModel("gemini-1.5-flash")


def get_gemini_response(input_prompt):
    response = model.generate_content([input_prompt])
    print(response.text)
    return response.text