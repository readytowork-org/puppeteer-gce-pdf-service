const admin = require("firebase-admin");

const serviceAccount = {
  type: "service_account",
  project_id: "lp-designer",
  private_key_id: "8915ad0a21dc4f06723448484a05d98cafd879c8",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC3hO1EX39YLejw\nYEzEoQv40erXun02feBsrQUkadgQ/iXE+FkJNKuSihzNFzrgZjXP+R259sS1WgZE\nzvwfTG+U7QLswg5M+kC3ed92WeTHBIgFAzBgx8j3mkTjW0EY3UavOdSML7bZP6gX\nEsmG8H062ZfSTAUx9sWBQAzL9crm+y3gjApXs3Ze+6H0SL/5AzjjkVGYigvHSiiq\nhcvov//wfCiBYkMQjw/DLyj/R7va0i4WZRVbAqzAtw5nN0u7NHI81SBMkt7Qm4MF\nUj8h1VKN4hSLNl9uGuzBWNRtVOwdquwHYcdEyOtQRw5ZeeCQknBvePPVJnhzx7RE\nmV9cekv3AgMBAAECggEABUi3iDNzuDdCMMGlFDhK3vQ0XdfJySrgrmBg+IZvqTWY\nIs6/yYsRsZt2btVPZayrufxDRdp8GXipG4wWKFSMFe6pGeYQgVjnSiEhNQgrlStl\nOze3SeIWwEJZ323+NtgQM/VnUE4DZsf1cAyjbtY31Nz1CSIVODYRw8HzXGAMYpAm\nYnA8U8ABtkU7iJxLf4nrOUhOEqEqx9Qya3IEtC4tkZC800gjjc6s2WXQi22sMoPC\naTVKsyMJXhtjfMiecSNE5limPkU1U6+5GQIUR1X9w/k9VHjNQATYBO9tLnQLTFse\nZLrlXDRNCLkoyQgnwarX32gm1vHzaflVraJYbdxzCQKBgQDp1FwKb2zHwltcOCDh\nrKSG65qEoxlpO7FD48TPhg4RREmexSprcAPYV1ekrZO0DzCV96bljPrJC81E8n6h\nKIbRee0R6uyjibwHdMnd7mzbjPthkmM6ByC4GZETOAXmSGmW+R82UiAaihX9Oqv/\nbL8MdF8bpSqI9hu2w91QfdS7AwKBgQDI62h31lKxjxEsHZYmOS8+oECwnRbnmXAp\nEH8ITA4VPIDmQZTuSl2LQJw9MptBKAZnSPme2znhpvkJVLChpu54hWAs6r7XcQ7b\n7FqfJLg436mbz/jDVzo8AuMB79FLgrbaKeV82xmFV1O6Z4dcwUBkWpsZkJsoWEMr\nFy8X7mZ+/QKBgBJU9cpTpgGbOTJnrBxFPrjdK8YOS2W2qlUaPEnQxrWP1v29k2/M\n3mBNqK9edF//eN2pBsqkXNz6MeOf51GXLcqqdm2bL2Y63CTxgQoHMT2dNfAWW/Um\nregBCSCqmbvOHYkaitnlYmLyRHsP6IAj9G5ziSlPr6ABO3b+sBEpbE4lAoGAEx78\nMTNvaUCBVN539KlKir47idNZY68hknbkcAi06mZ4qfEh2E+xeVgrxlMznU7O1TOH\ntguNBaGbX7z0ll3JoiSnU37/rIcw79MdiLm44oi+nnp7ZTO+8gkgS4XkODh3aGnG\nUkyTsDHwYPQLWNN3alWJHzS4320O72HkdHWWwY0CgYAoB5mTzCK1F56qijogllfH\npWZmOFmYB6tzjBjQbhZboJA+gBZolO6pFphrzbeKYZvtsehpK3U86YE6BGB4OElt\nf8GK8b3vuq4vig4IP8GPXkJl5DkUGHc4eQuqLtVNGCfUaL3X1jYDVZhiz6fZOU/L\nPppWSrMeqK6/6w5fpsJaIw==\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-p9o8v@lp-designer.iam.gserviceaccount.com",
  client_id: "105849594287113873159",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-p9o8v%40lp-designer.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

admin.initializeApp({
  projectId: "lp-designer",
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "lp-designer.appspot.com",
});

const storage = admin.storage();

module.exports = { storage };
