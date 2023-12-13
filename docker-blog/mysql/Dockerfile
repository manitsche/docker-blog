# mysql/Dockerfile

# Use a imagem base desejada
FROM mysql:latest

# Copie o script SQL para inicialização do banco de dados
COPY init.sql /docker-entrypoint-initdb.d/init.sql

# Exponha a porta do MySQL (não é estritamente necessário para acesso inter-container)
EXPOSE 3306
