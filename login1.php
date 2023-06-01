<?php
define('BASEPATH', true); // access connection script if you omit this line, the file will be blank
require 'db.php'; // require connection script

if (isset($_POST['submit'])) {
    try {
        $email = $_POST['email'];
        $password = $_POST['password'];

        // Check if the submitted email exists in the database
        $stmt = $pdo->prepare("SELECT * FROM clients WHERE email = :email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Verify the password
        if ($user && password_verify($password, $user['password'])) {
            // Login successful
            session_start();
            $_SESSION['email'] = $user['email'];
            // Redirect the user to the dashboard or any desired page
            echo '<script>alert("Login successful.")</script>';
            exit;
        } else {
            // Login failed
            echo '<script>alert("Invalid email or password.")</script>';
        }
    } catch (PDOException $e) {
        $error = "Error: " . $e->getMessage();
        echo '<script type="text/javascript">alert("' . $error . '");</script>';
    }
}
?>
