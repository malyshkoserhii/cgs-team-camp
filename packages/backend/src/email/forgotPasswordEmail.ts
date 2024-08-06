const forgotPasswordEmail = (
	verificationCode: string,
	frontendUrl: string,
): string => {
	return `
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Reset Your Password</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f7f7f7;
                        margin: 0;
                        padding: 20px;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: center;
                        padding: 10px 0;
                    }
                    .header img {
                        max-width: 100px;
                    }
                    .content {
                        margin: 20px 0;
                    }
                    .content p {
                        font-size: 16px;
                        line-height: 1.5;
                    }
                    .code {
                        display: inline-block;
                        background-color: #f2f2f2;
                        padding: 10px;
                        font-size: 18px;
                        font-weight: bold;
                        letter-spacing: 2px;
                        margin: 10px 0;
                    }
                    .button {
                        display: block;
                        width: 100%;
                        text-align: center;
                        margin: 20px 0;
                    }
                    .button a {
                        background-color: #007bff;
                        color: #ffffff;
                        padding: 10px 20px;
                        text-decoration: none;
                        border-radius: 4px;
                        font-size: 16px;
                    }
                    .footer {
                        text-align: center;
                        font-size: 14px;
                        color: #888888;
                        margin-top: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="content">
                        <p>Hi {{username}},</p>
                        <p>You have requested to reset your password. Please use the verification code below to reset your password. If you did not request a password reset, please ignore this email.</p>
                        <div class="code">{{verificationCode}}</div>
                        <p>Alternatively, you can click the button below to reset your password:</p>
                        <div class="button">
                            <a href="${frontendUrl}/reset-password/${verificationCode}">Reset Password</a>
                        </div>
                    </div>
                    <div class="footer">
                        <p>If you have any questions, feel free to contact our support team.</p>
                        <p>Thank you, <br> Your Company Team</p>
                    </div>
                </div>
            </body>
        </html>
    `;
};

export default forgotPasswordEmail;
