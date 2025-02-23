import csv
import json

#read from a csv file

magoo_words = []


html_format = """<p><span style="font-size: 18px"><strong>{part}:</strong></span></p>\r\n\r\n<ul>\r\n\t<li><span style="font-size: 18px">{definition}</span></li>\r\n</ul>\r\n\r\n<p><em><span style="font-size: 18px">{example}</span></em></p>
"""

addon_definition="""\r\n\r\n<hr />\r\n<p><span style="font-size: 18px"><strong>{part}:</strong></span></p>\r\n\r\n<ul>\r\n\t<li><span style="font-size: 18px">{definition}</span></li>\r\n</ul>\r\n\r\n<p><span style="font-size: 18px"><em>{example}</em></span></p>"""


def fix_example (example, word):
    upper_case = f"{word[0:1].upper()}{word[1:]}"
    return example.replace(word, f"<u>{word}</u>").replace(upper_case, f";<u>{upper_case}</u>")


with open("magooshwords.csv") as cf:
  for line in csv.reader(cf):
    word = line[1]
    definition = line[2]
    part = line[3]
    example = line[4]
    underlined_example = fix_example(example, word)

    existing_word = next((m for m in magoo_words if m["word"] == word), None)

    if existing_word is None:
      html_des = html_format.format(part=part, definition=definition, example=underlined_example)
      magoo_words.append(
        {
          "word": word,
          "description": html_des
        }
      )
    else:
      existing_word["description"] += addon_definition.format(part=part, definition=definition, example=underlined_example)


with open("greg.json") as gj:
  greg_words = json.loads(gj.read())

filtered_magoo = []

for mw in magoo_words:
  greg_version = next((g for g in greg_words if g["word"] == mw["word"]), None)
  if greg_version is None:
    # this word is unique
    filtered_magoo.append(mw)
  else:
    print(f"dropping word {mw['word']}")


with open("magoo.json", "w") as dfile:
  dfile.write(json.dumps(filtered_magoo, indent=2))


