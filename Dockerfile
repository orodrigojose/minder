# --- ETAPA 1: Build do React (Frontend) ---
FROM node:20-alpine AS frontend-builder
WORKDIR /build-frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
# Gera a pasta 'dist' ou 'build'
RUN npm run build

# --- ETAPA 2: Build do Spring Boot (Backend) ---
FROM maven:3.9-eclipse-temurin-21 AS backend-builder
WORKDIR /build-backend

# 1. Copia o pom e baixa dependências (cache eficiente)
COPY backend/pom.xml .
RUN mvn dependency:go-offline

# 2. Copia o código fonte
COPY backend/src ./src

# 3. TRUQUE: Copia o build do React para dentro da pasta static do Spring
# Assim o Spring Boot entrega o frontend automaticamente na porta 8080
COPY --from=frontend-builder /build-frontend/dist ./src/main/resources/static

# 4. Empacota tudo em um JAR
RUN mvn clean package -DskipTests

# --- ETAPA 3: Runtime (Imagem final leve) ---
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Criamos um volume para o seu workspace
VOLUME /workspace

# Copia apenas o JAR final da etapa de build
COPY --from=backend-builder /build-backend/target/*.jar app.jar

# Configurações via Environment Variables
# O H2 será salvo na pasta .minder dentro do seu workspace
ENV SPRING_DATASOURCE_URL=jdbc:h2:file:/workspace/.minder/minder;DB_CLOSE_DELAY=-1
ENV MINDER_WORKSPACE=/workspace

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]