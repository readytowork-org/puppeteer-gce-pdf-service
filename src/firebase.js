const admin = require("firebase-admin");

const serviceAccount = {
  type: "service_account",
  project_id: "lp-maker",
  private_key_id: "0e3580b5787a884c962b7b4abb870e9d71312bf0",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCKQO6w1GB0ETvs\n+5w+HT+WavQhaTCZh1GzvJBxkyWC2PinD6/l0zE9ojF2jzqNu8TDp8p7tSPiC94w\nWNytWUNAZfthopvonfZxs5C1qwqhUVS4XFquF8bRRPOsLz9GL62fTCXPJCJqdmL/\nar9a4/L2HVxmGbX1pKiQLx9gA5usHuWCP6tk/ZyYQqXgvIncw31xGbH8VQxNb/bL\nexwEdDoYtDrOQ1yhz/FyHOF2NVBiazPBI3fN9GEpV+b3uLMh8u/9Lvs/IvH9fPUy\nFZkgZ1J+9Ww3HZREZS+p5FXuRmPA9tmBfYR4q7aeP+bU/9Dv3xSAzUmGmA+iv1YG\nZNnc9hB1AgMBAAECggEAE9ydOJ6M1s/iWzrl049HIy3Csd7B988sH9Vkrkm0oguC\nuW7JrIupL3toKL9jQEPBUlco10SK3v7T0P/11W+VTPX5uylDGxQ/zfjn6WQlAaTv\nYLxf3f1AzQVfY8AL5+I8oBMuprIVwaliso1cPUtcjHAOZgVRPJ+HBI5zLvYwZ0sj\nmsU1Q4jrKVKM29VvwePF/swSncxpdJxEskdnLPUkstr6qXaFYxet0S0LAtd0vi43\nzsnBcl4rkFv5uVCbNmU9PD3z1J56mfd06UnnqoQ4+hTgsHBq+L+CbW+iBdFGKmXA\n+E/K2pU6F/jIctSLVhV3IitpOIrIlZqdr8IYWpKBVwKBgQDCAFQSsXr5FXro4aB7\nRbrqL4SqGJVlcL7tQpOd6d5Of2XpvIr+tywIQxYiSD7Kq9vspbwvaFheyVs/M70r\nHnNNk4KbLXPqWOmBOwWOvJ9BMMBhWdnYwLKOERHeaiAVEYjx0GsW/QD8ncffCA+g\nU8eh29NqUTVCrdzYazoHsdLqkwKBgQC2b8RS6mJZfh7T92AB3Xt+OilzYoyauukm\nQDe7Zhj/+AbxJyZupial8RrDQt5bZZ/p94my/POFz7p44b4FmJDCu7y7k14trKG7\nLIvTN/C9X/BrsYkMFDWjRUiBStxmgPRWPG/oUpW7H/Qzen0gJ/xjQEomOwTKq89q\n+/mJJjcV1wKBgQCkHAECuy4qrRgHDm5iOU9vsXjJJviiEikArbQP/nk28CA3BG6U\nIEFYT9/WakTrz0vAOUci12MB89WDdnIMmrqxIhp2yJFo6YPF9TazUy5oyCPFdmuJ\nJyEkep4iBqZTDD1LSaJ9lNKT36jnK3uEhbq3WizSoBWs7USHstUpEy03jwKBgCZX\nyz1aAZ2pgjUuksERmbjn5HpZxg9nJUVizdPXG34A1QSuI8exqAHMcMGFNlKjQz7b\nRdeWjmAbTqfFWji23gXvizUpPev/kmZScHjOEwzaMx+PSqx9OuC72QdDgpsQk0nk\nneiIIuwXRS3kmpO9k7AQfQUX9mPaRFfJ6aJHo+A1AoGAcootHc0S73vKP/Uhe19T\nDgyfOZaJ6a/UXnxXCV8eeFRyllq8FPBmotQo/W51gfeAKoRcf0ue6gtwqPPlFzYS\n89AdPIEd8UjcwwRJxe3EOpt4oh6sD8yFbLxzvBvWyPTc4K/MQb4CJ7rWPSlMlj85\nVXhHQGKAQcr95Xp4DkPz+aQ=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-c3pa1@lp-maker.iam.gserviceaccount.com",
  client_id: "108633663149297808665",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-c3pa1%40lp-maker.iam.gserviceaccount.com",
};
admin.initializeApp({
  projectId: "lp-maker",
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "lp-maker.appspot.com",
});

const storage = admin.storage();

module.exports = { storage };
