import json
import csv

with open ("flags.csv", "r") as f:
    reader = csv.reader(f)
    data = {"flags": []}
    for row in reader:
        data["flags"].append({"card": row[0]})

with open ("test.json", "w") as f:
    json.dump(data, f, indent=4)
