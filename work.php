<?php
define('BASEPATH', true); //access connection script if you omit this line file will be blank
require 'db.php'; //require connection script

if(isset($_POST['submit'])){  
    try {
        $dsn = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
        $dsn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $fullname = $_POST['fullname'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $phone = $_POST['phone'];
        $sexe = $_POST['sexe'];
        $product = $_POST['product'];
        $question = $_POST['question'];

        // Verify and correct password
        if(strlen($password) < 8){
            echo '<script>alert("Password must be at least 8 characters long")</script>';
            return;
        } else if (strlen($password) > 20) {
            $password = substr($password, 0, 20); // Truncate to 20 characters
            echo '<script>alert("Password has been truncated to 20 characters")</script>';
        }
        // Proceed with password hashing and form submission
        $pass = password_hash($password, PASSWORD_BCRYPT, array("cost" => 12));

        // Check if email is valid
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo '<script>alert("Invalid email format.")</script>';
            return;
        }

        // Check if phone number is valid
        if (!preg_match('/^\d{8}$/', $phone)) {
            echo '<script>alert("Invalid phone number format.")</script>';
            return;
        }

        // Check if email already exists
        $sql = "SELECT COUNT(email) AS num FROM clients WHERE email = :email";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':email', $email);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if($row['num'] > 0){
            echo '<script>alert("Email already exists")</script>';
            return;
        }

        // Insert new account into database
        $stmt = $dsn->prepare("INSERT INTO clients (fullname, email, password, phone, sexe, product, question) 
        VALUES (:fullname,:email, :password, :phone, :sexe, :product, :question)");
        $stmt->bindParam(':fullname', $fullname);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $pass);
        $stmt->bindParam(':phone', $phone);
        $stmt->bindParam(':sexe', $sexe);
        $stmt->bindParam(':product', $product);
        $stmt->bindParam(':question', $question);
    
        if($stmt->execute()){
            echo '<script>alert("New account created.")</script>';
            //redirect to another page
            //echo '<script>window.location.replace("form.html")</script>';
        } else {
            echo '<script>alert("An error occurred")</script>';
        }
    } catch(PDOException $e){
        $error = "Error: " . $e->getMessage();
        echo '<script type="text/javascript">alert("'.$error.'");</script>';
    }
}
?>
