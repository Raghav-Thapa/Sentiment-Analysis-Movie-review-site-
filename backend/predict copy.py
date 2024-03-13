import joblib
import sys
import json

model = joblib.load('./new_svm.pkl')
vectorizer = joblib.load('./new_vectorizer.pkl')

def predict_sentiment(text):
    text = vectorizer.transform([text])
    prediction = model.predict(text)[0]
    return prediction

if __name__ == '__main__':
    input_data = json.loads(sys.argv[1])
    result = predict_sentiment(input_data)
    print(json.dumps(result))
