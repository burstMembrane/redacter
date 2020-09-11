import nltk
from nltk.tag.stanford import StanfordNERTagger
from nltk.tag.util import untag

from tqdm import tqdm
from faker import Faker
import re
fake = Faker(['en_AU'])

text = "John Rambo is a guy who likes to kill Liam Power"


def getFakeFirstName():
    name = fake.name()
    split = name.split(" ")
    if len(split) == 2:
        first, last = split
    else:
        first = split[0]
        last = split[1]
    return first


def getFakeLastName():
    name = fake.name()
    split = name.split(" ")
    if len(split) == 2:
        first, last = split
    else:
        first = split[0]
        last = split[1]
    return last


file = './test.txt'



formatted, names = replace_names_nltk(text)
print(formatted)
