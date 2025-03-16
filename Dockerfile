FROM node:21 as frontend-builder

WORKDIR /app

COPY ./frontend/package*.json ./

RUN npm install

COPY ./frontend .

RUN npm run build

FROM gradle:jdk22-alpine AS builder

WORKDIR /app

# Copy the Gradle Wrapper files
COPY gradlew .
COPY gradle/wrapper ./gradle/wrapper
COPY gradle/wrapper/gradle-wrapper.jar ./gradle/wrapper/gradle-wrapper.jar
COPY gradle/wrapper/gradle-wrapper.properties ./gradle/wrapper/gradle-wrapper.properties

# Copy the Gradle build files
COPY build.gradle .
COPY settings.gradle .
COPY src ./src

# Copy the frontend assets
COPY --from=frontend-builder /app/dist ./src/main/resources/static

RUN gradle bootJar

FROM eclipse-temurin:22-jre-alpine as runner

WORKDIR /app

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-Dspring.profiles.active=docker", "-jar", "app.jar"]