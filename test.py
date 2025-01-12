import google.generativeai as genai

genai.configure(api_key="AIzaSyB9m_Emt2fPHRtziY4ERWpWsw5_ahcr_b4")
# model = genai.GenerativeModel("gemini-1.5-flash")
# response = model.generate_content("Explain how AI works")
# print(response.text)

# import google.generativeai as genai

# genai.configure(api_key="GEMINI_API_KEY")

model = genai.GenerativeModel("gemini-1.5-flash")
response = model.generate_content("Explain how AI works", stream=True)
for chunk in response:
    print(chunk.text, end="")