#include <iostream>
#include <thread>
#include <chrono>

int main() {
    std::cout << "Backend App Service Started." << std::endl;
    std::cout << "Connecting to Database network..." << std::endl;
    
    // Keep the app running so we can test the network
    while(true) {
        std::cout << "[Status] App is running and listening on internal network..." << std::endl;
        std::this_thread::sleep_for(std::chrono::seconds(10));
    }
    return 0;
}