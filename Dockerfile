FROM python:3.9

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt .
# install python dependencies
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY ./slep /app

# running migrations
# RUN python manage.py migrate



# gunicorn
CMD ["gunicorn", "--config", "gunicorn-cfg.py", "slep.wsgi"]