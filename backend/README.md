-- SELECT BIN_TO_UUID(id), BIN_TO_UUID(user_id), start_at, end_at, event_text FROM events;

### Generating the JWT Private Key

The application expects an RSA private key at `classpath:jwt/app.key` for signing JWT tokens.

You can generate the key using the following command:

```bash

mkdir -p src/main/resources/jwt
openssl genpkey -algorithm RSA -out src/main/resources/jwt/app.key -outform PEM
```