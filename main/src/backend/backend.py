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
ACCESS_ID= "AKIATOBC3PNAGEWM2APL"
mongo_url='mongodb+srv://deadshot:deadshot@cluster0.ptitmlu.mongodb.net/?retryWrites=true&w=majoraccitay'

ACCESS_KEY='kj34Bw63ExuQ8wAv2MwG6+KJAS1qEzUlM57XRPLO'

count=0
textract_client = boto3.client('textract',region_name='ap-south-1',aws_access_key_id=ACCESS_ID,
        aws_secret_access_key= ACCESS_KEY)

def get_plain_text(file_name):
    with open(file_name,"rb") as fobj:
        img_bytes=fobj.read()
    response = textract_client.detect_document_text(
        Document={
            'Bytes' : img_bytes
        }
        )
    doc = Document(response)
    data=''
    for item in response["Blocks"]:
        #print(item)
        if item["BlockType"] == "LINE":
            data=data+item["Text"]
    return [data,file_name]


def write_in_file(file_name,data):
    fin_final_name=(file_name.split('/')[1]).split('.')[0] + ".txt"
    with open("data/"+fin_final_name,"w") as fobj:
        fobj.write(data)


@app.route('/recieve_file', methods=['POST'])
def recieve_file():
    file = request.files['file']  
    file_path="img/"+file.filename
    file.save(file_path) 
    [data,file_name]=get_plain_text(file_path)
    #extract_lineitems(data)
    write_in_file(file_name,data)
    return 'File uploaded successfully'

# #login page
# @app.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     username = data['username']
#     password = data['password']
#     with open("temp.txt","w") as fobj:
#         fobj.write(username +" "+ password)
#
#     # Do something with the strings
#
#     return jsonify({'result': 'success'})

#displaying recipt list
@app.route("/get_reciepts",methods=['POST'])
def get_reciepts():
    print("connecting....")
    client = pymongo.MongoClient(mongo_url)
    db = client["database_01"]
    print("connected.....")

    collection=db["collection_01"]
    reciept_collection =db["collection_02"]
    data = request.get_json()
    print(data)
    name = data["name"]
    print("name -> ",name)
    data1=collection.find({"name":name})
    for i in data1:
        recipts=i["recipts"]
    print(recipts)
    with open("temp.txt","w") as fobj:
        fobj.write(name)
    return jsonify(recipt=recipts)


@app.route("/get_lineitems",methods=['POST'])
def get_lineitems():
    print("connecting....")
    client = pymongo.MongoClient(mongo_url)
    db = client["database_01"]
    print("connected.....")

    collection=db["collection_02"]
    reciept_collection =db["collection_02"]
    data = request.get_json()
    rec_name =data["rec_name"]
    data1 = reciept_collection.find({"rec_name": rec_name })
    print(rec_name)
    for i in data1:
        line_items = i["line_items"]
    #print(line_items)
    with open("temp.txt","w") as fobj:
        fobj.writelines(line_items)
    ret_line=[[i,10] for i in line_items]
    
    return jsonify(line_items=ret_line)

# def extract_lineitems(prompt):
#     global items
#     response = openai.Completion.create(
#         model="text-davinci-003",
#         prompt=prompt + "\ngive the line items from the data:",
#         temperature=0,
#         max_tokens=1024,
#         top_p=1,
#         frequency_penalty=0,
#         presence_penalty=0
#     )
#     data = (response.choices[0].text).split('\n')
#     items = []
#     for i in data:
#         print(i)
#         items.append(i)
#     return items

# Classify items into sustainable and non sustainable
# def create_sustainability_score(items):
#     openai.api_key = os.getenv('API_KEY')
#     response1 = openai.Completion.create(
#         model="text-davinci-003",
#         prompt="\n".join(items)+"\nhow you could create a sustainability score 0f 0-10 with reason for each item in the line items:.",
#         temperature=0,
#         max_tokens=1024,
#         top_p=1,
#         frequency_penalty=0,
#         presence_penalty=0
#     )
#     data= (response1.choices[0].text).split('\n')
#     for i in data:
#         print(i)
#     with open("temp.txt","w") as fobj:
#         for i in data:
#             fobj.write(i)
        
def write_line_items(name,line_items):
    name='name_01'
    print("connecting....")
    client = pymongo.MongoClient(mongo_url)
    db = client["database_01"]
    print("connected.....")

    collection=db["collection_01"]
    reciept_collection =db["collection_02"]

    temp=collection.find({"name":name})
    for i in temp:
        temp1= i["recipts"]


    ltemp1=len(temp1)
    print(ltemp1)
    ltemp1 = ltemp1 + 1
    recipt_name=name+"_"+str(ltemp1)
    recipts = temp1

    # If the value is not already an array, convert it to one
    if not isinstance(recipts, list):
        recipts = [recipts]

    # Add the new receipt to the array
    recipts.append(recipt_name)
    print("recipts: ", recipts)
    # Update the 'recipts' field in the document with the new array
    collection.update_one({"name": name}, {"$set": {"recipts": recipts}})
    # query = {"name": name}
    # data ={ "$push": { "recipts": { "$each": [reciept] } } }
    # collection.update_one(query, data)
    reciept_collection.insert_one({"name" : name,"rec_name":recipt_name,"line_items": line_items})







if __name__ == '__main__':
    # print("connecting....")
    # client = pymongo.MongoClient("mongodb+srv://deadshot:deadshot@cluster0.ptitmlu.mongodb.net/?retryWrites=true&w=majority")
    # db = client["database_01"]
    # print("connected.....")
    #
    # collection=db["collection_01"]
    # reciept_collection =db["collection_02"]
    
    app.run(debug=True)
    
    
