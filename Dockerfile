# Use uma imagem base
FROM nginx:alpine

# Copie os arquivos da aplicação para o diretório do servidor web no contêiner
COPY ./app /usr/share/nginx/html

# Exponha a porta 80
EXPOSE 80

# Adicione dependências, se necessário
RUN apk --no-cache add mysql-client