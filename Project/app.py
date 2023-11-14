from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/media/<path:filename>')
def media(filename):
    return send_from_directory('media', filename)

if __name__ == '__main__':
    app.run(debug=True)

