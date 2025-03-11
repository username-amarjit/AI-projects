import os
from dotenv import load_dotenv
load_dotenv()
import google.generativeai as genai
genai.configure(api_key=os.environ['GOOGLE_API_KEY'])
model = genai.GenerativeModel("gemini-1.5-flash")


def get_gemini_response(base_input,input_prompt):
    response = model.generate_content([base_input,input_prompt])
    print(response.text)
    return response.text