FROM node:20-alpine AS frontend-builder
WORKDIR /build-frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM maven:3.9-eclipse-temurin-21 AS backend-builder
WORKDIR /build-backend

COPY backend/pom.xml .
RUN mvn dependency:go-offline

COPY backend/src ./src

COPY --from=frontend-builder /build-frontend/dist ./src/main/resources/static

RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

VOLUME /workspace

COPY --from=backend-builder /build-backend/target/*.jar app.jar

ENV SPRING_DATASOURCE_URL=jdbc:h2:file:/workspace/.minder/database/Data.db;DB_CLOSE_DELAY=-1
ENV MINDER_WORKSPACE=/workspace/.minder/nodes

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "mkdir -p /workspace/.minder/database /workspace/.minder/nodes && java -jar app.jar"]