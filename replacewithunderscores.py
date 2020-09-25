import re


def replaceWithChar(string, char="_"):
    return re.sub("([a-z])", char, string, flags=re.IGNORECASE)


string = "Hello there"

redacted = replaceWithChar(string, "_")

print(redacted)
