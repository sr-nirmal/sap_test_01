# Flask app
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/send_string', methods=['POST'])
def send_string():
    try:
        data = request.get_json()  # Extract the request body as JSON
        message = data.get('message')  # Extract the 'message' field from JSON

        file=open("temp.txt","w")
        file.writelines([message])

        # Process the message as needed
        # ...
        return jsonify({'status': 'success', 'message': 'String received'})  # Return a JSON response
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500  # Return an error response

if __name__ == '__main__':
    app.run(debug=True)