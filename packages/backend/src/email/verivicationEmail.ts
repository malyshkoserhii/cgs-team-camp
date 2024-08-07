const verificationEmail = (
	verificationCode: string,
	frontendUrl: string,
): string => {
	return `
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Email Verification</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        color: #333333;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        width: 100%;
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: center;
                        padding: 10px 0;
                        border-bottom: 1px solid #dddddd;
                    }
                    .header h1 {
                        margin: 0;
                        font-size: 24px;
                        color: #333333;
                    }
                    .content {
                        padding: 20px;
                        text-align: center;
                    }
                    .content p {
                        font-size: 16px;
                        line-height: 1.5;
                        color: #666666;
                    }
                    .verification-link {
                        display: inline-block;
                        font-size: 18px;
                        font-weight: bold;
                        color: #ffffff;
                        background-color: #007BFF;
                        padding: 10px 20px;
                        text-decoration: none;
                        border-radius: 5px;
                        margin: 20px 0;
                    }
                    .verification-link:hover {
                        background-color: #0056b3;
                    }
                    .footer {
                        text-align: center;
                        padding: 10px 0;
                        border-top: 1px solid #dddddd;
                        font-size: 14px;
                        color: #666666;
                    }
                    .footer p {
                        margin: 0;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Email Verification</h1>
                    </div>
                    <div class="content">
                        <p>Hello,</p>
                        <p>Thank you for signing up. Please click the button below to verify your email address:</p>
                        <a href="${frontendUrl}/user/verify/${verificationCode}" target="_blank" class="verification-link">Verify Email</a>
                        <p>If you did not sign up for this account, please ignore this email.</p>
                    </div>
                    <div class="footer">
                        <p>Thank you,</p>
                        <p>Your Company Name</p>
                    </div>
                </div>
            </body>
        </html>
    `;
};

export default verificationEmail;
