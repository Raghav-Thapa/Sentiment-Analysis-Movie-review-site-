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

# Load the model 
model = joblib.load('./model.pkl')
vectorizer = joblib.load('./vectorizer.pkl')


def predict_sentiment(text):
    text_expanded = contraction_expansion(text)
    text_chars_removed = remove_special_char(text_expanded)
    text_stopwords_removed = stop_words_removal(text_chars_removed)
    text_stemmed = stemming(text_stopwords_removed)
    text_clean = cleaning(text)
    text_vectorized = vectorizer.transform([text_clean])
    vectorized_text = [[int(index), float(score)] for index, score in zip(text_vectorized.nonzero()[1], text_vectorized.data)]
    sentiment = str(model.predict(text_vectorized)[0]) 
    return {
        'sentiment': sentiment,
        'expansion': text_expanded,
        'charactersRemoval': text_chars_removed,
        'stopwordsRemoval': text_stopwords_removed,
        'stemming': text_stemmed,
        'cleanedText': text_clean,
        'vectorizedText': vectorized_text,
    }
    
if __name__ == '__main__':
    if len(sys.argv) > 1:
        input_data = ' '.join(sys.argv[1:])
        result = predict_sentiment(input_data)
        print(json.dumps(result))
    else:
        print("Please provide a text input.")