// AngularJS Module Declaration
var app = angular.module('campusRide', []);

// Controller Implementation
app.controller('dashboardController', ['$scope', function ($scope) {

    // ==========================================
    // 1. TEAM & SYSTEM SCOPE VARIABLES
    // ==========================================
    $scope.appName = "Car Pooling & Campus Transport Portal";
    $scope.teamName = "Think Tank";
    
    $scope.companyEmail = "SUPPORT@CAMPUSRIDE.EDU";
    $scope.fuelPrice = 3.85;

    // Directives Flags
    $scope.showAnnouncement = true;
    $scope.hideWelcome = false;
    $scope.systemStatus = "Active"; // Options: 'Active', 'Maintenance', 'Offline'
    $scope.currentSection = "dashboard";
    $scope.showRideList = true;
    $scope.isDarkTheme = false;

    // Stats
    $scope.activeDrivers = 3;
    $scope.availableBuses = 3;
    $scope.popularRoutes = 4;
    $scope.searchQuery = "";

    // Data Collections
    $scope.vehicleTypes = ["Electric Scooter", "Sedan", "SUV", "Minivan"];
    $scope.routeNames = ["North Campus Express", "Library Circuit", "Tech Hub Direct", "South Dorm Shuttle"];

    // Default Dynamic Rides List with UNIQUE IDs
    $scope.rides = [
        {
            id: 101,
            driver: "Sumedha C P",
            vehicle: "Sedan",
            vehicleNumber: "KL-07-CP-101",
            pickup: "North Dorms",
            destination: "Engineering Building",
            time: new Date(2026, 6, 25, 8, 30),
            seats: 3,
            rating: 4.9
        },
        {
            id: 102,
            driver: "Annet Paul T",
            vehicle: "Electric Scooter",
            vehicleNumber: "KL-07-AP-202",
            pickup: "Main Gate",
            destination: "Science Complex",
            time: new Date(2026, 6, 25, 9, 15),
            seats: 1,
            rating: 4.8
        },
        {
            id: 103,
            driver: "Agnet Joseph",
            vehicle: "Minivan",
            vehicleNumber: "KL-07-AJ-303",
            pickup: "South Quad",
            destination: "Athletic Center",
            time: new Date(2026, 6, 25, 10, 0),
            seats: 5,
            rating: 4.7
        }
    ];

    $scope.schedules = [
        { bus: "Bus A1", route: "North Campus Express", departure: "08:00 AM", arrival: "08:20 AM", status: "On Time" },
        { bus: "Bus B2", route: "Library Circuit", departure: "08:30 AM", arrival: "08:50 AM", status: "On Time" },
        { bus: "Bus C3", route: "Tech Hub Direct", departure: "09:00 AM", arrival: "09:30 AM", status: "Delayed" }
    ];

    $scope.bookings = [];
    var bookingCounter = 1001;
    var rideIdCounter = 104;

    // ==========================================
    // 2. DYNAMIC CALCULATORS
    // ==========================================
    $scope.getTotalAvailableSeats = function () {
        var total = 0;
        angular.forEach($scope.rides, function (r) {
            total += (parseInt(r.seats, 10) || 0);
        });
        return total;
    };

    $scope.getDailyRequests = function () {
        return $scope.bookings.length;
    };

    // ==========================================
    // 3. UI NAVIGATION & THEME HANDLERS
    // ==========================================
    $scope.showSection = function (sectionName) {
        $scope.currentSection = sectionName;
    };

    $scope.toggleRideList = function () {
        $scope.showRideList = !$scope.showRideList;
    };

    $scope.toggleTheme = function () {
        $scope.isDarkTheme = !$scope.isDarkTheme;
    };

    // ==========================================
    // 4. MODULE 3: RIDE REGISTRATION
    // ==========================================
    $scope.newRide = {};

    $scope.registerRide = function () {
        // Validate required fields explicitly
        if (!$scope.newRide.driver || !$scope.newRide.vehicle || !$scope.newRide.vehicleNumber ||
            !$scope.newRide.pickup || !$scope.newRide.destination || !$scope.newRide.time || !$scope.newRide.seats) {
            alert("Please fill in all required fields in the Ride Registration form.");
            return;
        }

        var rideToAdd = {
            id: rideIdCounter++,
            driver: $scope.newRide.driver,
            vehicle: $scope.newRide.vehicle,
            vehicleNumber: $scope.newRide.vehicleNumber,
            pickup: $scope.newRide.pickup,
            destination: $scope.newRide.destination,
            time: new Date($scope.newRide.time),
            seats: parseInt($scope.newRide.seats, 10),
            rating: 5.0
        };

        $scope.rides.push(rideToAdd);
        $scope.activeDrivers++;

        $scope.resetRideForm();
        alert("Ride successfully registered!");
        $scope.showSection('rides');
    };

    $scope.resetRideForm = function () {
        $scope.newRide = {};
        if ($scope.rideForm) {
            $scope.rideForm.$setPristine();
            $scope.rideForm.$setUntouched();
        }
    };

    // ==========================================
    // 5. MODULE 4: PASSENGER BOOKING (FIXED)
    // ==========================================
    $scope.newBooking = {};

    $scope.bookRide = function () {
        // Validate Passenger Name
        if (!$scope.newBooking.passenger || $scope.newBooking.passenger.length < 3) {
            alert("Please enter a valid Passenger Name (at least 3 characters).");
            return;
        }

        // Validate Selected Ride Selection
        if (!$scope.newBooking.selectedRideId) {
            alert("Please select a ride from the dropdown.");
            return;
        }

        // Validate Phone (10 digits)
        var phoneRegex = /^[0-9]{10}$/;
        if (!$scope.newBooking.phone || !phoneRegex.test($scope.newBooking.phone)) {
            alert("Please enter a valid 10-digit contact number.");
            return;
        }

        // Validate Seats
        var reqSeats = parseInt($scope.newBooking.seats, 10);
        if (isNaN(reqSeats) || reqSeats < 1) {
            alert("Please enter a valid seat count (at least 1).");
            return;
        }

        // Find Target Ride in Array
        var targetRide = null;
        for (var i = 0; i < $scope.rides.length; i++) {
            if ($scope.rides[i].id === $scope.newBooking.selectedRideId) {
                targetRide = $scope.rides[i];
                break;
            }
        }

        if (!targetRide) {
            alert("The selected ride could not be located.");
            return;
        }

        // Check Available Seat Capacity
        if (reqSeats > targetRide.seats) {
            alert("Error: Requested seats (" + reqSeats + ") exceed available seats (" + targetRide.seats + ")!");
            return;
        }

        // Deduct seats from listing
        targetRide.seats -= reqSeats;

        // Build Confirmation Payload
        var bookingRecord = {
            bookingId: "BK-" + bookingCounter++,
            passenger: $scope.newBooking.passenger,
            driver: targetRide.driver,
            pickup: targetRide.pickup,
            destination: targetRide.destination,
            time: targetRide.time,
            seats: reqSeats,
            phone: $scope.newBooking.phone
        };

        // Push to global array
        $scope.bookings.push(bookingRecord);

        // Reset Form
        $scope.resetBookingForm();

        // Alert user & automatically switch view to Booking Summary
        alert("Booking Confirmed! Reference ID: " + bookingRecord.bookingId);
        $scope.showSection('summary');
    };

    $scope.resetBookingForm = function () {
        $scope.newBooking = {};
        if ($scope.bookingForm) {
            $scope.bookingForm.$setPristine();
            $scope.bookingForm.$setUntouched();
        }
    };

    // Helper Info Getter
    $scope.routeInfo = function (route) {
        if (!route) return "Select a route above to view operational details.";
        return "Route '" + route + "' operates shuttles every 15 minutes between core campus stops.";
    };

}]);