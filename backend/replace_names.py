from nltk.tag.stanford import StanfordNERTagger
from nltk.tag.util import untag
from tqdm import tqdm
from faker import Faker
import re
fake = Faker(['en_AU'])


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
tagged = []


st = StanfordNERTagger(
    'stanford-ner/english.all.3class.distsim.crf.ser.gz', 'stanford-ner/stanford-ner.jar')


def replace_names(text):
    newlines = []
    names = []
    fakenames = []
    lines = text.splitlines()
    for line in tqdm(lines):
        tagline = st.tag(line.split())

        for i, tag in enumerate(tagline):

            if tag[1] == "PERSON":
                fake = getFakeFirstName()
                word, classification = tag
                names.append(word)
                fakenames.append(fake)
                # TODO: Check if name is same as last stored, if so, use same fake name.
                newtag = ["", ""]
                if tag[0] in names:
                    newtag[0] = fakenames[names.index(word)]
                    print(newtag[0])
                else:
                    newtag[0] = fakenames[i]

                newtag[1] = classification
                newtag = tuple(newtag)
                tagline[i] = newtag
        newline = " ".join(untag(tagline))
        newlines.append(newline)
    formatted = "\n".join(newlines)
    print(formatted)
    return (formatted, names)
