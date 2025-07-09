FROM public.ecr.aws/lambda/nodejs:18

# Copia el contenido del proyecto al contenedor
COPY . .

# Instala Sharp con compatibilidad para AWS Lambda (arch linux x64)
RUN npm install --platform=linux --arch=x64 sharp

# Define el handler principal
CMD [ "index.handler" ]
