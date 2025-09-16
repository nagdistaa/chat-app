const createWelcomeTemplate = (name, clientURL) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Nagdista Chat</title>
  </head>
  <body>
    <h1>Hello ${name}</h1>
    <p>Thanks for joining us 🎉</p>
    <a href="${clientURL}">Click here to get started</a>
  </body>
  </html>
  `;
};

export default createWelcomeTemplate;
