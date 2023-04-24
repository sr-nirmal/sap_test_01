# Flask app
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)




@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']  # Access the uploaded file from the request's files object
    # Save or process the file as needed
    file.save(file.filename)  # Save the file to a specific location
    return 'File uploaded successfully'


if __name__ == '__main__':
    app.run(debug=True)