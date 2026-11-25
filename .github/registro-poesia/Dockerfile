FROM python:3.12-slim
RUN pip install --no-cache-dir gunicorn==23.0.0 openpyxl==3.1.5 msoffcrypto-tool==5.4.2 tzdata==2025.2
WORKDIR /app
COPY app.py banca.json ./
USER 10001:10001
EXPOSE 8080
CMD ["gunicorn","--bind","0.0.0.0:8080","--workers","1","--threads","4","--timeout","120","--worker-tmp-dir","/tmp","app:application"]
