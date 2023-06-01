#!/usr/bin/env bash
# exit on error
set -o errexit

python -m pip install --upgrade pip

pip install -r requirements.txt

python manage.py makemigrations 
python manage.py migrate
gunicorn --config gunicorn-cfg.py chessRush.wsgi --reload 
