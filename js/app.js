var app = angular.module("campusRide", []);

app.controller("dashboardController", function ($scope) {

    $scope.appName = "CampusRide Portal";
    $scope.teamName = "Think Tank |";
    $scope.admin = "Transport Administrator";
    $scope.adminColor = "green";
    $scope.today = new Date();

    $scope.totalAvailableRides = 4;
    $scope.activeDrivers = 4;
    $scope.availableBuses = 6;
    $scope.popularRoutes = 8;
    $scope.dailyRequests = 15;

    $scope.currentSection = "dashboard";

    $scope.showSection = function(section){
        $scope.currentSection = section;
    };

    $scope.vehicleTypes = [
        "Car",
        "Bike",
        "SUV",
        "Van",
        "Mini Bus"
    ];

    $scope.rides = [

        {
            driver:"Sumedha",
            vehicle:"Car",
            vehicleNumber:"KL-07-AA-1001",
            pickup:"College Gate",
            destination:"Railway Station",
            time:new Date(2026,6,24,8,30),
            seats:3,
            rating:4.8
        },

        {
            driver:"Annet",
            vehicle:"Bike",
            vehicleNumber:"KL-07-BB-2045",
            pickup:"Hostel",
            destination:"Town",
            time:new Date(2026,6,24,9,0),
            seats:1,
            rating:4.5
        },

        {
            driver:"Taniya",
            vehicle:"SUV",
            vehicleNumber:"KL-07-CC-9080",
            pickup:"Library",
            destination:"Bus Stand",
            time:new Date(2026,6,24,10,15),
            seats:4,
            rating:4.9
        },

        {
            driver:"Agnet",
            vehicle:"Van",
            vehicleNumber:"KL-07-DD-3012",
            pickup:"Main Block",
            destination:"Medical College",
            time:new Date(2026,6,24,11,0),
            seats:5,
            rating:5.0
        }

    ];

    $scope.showRideList = true;

    $scope.toggleRideList = function(){
        $scope.showRideList = !$scope.showRideList;
    };

    $scope.newRide = {};

    $scope.registerRide = function(){

        if($scope.rideForm.$valid){

            $scope.rides.push({

                driver:$scope.newRide.driver,
                vehicle:$scope.newRide.vehicle,
                vehicleNumber:$scope.newRide.vehicleNumber,
                pickup:$scope.newRide.pickup,
                destination:$scope.newRide.destination,
                time:$scope.newRide.time,
                seats:$scope.newRide.seats,
                rating:5.0

            });

            $scope.totalAvailableRides = $scope.rides.length;

            alert("Ride Registered Successfully!");

            $scope.newRide = {};

            $scope.rideForm.$setPristine();
            $scope.rideForm.$setUntouched();

        }

    };

    $scope.schedules = [

        {
            bus:"CB-101",
            route:"Hostel → College",
            departure:"8:00 AM",
            arrival:"8:20 AM",
            status:"On Time"
        },

        {
            bus:"CB-102",
            route:"College → Railway Station",
            departure:"9:30 AM",
            arrival:"10:10 AM",
            status:"Delayed"
        },

        {
            bus:"CB-103",
            route:"Town → College",
            departure:"11:00 AM",
            arrival:"11:30 AM",
            status:"On Time"
        },

        {
            bus:"CB-104",
            route:"College → Bus Stand",
            departure:"4:30 PM",
            arrival:"5:00 PM",
            status:"On Time"
        }

    ];

    $scope.bookings = [];

    $scope.newBooking = {};

    $scope.bookRide = function(){

        if($scope.bookingForm.$valid){

            var selectedRide = null;

            for(var i=0;i<$scope.rides.length;i++){

                if($scope.rides[i].driver==$scope.newBooking.driver){

                    selectedRide = $scope.rides[i];
                    break;

                }

            }

            if(selectedRide!=null){

                $scope.bookings.push({

                    passenger:$scope.newBooking.passenger,
                    driver:selectedRide.driver,
                    pickup:selectedRide.pickup,
                    destination:selectedRide.destination,
                    time:selectedRide.time,
                    seats:$scope.newBooking.seats

                });

                selectedRide.seats =
                selectedRide.seats -
                parseInt($scope.newBooking.seats);

                $scope.dailyRequests++;

                alert("Booking Confirmed!");

            }

            $scope.newBooking = {};

            $scope.bookingForm.$setPristine();
            $scope.bookingForm.$setUntouched();

        }

    };

    $scope.routeNames = [

        "Railway Station",
        "Town",
        "Medical College",
        "Bus Stand"

    ];

    $scope.selectedRoute = $scope.routeNames[0];

    $scope.routeInfo = function(route){

        switch(route){

            case "Railway Station":
                return "Fastest route to Railway Station.";

            case "Town":
                return "Ride available every hour.";

            case "Medical College":
                return "Recommended for staff and students.";

            case "Bus Stand":
                return "Connects with KSRTC buses.";

            default:
                return "Campus Transportation.";

        }

    };

    $scope.portalCode = "CRP2026";

    $scope.bookingId = "BK1001";

    $scope.isReadOnly = true;

    $scope.hideWelcome = false;

    $scope.showAnnouncement = true;

    $scope.systemStatus = "Active";

    $scope.welcomeMessage = "";

    $scope.companyEmail = "CampusRide@FISAT.EDU";

});