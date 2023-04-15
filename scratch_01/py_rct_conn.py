from flask import Flask, request, jsonify

app=Flask(__name__)

@app.route('/', methods=['POST'])
def process_input():
    input_string = request.json['inputString']
    # Do something with the input string here
    output = 'Processed input: ' + input_string
    return jsonify({'output': output})

if __name__ == '__main__':
    app.run()