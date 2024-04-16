# Use an official OpenJDK runtime as a parent image
FROM openjdk:17.0.1-jdk-slim

# Set the working directory to /app
WORKDIR /app

RUN ls

COPY . /app

RUN chmod 777 ./gradlew

# Download dependencies
RUN ./gradlew --version

# Build the project
RUN ./gradlew build

# Expose port 8080 (adjust as needed)
EXPOSE 8080

# Command to run your application
CMD ["java", "-jar", "build/libs/CureConnect-0.0.1-SNAPSHOT.jar"]
