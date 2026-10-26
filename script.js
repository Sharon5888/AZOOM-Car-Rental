/* =========================
   Booking Rental Calculation
========================= */
function calculateRental() {
    const carSelect = document.getElementById("car");
    const pickupDate = document.getElementById("pickupDate").value;
    const returnDate = document.getElementById("returnDate").value;
    const result = document.getElementById("bookingResult");

    // Check whether a car is selected
    if (carSelect.value === "") {
        result.innerHTML = "<p>Please select a car.</p>";
        return;
    }

    // Check whether dates are selected
    if (pickupDate === "" || returnDate === "") {
        result.innerHTML = "<p>Please select both pickup and return dates.</p>";
        return;
    }

    const startDate = new Date(pickupDate);
    const endDate = new Date(returnDate);

    // Check whether return date is valid
    if (endDate <= startDate) {
        result.innerHTML = "<p>Return date must be after the pickup date.</p>";
        return;
    }

    // Calculate number of rental days
    const timeDifference = endDate - startDate;
    const rentalDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    // Car rental price is stored in the option value
    const dailyRate = Number(carSelect.value);
    const totalPrice = rentalDays * dailyRate;

    // Get selected car name
    const selectedCar = carSelect.options[carSelect.selectedIndex].text;

    result.innerHTML = `
        <div class="rental-summary">
            <h3>Rental Summary</h3>
            <p><strong>Car:</strong> ${selectedCar}</p>
            <p><strong>Rental Period:</strong> ${rentalDays} day(s)</p>
            <p><strong>Daily Rate:</strong> $${dailyRate}</p>
            <p><strong>Total Rental Cost:</strong> $${totalPrice}</p>
        </div>
    `;
}


// Booking Form Validation
const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const car = document.getElementById("car").value;
        const branch = document.getElementById("branch").value;
        const pickupDate = document.getElementById("pickupDate").value;
        const returnDate = document.getElementById("returnDate").value;
        const cardNumber = document.getElementById("cardNumber").value.trim();

        // Check all fields
        if (
            name === "" ||
            email === "" ||
            car === "" ||
            branch === "" ||
            pickupDate === "" ||
            returnDate === "" ||
            cardNumber === ""
        ) {
            alert("Please complete all required fields.");
            return;
        }

        // Validate dates
        const startDate = new Date(pickupDate);
        const endDate = new Date(returnDate);

        if (endDate <= startDate) {
            alert("Return date must be after the pickup date.");
            return;
        }

        // Validate credit card
        const cardPattern = /^[0-9]{16}$/;

        if (!cardPattern.test(cardNumber)) {
            alert("Please enter a valid 16-digit credit card number.");
            return;
        }

        // Create simple booking reference
        const bookingNumber = "AZ" + Math.floor(100000 + Math.random() * 900000);

        alert(
            "Booking successful!\n\n" +
            "Thank you, " + name + ".\n" +
            "Your booking reference is: " + bookingNumber
        );

        bookingForm.reset();

        document.getElementById("bookingResult").innerHTML = "";
    });
}

function calculateFinalBill() {

    const rentalCost = Number(document.getElementById("rentalCost").value);
    const damageStatus = document.getElementById("damageStatus").value;
    const damageCost = Number(document.getElementById("damageCost").value);
    const result = document.getElementById("finalBillResult");

    if (rentalCost <= 0) {
        result.innerHTML =
            "<p>Please enter a valid rental cost.</p>";

        return;
    }

    let finalDamageCost = 0;

    if (damageStatus === "yes") {

        finalDamageCost = damageCost;

    }

    const finalBill = rentalCost + finalDamageCost;

    result.innerHTML = `
        <div class="rental-summary">

            <h3>Final Bill</h3>

            <p>
                <strong>Rental Cost:</strong>
                $${rentalCost.toFixed(2)}
            </p>

            <p>
                <strong>Damage Charge:</strong>
                $${finalDamageCost.toFixed(2)}
            </p>

            <p>
                <strong>Total Amount:</strong>
                $${finalBill.toFixed(2)}
            </p>
        </div>
    `;
}

// Return Form Submission
const returnForm = document.getElementById("returnForm");

if (returnForm) {
    returnForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const bookingRef = document.getElementById("bookingRef").value.trim();
            const customerName = document.getElementById("customerName").value.trim();
            const returnLocation = document.getElementById("returnLocation").value;

            if (
                bookingRef === "" ||
                customerName === "" ||
                returnLocation === ""
            ) {
                alert(
                    "Please complete all required fields."
                );

                return;
            }

            alert(
                "Car return completed successfully!"
            );

            returnForm.reset();

            document
                .getElementById("finalBillResult")
                .innerHTML = "";
        }
    );
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();
        const message = document.getElementById("loginMessage");

        if (email === "" || password === "") {
            message.innerHTML =
                "<p>Please enter your email and password.</p>";

            return;
        }

        const registeredEmail = localStorage.getItem("registeredEmail");
        const registeredPassword = localStorage.getItem("registeredPassword");

        if (
            email === registeredEmail &&
            password === registeredPassword
        ) {
            message.innerHTML = `
                <div class="rental-summary">
                    <h3>Login Successful</h3>
                    <p>Welcome to AZoom Car Rental.</p>
                </div>
            `;

        } else {
            message.innerHTML =
                "<p>Invalid email or password.</p>";
        }

    });
}

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const phone = document.getElementById("signupPhone").value.trim();
        const password = document.getElementById("signupPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const message = document.getElementById("signupMessage");

        if (
            name === "" ||
            email === "" ||
            phone === "" ||
            password === "" ||
            confirmPassword === ""
        ) {

            message.innerHTML =
                "<p>Please complete all required fields.</p>";

            return;
        }

        if (password.length < 6) {
            message.innerHTML =
                "<p>Password must contain at least 6 characters.</p>";

            return;
        }

        if (password !== confirmPassword) {
            message.innerHTML =
                "<p>Passwords do not match.</p>";

            return;
        }
        localStorage.setItem("registeredEmail", email);
        localStorage.setItem("registeredPassword", password);

        message.innerHTML = `
            <div class="rental-summary">

                <h3>Registration Successful</h3>

                <p>
                    Welcome, ${name}!
                </p>

                <p>
                    Your account registration has been completed.
                    You may now proceed to the login page.
                </p>

            </div>
        `;
        signupForm.reset();
    });
}