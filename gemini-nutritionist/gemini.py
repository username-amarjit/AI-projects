import os
from dotenv import load_dotenv
load_dotenv()
import google.generativeai as genai
genai.configure(api_key=os.environ['GOOGLE_API_KEY'])
model = genai.GenerativeModel("gemini-1.5-flash")
# model = genai.GenerativeModel("gemini-1.5-flash")
# response = model.generate_content("Explain how AI works")
# print(response.text)

# import google.generativeai as genai

# genai.configure(api_key="GEMINI_API_KEY")

# response = model.generate_content("Explain how AI works", stream=True)
# for chunk in response:
#     print(chunk.text, end="")
# Your task is to analyze the food items in the provided food Name and calculate the total calorie content. Additionally, for each food item, please list its details along with the corresponding calorie count. The format should be as follows:

# 1. Item 1 - X calories  
# 2. Item 2 - X calories  
# 3. Item 3 - X calories  
# ...  
# Total Calories: X

base_input_prompt="""
You are an expert nutritionist. Your task is to listen to User then ask him about his routine and daily life.
Then generate a series of questions to ask the user about his food intake and eating habits.
after that provide him with meal plans based on the prefrences of user.
You have to provide the user with a list of food items along with their calorie count. You also provide the user with the total calorie count of the meal plan.
You have to provide the user with the following information for each food item:
1. Item 1 - X calories  
2. Item 2 - X calories  
3. Item 3 - X calories  
               ----"""

def get_gemini_response(input_prompt):
    response = model.generate_content([base_input_prompt,input_prompt])
    print(response.text)
    return response.text