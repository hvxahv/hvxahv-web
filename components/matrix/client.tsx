import sdk from "matrix-js-sdk";

export const createClient = async (token: string, userID: string) => {
  const client = sdk.createClient({
    baseUrl: "http://localhost:8008",
    accessToken: token,
    userId: userID
  })
  await client.startClient({
    pollTimeout: 3000,
  })
  return client;
}
