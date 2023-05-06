# Flask app
from flask import Flask, request, jsonify
from flask_cors import CORS
import boto3
from trp import Document
import pymongo
from pymongo.errors import DuplicateKeyError
import os
import openai
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)
load_dotenv()
# mongo_url = os.getenv('MONGO_URI')
# openai.api_key = os.getenv('API_KEY')
# ACCESS_ID=os.getenv('ACCES_ID')
# ACCESS_KEY=os.getenv('ACCESS_KEY')

openai.api_key = "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"
ACCESS_ID = "AKIATOBC3PNAGEWM2APL"
mongo_url = 'mongodb+srv://deadshot:deadshot@cluster0.ptitmlu.mongodb.net/?retryWrites=true'

ACCESS_KEY = 'kj34Bw63ExuQ8wAv2MwG6+KJAS1qEzUlM57XRPLO'

count = 0
textract_client = boto3.client('textract', region_name='ap-south-1', aws_access_key_id=ACCESS_ID,
                               aws_secret_access_key=ACCESS_KEY)


# -----------------------------mongodb to python and to react----------------------------------------------------------
@app.route("/get_lineitems", methods=['POST'])
def get_lineitems():
    
    data = request.get_json()
    rec_name = data["rec_name"]
    print(rec_name)
    # print(line_items)
    line_items=[]
    for i in currentLineItems:
        if(i[0]==rec_name):
            line_items=i[1]
    print(line_items)
    return jsonify(line_items=line_items)
       
    

# displaying recipt list
@app.route("/get_reciepts", methods=['POST'])
def get_reciepts():
    data = request.get_json()
    print(data)
    name = data["name"]
    print("name -> ", name)
    print("current_recipts -> ",currentReciptlist)
    return jsonify(recipt=currentReciptlist)
@app.route("/get_reciepts_score", methods=['POST'])
def get_reciepts_score():
    data = request.get_json()
    print(data)
    name = data["name"]
    print("name -> ", name)
    print("current_recipts -> ",currentReciptlist)
    ret=[int(i[1]) for i in currentReciptlist]
    return jsonify(recipt=ret)


def write_in_file(data, file_name='temp.txt'):
    # fin_final_name = (file_name.split('/')[1]).split('.')[0] + ".txt"
    with open(file_name, "w") as fobj:
        for i in data:
            fobj.write(i)


# -------------------React to python and score to mongodb----------------------------------------------------------
@app.route('/recieve_file', methods=['POST'])
def recieve_file():
    file = request.files['file']
    name = request.form['name']

    file_path = "img/" + file.filename
    file.save(file_path)
    [data, file_name] = get_plain_text(file_path)
    line_items = extract_lineitems(data)
    print("total line items ->", line_items)
    line_items = create_sustainability_score(line_items)
    write_line_items(name, line_items)
    return 'File uploaded successfully'


def get_plain_text(file_name):
    with open(file_name, "rb") as fobj:
        img_bytes = fobj.read()
    response = textract_client.detect_document_text(
        Document={
            'Bytes': img_bytes
        }
    )
    doc = Document(response)
    data = ''
    for item in response["Blocks"]:
        # print(item)
        if item["BlockType"] == "LINE":
            data = data + item["Text"]
    return [data, file_name]


def extract_lineitems(prompt):
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt + "\ngive the line items with only the item name from the data:",
        temperature=0,
        max_tokens=1024,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )
    data = (response.choices[0].text).split('\n')
    items = []
    for i in data:
        items.append(i)
    items = list(filter(None, items))
    return items


# Classify items into sustainable and non sustainable
def create_sustainability_score(items,
                                request="provide a sustaibablity score(as single integer) and reason for each of the line items, all three seperated by colon and donot include spaces in score part"):
    response1 = openai.Completion.create(
        model="text-davinci-003",
        prompt="\n".join(items) + request,
        temperature=0,
        max_tokens=1024,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )
    data = (response1.choices[0].text).split('\n')
    l = []
    data = list(filter(None, data))
    print(data)
    for i in data:
        x = i.split(':')
        temp = [x[0], int(x[1]),x[2]]
        l.append(temp)
    return l

def calculate_score(line_items):
    print("Calculate Score -> ",line_items)
    s=0
    for i in line_items:
        s+=i[1]
    return round(s/len(line_items),2)
def write_line_items(name, line_items):
    print("connecting....")
    client = pymongo.MongoClient(mongo_url)
    db = client["database_01"]
    print("connected.....")

    collection = db["collection_01"]
    reciept_collection = db["collection_02"]

    temp = collection.find({"name": name})
    for i in temp:
        temp1 = i["recipts"]

    ltemp1 = len(temp1)
    print(ltemp1)
    ltemp1 = ltemp1 + 1
    recipt_name = name + "_" + str(ltemp1)
    recipts = temp1

    # If the value is not already an array, convert it to one
    if not isinstance(recipts, list):
        recipts = [recipts]

    # Add the new receipt to the array
    recipts.append(recipt_name)
    # Update the 'recipts' field in the document with the new array
    collection.update_one({"name": name}, {"$set": {"recipts": recipts}})
    # query = {"name": name}
    # data ={ "$push": { "recipts": { "$each": [reciept] } } }
    # collection.update_one(query, data)
    reciept_collection.insert_one({"name": name, "rec_name": recipt_name, "line_items": line_items,"score": calculate_score(line_items)})
    load(name,collection,reciept_collection)
    print("bills -> ", recipts)
    print("line_items ->", line_items)

#-------------------------start----------------------------------------
@app.route("/start", methods=['POST'])
def start():
    data = request.get_json()
    name =data['name']
    global currentName
    currentName=name
    print("connecting....")
    client = pymongo.MongoClient(mongo_url)
    db = client["database_01"]
    print("connected.....")

    collection = db["collection_01"]
    reciept_collection=db["collection_02"]

    data= collection.find({"name": name})
    l=[]
    for i in data:
        l.append(i)
    if(len(l)==0):
        collection.insert_one({"name":name,"recipts":"",'score':""})
    print("name -> ",name)
    load(name,collection,reciept_collection)
    return jsonify(response="success")
#-------------------delete a bill------------------
@app.route("/delete_bill", methods=['POST'])
def delete_bill():
    data = request.get_json()
    bill =data['rec_name']
    name=data['name']
    print(bill)
    client = pymongo.MongoClient(mongo_url)
    db = client["database_01"]
    print("connected.....")

    collection = db["collection_01"]
    reciept_collection=db["collection_02"]
    
    # Delete document with matching rec_name value
    query = {'rec_name': bill}
    result = collection.delete_one(query)
    load(name,collection,reciept_collection)
    # Return status message
    return jsonify(response="success")




#------------------------------load-----------------
def load(name,collection,recipt_collection):
    data= recipt_collection.find({"name" : name})
    rec_names=[]
    scores=[]
    line_items=[]
    for i in data:
        print(i)
        rec_names.append(i['rec_name'])
        scores.append(i['score'])
        line_items.append(i['line_items'])
    data=dict(data)
    print(data)
        #print(i['line_items'])
    global currentReciptlist
    global currentLineItems
    currentReciptlist = []
    currentLineItems = []
    #print(rec_names)
    #print(scores)
    #print(line_items)
    for i in range(len(rec_names)):

        currentReciptlist.append([rec_names[i],int(scores[i])])
        currentLineItems.append([rec_names[i],line_items[i]])
    print(currentLineItems)
    print(currentReciptlist)
    





if __name__ == '__main__':
    # print("connecting....")
    # client = pymongo.MongoClient("mongodb+srv://deadshot:deadshot@cluster0.ptitmlu.mongodb.net/?retryWrites=true&w=majority")
    # db = client["database_01"]
    # print("connected.....")
    
    # collection=db["collection_01"]
    # reciept_collection =db["collection_02"]

    app.run(debug=True)


