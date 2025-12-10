#!/bin/bash

echo "🚀 Construyendo todos los servicios..."

# Construir Eureka Server
echo "📦 Construyendo Eureka Server..."
cd eureka-server
mvn clean package -DskipTests
cd ..

# Construir API Gateway
echo "📦 Construyendo API Gateway..."
cd api-gateway
mvn clean package -DskipTests
cd ..

# Construir User Service
echo "📦 Construyendo User Service..."
cd user-service
mvn clean package -DskipTests
cd ..

# Construir Product Service
echo "📦 Construyendo Product Service..."
cd product-service
mvn clean package -DskipTests
cd ..

echo "✅ Todos los servicios han sido construidos exitosamente!"
echo "📝 Ahora puedes ejecutar: docker-compose up -d"
