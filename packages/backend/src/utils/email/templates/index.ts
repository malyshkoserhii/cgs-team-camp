export const reqPasswordTemplate = `<html>
<head>
    <style>

    </style>
</head>
<body>
    <p>Hi {{name}},</p>
    <p>You requested to reset your password.</p>
    <p> Please, click the link below to reset your password</p>
    <a href="http://{{link}}">Reset Password</a>
</body>
</html>`;

export const activateAccTemplate = `<html>
<head>
    <style>

    </style>
</head>
<body>
    <p>Hi {{name}},</p>
    <p>You created new account.</p>
    <p> Please, click the link below to activate your account</p>
    <a href="http://{{link}}">Activate</a>
</body>
</html>`;
