from nltk.tag.stanford import StanfordNERTagger
from nltk.tag.util import untag
from nltk.tokenize.treebank import TreebankWordDetokenizer
from tqdm import tqdm
import nltk
from faker import Faker
import re
fake = Faker(['en_AU'])

d = TreebankWordDetokenizer()

# Turn array into sentence


def detokenize(sentence):
    result = ' '.join(sentence).replace(
        ' , ', ',').replace(' .', '.').replace(' !', '!')
    return result.replace(' ?', '?').replace(' : ', ': ').replace(' \'', '\'')


def getFakeFirstName():
    name = fake.name()
    split = name.split(" ")
    if len(split) == 2:
        first, last = split
    else:
        first = split[0]
        last = split[1]
    return first


def replace_with_char(string, char="_"):
    return re.sub("([a-z])", char, string, flags=re.IGNORECASE)


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
    'stanford-ner/english.all.3class.distsim.crf.ser.gz', 'stanford-ner/stanford-ner.jar', encoding='utf-8')


def replace_names_nltk(text, method="fake", replacechar="_"):
    newlines = []
    names = []
    fakenames = []
    lines = nltk.word_tokenize(text, preserve_line=True)
    tagline = nltk.pos_tag(lines)
    namedEnt = nltk.ne_chunk(tagline, binary=False)
    tree = namedEnt.pos()
    for i, tag in enumerate(tree):
        if "PERSON" in tag:
            print(tag[0][0])
            newtag = ["", ""]
            if method == "fake":
                fake = getFakeFirstName()
                names.append(tag)
                fakenames.append(fake)
                if tag[0] in names:
                    newtag[0] = fakenames[names.index(tag[0])]
                else:
                    newtag[0] = fake
            else:
                newtag[0] = replace_with_char(tag[0][0], replacechar)
            newtag[1] = "0"
            newtag = tuple(newtag)
            tagline[i] = newtag
    newline = d.detokenize(untag(tagline))
    # remove whitespace around single quotes with regex
    subbed = re.sub(r'( ’ )', "'", newline)
    newlines.append(subbed)
    formatted = "\n".join(newlines)
    return (formatted, names)


def replace_names(text, method="fake", replacechar="_"):
    newlines = []
    names = []
    fakenames = []
    print(st.tag_sents(text))
    lines = text.splitlines()
    for line in tqdm(lines):
        tagline = st.tag(line.split())
        for i, tag in enumerate(tagline):
            if tag[1] == "PERSON":
                newtag = ["", ""]
                word, classification = tag
                if method == "fake":
                    fake = getFakeFirstName()
                    fakenames.append(fake)
                    names.append(word)
                    if tag[0] in names:
                        newtag[0] = fakenames[names.index(word)]
                        print(newtag[0])
                    else:
                        newtag[0] = fakenames[i]
                else:
                    newtag[0] = replace_with_char(word, replacechar)
                newtag[1] = classification
                newtag = tuple(newtag)
                tagline[i] = newtag
        newline = " ".join(untag(tagline))
        newlines.append(newline)
    formatted = "\n".join(newlines)
    newlines.clear()
    fakenames.clear()
    return (formatted, names)

# TESTING
# teststr = "John Doe walked down the street"
# replaced = replace_names(teststr, "replace")
# print("{0}.\n{1}".format(teststr, replaced[0]))
