### Health Management APP
from dotenv import load_dotenv

load_dotenv() ## load all the environment variables

import streamlit as st
import os
import google.generativeai as genai
from PIL import Image

# GOOGLE_API_KEY = "AIzaSyB9m_Emt2fPHRtziY4ERWpWsw5_ahcr_b4"

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

## Function to load Google Gemini Pro Vision API And get response

def get_gemini_repsonse(input,image,prompt):
    model=genai.GenerativeModel('gemini-1.5-pro-latest')
    response=model.generate_content([input,image[0],prompt])
    return response.text

def input_image_setup(uploaded_file):
    # Check if a file has been uploaded
    if uploaded_file is not None:
        # Read the file into bytes
        bytes_data = uploaded_file.getvalue()

        image_parts = [
            {
                "mime_type": uploaded_file.type,  # Get the mime type of the uploaded file
                "data": bytes_data
            }
        ]
        return image_parts
    else:
        raise FileNotFoundError("No file uploaded")
    
##initialize our streamlit app

st.set_page_config(page_title="Personalized AI Calorie Counting App")

# st.header("Personalized AI Calorie Counter App")
# input=st.text_input("Input Prompt: ",key="input")
# uploaded_file = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png"])
# image=""   
uploaded_file = ""
if uploaded_file is not None:
    image = Image.open(uploaded_file)
    # st.image(image, caption="Uploaded Image.", use_column_width=True)


# submit=st.button("Tell me the total calories")

input_prompt="""
You are an expert nutritionist. Your task is to analyze the food items in the provided image and calculate the total calorie content. Additionally, for each food item, please list its details along with the corresponding calorie count. The format should be as follows:

1. Item 1 - X calories  
2. Item 2 - X calories  
3. Item 3 - X calories  
...  
Total Calories: X
               ----
               ----"""

## If submit button is clicked


def get_submit():
    image_data=input_image_setup(uploaded_file)
    response=get_gemini_repsonse(input_prompt,image_data,input)
    return response

