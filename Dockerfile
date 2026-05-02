# 1. Start with a Linux image that has a C++ compiler installed
FROM gcc:latest

# 2. Set up a working folder inside the container
WORKDIR /usr/src/app

# 3. Copy our C++ file from our laptop into the container
COPY test.cpp .

# 4. Compile the code inside the container
RUN g++ -o myapp test.cpp

# 5. Tell the container what to do when it starts
CMD ["./myapp"]