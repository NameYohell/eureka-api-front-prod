@echo off
echo Construyendo todos los servicios...

echo Construyendo Eureka Server...
cd eureka-server
call mvn clean package -DskipTests
cd ..

echo Construyendo API Gateway...
cd api-gateway
call mvn clean package -DskipTests
cd ..

echo Construyendo User Service...
cd user-service
call mvn clean package -DskipTests
cd ..

echo Construyendo Product Service...
cd product-service
call mvn clean package -DskipTests
cd ..

echo Todos los servicios han sido construidos exitosamente!
echo Ahora puedes ejecutar: docker-compose up -d
