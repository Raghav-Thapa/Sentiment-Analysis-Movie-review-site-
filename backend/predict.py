import joblib
import sys
import json
import re
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

# nltk.download('punkt')

porter_stemmer = PorterStemmer()

words = stopwords.words("english")
# words.extend(["a", "an", "the","movie","would", "could", "might", "film","shall"])
# print(len(words))
remove_words = ['aren', "aren't", 'couldn', "couldn't", 'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't", 'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't", 'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't", 'don', "don't", 'should', "should've", 'no', 'nor', 'not',"but", 'do', 'does', 'did', 'doing']
new_list = [i for i in words if i not in remove_words]

def remove_special_char(x):
    return re.sub("[^a-zA-Z_]", " ", x)

def stop_words_removal(x):
    clean_data = []
    for i in x.split(): #tokenize
        if i.strip().lower() not in new_list:
            clean_data.append(i.strip().lower())
    return " ".join(clean_data)

def contraction_expansion(x):
    x = re.sub(r"won\'t", "would not", x)
    x = re.sub(r"can\'t", "can not", x)
    x = re.sub(r"don\'t", "do not", x)
    x = re.sub(r"shouldn\'t", "should not", x)
    x = re.sub(r"needn\'t", "need not", x)
    x = re.sub(r"hasn\'t", "has not", x)
    x = re.sub(r"haven\'t", "have not", x)
    x = re.sub(r"weren\'t", "were not", x)
    x = re.sub(r"mightn\'t", "might not", x)
    x = re.sub(r"didn\'t", "did not", x)
    x = re.sub(r"isn\'t", "is not", x)
    x = re.sub(r"\'re", "are", x)
    x = re.sub(r"\'s", "is", x)
    x = re.sub(r"\'d", "would", x)
    x = re.sub(r"\'ll", "will", x)
    x = re.sub(r"\'t", "not", x)
    x = re.sub(r"\'ve", "have", x)
    x = re.sub(r"\'m", "am", x)
    return x

def stemming(x):
    return ' '.join([porter_stemmer.stem(word) for word in x.split()])

def cleaning(x):
    x = contraction_expansion(x)
    x = remove_special_char(x)
    x = stop_words_removal(x)
    x = stemming(x)
    return x

# Load the model (replace 'model.pkl' with your model file path)
model = joblib.load('./new_svm.pkl')
vectorizer = joblib.load('./new_vectorizer.pkl')

def predict_sentiment(text):
    print(f"Enter review = {text}")
    text_expanded = contraction_expansion(text)
    print(f"After expansion: {text_expanded}")
    text_chars_removed = remove_special_char(text_expanded)
    print(f"After characters removal: {text_chars_removed}")
    text_stopwords_removed = stop_words_removal(text_chars_removed)
    print(f"After stopwords removal: {text_stopwords_removed}")
    text_stemmed = stemming(text_stopwords_removed)
    print(f"After stemming: {text_stemmed}")
    # text_vectorized = vectorizer.transform([text_stemmed])  # Vectorize the preprocessed text
    text_clean = cleaning(text)  # Preprocess the input text
    print(f"\nCleaned Input Sentence: {text_clean}")
    text_vectorized = vectorizer.transform([text_clean])  # Vectorize the preprocessed text
    print(f"\nVectorized Input Sentence:\n{text_vectorized}")
    prediction = model.predict(text_vectorized)[0]
    return prediction

if __name__ == '__main__':
    # Check if there is at least one command line argument
    if len(sys.argv) > 1:
        # Combine all command line arguments into a single string
        input_data = ' '.join(sys.argv[1:])
        result = predict_sentiment(input_data)
        print(f"\nPredicted sentiment = {result}")
    else:
        print("Please provide a text input.")