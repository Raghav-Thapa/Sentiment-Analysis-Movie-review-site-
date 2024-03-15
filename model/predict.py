import joblib
import sys
import json

# Load the model (replace 'model.pkl' with your model file path)
model = joblib.load('./model.pkl')
vectorizer = joblib.load('./vectorizer.pkl')
cleaning = joblib.load('./cleaning_function.pkl')

def predict_sentiment(text):
    # Perform preprocessing and feature extraction if needed
    # Make predictions using the loaded model
    # text_cleaned = cleaning(text)
    cleaned_text = cleaning(text)
    text_vectorized = vectorizer.transform([cleaned_text])
    prediction = model.predict(text_vectorized)[0]
    return prediction

if __name__ == '__main__':
    # Check if there is at least one command line argument
    if len(sys.argv) > 1:
        # Combine all command line arguments into a single string
        input_data = ' '.join(sys.argv[1:])
        result = predict_sentiment(input_data)
        print(result)
    else:
        print("Please provide a text input.")
