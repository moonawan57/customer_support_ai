from flask import Flask, render_template, request, jsonify
from google import genai
import os
from dotenv import load_dotenv

# .env file se variables load karein
load_dotenv()

app = Flask(__name__)

# Environment variable se secure tareeqay se key uthaye ga
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

chat_history = []

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message", "")
    
    try:
        response = client.models.generate_content(
            model="gemini-3.6-flash",
            contents=f"You are a helpful and professional customer support AI assistant. Answer the customer's query concisely and helpfully: {user_message}"
        )
        response_message = response.text
    except Exception as e:
        response_message = f"Sorry, I encountered an error connecting to the AI: {str(e)}"

    chat_history.append({"user": user_message, "bot": response_message})
    return jsonify({"response": response_message})

if __name__ == "__main__":
    app.run(debug=True)