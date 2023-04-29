# Flask app
from flask import Flask, request, jsonify
from flask_cors import CORS
import boto3
from trp import Document
import pymongo
from pymongo.errors import DuplicateKeyError

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

app = Flask(__name__)
CORS(app)
@app.route('/recieve_file', methods=['POST'])
def recieve_file():
    file = request.files['file']  
    file_path="img/"+file.filename
    file.save(file_path) 
    [data,file_name]=get_plain_text(file_path)
    write_in_file(file_name,data)
    return 'File uploaded successfully'

#login page 
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    with open("temp.txt","w") as fobj:
        fobj.write(username +" "+ password)

    # Do something with the strings
    
    return jsonify({'result': 'success'})

#displaying recipt list
@app.route("/get_reciepts",methods=['POST'])
def get_reciepts():
    print("connecting....")
    client = pymongo.MongoClient("mongodb+srv://deadshot:deadshot@cluster0.ptitmlu.mongodb.net/?retryWrites=true&w=majority")
    db = client["database_01"]
    print("connected.....")

    collection=db["collection_01"]
    reciept_collection =db["collection_02"]
    data = request.get_json()
    name = data["name"]
    data=collection.find({"name":name})
    for i in data:
        recipts=i["recipts"]
    with open("temp.txt","w") as fobj:
        fobj.write(name)
    return jsonify(recipt=recipts)


@app.route("/get_lineitems",methods=['POST'])
def get_lineitems():
    print("connecting....")
    client = pymongo.MongoClient("mongodb+srv://deadshot:deadshot@cluster0.ptitmlu.mongodb.net/?retryWrites=true&w=majority")
    db = client["database_01"]
    print("connected.....")

    # collection=db["collection_02"]
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
    return jsonify(line_items=line_items)
ACCESS_ID="AKIATOBC3PNAGEWM2APL"
ACCESS_KEY="kj34Bw63ExuQ8wAv2MwG6+KJAS1qEzUlM57XRPLO"

count=0

textract_client = boto3.client('textract',region_name='ap-south-1',aws_access_key_id=ACCESS_ID,
        aws_secret_access_key= ACCESS_KEY)





if __name__ == '__main__':
    
    app.run(debug=True)
    
    