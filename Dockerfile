FROM gcc:latest

# NEW: Install the MySQL client tools inside our C++ container
RUN apt-get update && apt-get install -y default-mysql-client

WORKDIR /usr/src/app
COPY main.cpp .
RUN g++ -o myapp main.cpp
CMD ["./myapp"]