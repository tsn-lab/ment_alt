import openai
import os

# Set up your OpenAI API key (store it in an environment variable for security)
openai.api_key = "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"

# Define a function to query GPT-4
def query_gpt4(prompt):
    response = openai.chat.completions.create(
        model = "gpt-3.5-turbo",
        messages = [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
        ],
        max_tokens=100,  # Adjust based on how long you want the responses to be
        temperature=0.0,    # Adjust for creativity vs. consistency
        logprobs=1,
    )
    return response['choices'][0]['message']['content']

# Test the function with a simple prompt
user_prompt = "Tell me about the history of the internet."
print("Querying GPT-4 with the following prompt:\n", user_prompt)
gpt4_response = query_gpt4(user_prompt)
print("\nGPT-4 Response:\n", gpt4_response)
