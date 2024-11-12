
import openai
import pandas as pd
import numpy as np

engine = "gpt-4o"

def act(text):
    openai.api_key = "sk-8fvnXm0NjyFKNvXunEPlBsh4sumUvsKlGPx_hfRE9mT3BlbkFJFWLfMPGT-5w45QHjFLaQ5FQtXXODu3MuNT57SDI9cA"
    response = openai.Completion.create(
        engine = engine,
        prompt = text,
        max_tokens = 1,
        temperature = 0.0,
        logprobs=22,
    )
    return response.choices[0].text.strip(), response.choices[0].logprobs.top_logprobs[0]

tasks = []

default_question = "Q: The reason responders in the Ultimatum Game reject offers is because of \n\n"

task1 = default_question + "- Option F: Fairness.\n"\
"- Option G: Anger.\n"\
"- Option H: Spite.\n"\
"- Option I: Emotions.\n"\
"- Option L: Equality.\n"\
"- Option M: Stakes.\n"\
"- Option N: Money.\n"\
"- Option O: Social status.\n"\
"- Option C: Entitlements.\n"\
"- Option D: Cheap talk.\n"\
"- Option E: Desire to punish.\n"\
"- Option P: Responders' intentions.\n"\
"- Option Q: Norm enforcement.\n"\
"- Option S: Reputation.\n"\
"- Option R: Moral norms.\n"\
"- Option T: Risk preferences.\n"\
"- Option U: Cognitive biases.\n"\
"- Option V: Cultural factors.\n"\
"- Option W: Anonymity.\n"\
"- Option Z: Strategic considerations.\n"\
"- Option K: Benevolence.\n"\
"- Option J: Social norms.\n" +  "\nA: Option"
tasks.append(task1)

data = []
for i, task in enumerate(tasks):
    print(task)
    action, log_probs = act(task)
    print(log_probs)
    row = [i+1, action, log_probs[" F"], log_probs[" P"]]
    print(row)
    data.append(row)
df = pd.DataFrame(data, columns=['task', 'action', 'logprobA', 'logprobB'])
print(df)

#df.to_csv('data/' + engine + '/experiment.csv')

