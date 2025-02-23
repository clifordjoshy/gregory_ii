import json

with open("data2.json") as dfile:
  input_data= json.loads(dfile.read())



word_json = {}
i = 0
group_name = None

while i < len(input_data):
  if input_data[i].startswith("group-"):
    group_name = input_data[i]
    word_json[group_name] = []
    # print(group_name)
    i+=1

  else:
    word = input_data[i]
    i+=1
    pronun = input_data[i]
    if not pronun.startswith("https://"):
      i+=1
      pronun = input_data[i]
    i+=1
    descr = input_data[i]
    if len(descr) < 20:
      # print(repr(descr))
      i+=1
      descr = input_data[i]

    defcount = descr.count("Synonyms")

    if defcount > 1:
      word = f"{word} ({defcount})"
      print(word)

    i+=1
    word_json[group_name].append({
        "word": word,
        # "pronunciation": pronun,
        "description": descr
      }
    )
    # print(word, end=",")


with open("greg.json", "w") as dfile:
  dfile.write(json.dumps(word_json, indent=2))


